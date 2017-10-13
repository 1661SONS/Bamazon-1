const mysql = require("mysql");
const Table = require("cli-table");
const inquirer = require("inquirer");
const colors = require('colors');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",                     //change to your user name if it is not root
    password: "",     //change to your password or set up a keys.js file
    database: "bamazon_db"               //import schema.sql & schema-seeds.sql to have the Bamazon db.
});

connection.connect(function(err) {    //set up connection
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
});

//Function to display the Title Banner
function titleHeader() {
  var storeFront = colors.white("⚙  Bamazon ");
  var custPortal = colors.white("Inventory Management System ⚙ ");
  var sfStyling = colors.cyan('══════════════════════════════');

  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
  console.log("");
  console.log(`${sfStyling} ${storeFront} ${custPortal} ${sfStyling}`);  
  console.log("");
  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
}

titleHeader();

//function that gives the user a menu of actions
function managerMenu(){
	inquirer.prompt([
			{
			  type: 'list',
			  message: 'Select Bamazon Management Activity:',
			  choices: ["View Active Sale Items", "Review Low Stock Items", "Update Stock Levels", "Add Item", "Remove Item", "Exit"],
			  name: 'options'
			}
		]).then(function(results){
			switch(results.options){
				case "View Active Sale Items":
				  inventoryTable();
					setTimeout(managerMenu, 1000);
					break;
				case "Review Low Stock Items":
					reviewStock();
					break;
				case "Update Stock Levels":
					inventoryTable();
					setTimeout(changeStockQty, 500);
					break;
				case "Add Item":
					addItem();
					break;
        case "Remove Item":
          inventoryTable();
          setTimeout(deleteItem, 500);
          break;
				case 'Exit':
					console.log(colors.white("Thank you for serving our customers!"));
					process.exit(0);   
					break;
			}
	});
};

managerMenu();

//function that prints a table of current items available
function inventoryTable() {
    connection.query('SELECT * from products', function(err, results) { 
            if (err) throw err;
            var table = new Table({   
                head: ['ID', 'Item', 'Price', 'Quantity'],
                colWidths: [5, 70, 13, 10]
            });
            for (var i = 0; i < results.length; i++){  
            table.push( 
                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
								("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
  			}
      
        console.log("\n" + table.toString());  //prints the constructed cli-table to screen
    });
};

//function to print a table of low stck items (below qty of 5)
function reviewStock() {
    connection.query('SELECT * from products', function(err, results) { 
        if (err) throw err;
        var table = new Table({  //syntax to create table from cli-table npm
            head: ['ID', 'Item', 'Price', 'Quantity'],
            colWidths: [5, 70, 13, 10]
        });
        for (var i = 0; i < results.length; i++){
        	if(results[i].stock_quantity < 5) {
	            table.push(  
	                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
									("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
	  		}
		}
        console.log("\n" + table.toString());  //prints the constructed cli-table to screen
        console.log("");
    });
		setTimeout(managerMenu, 1000);
};

//Function to dynamically update inventory quantities 
function changeStockQty() {
	inquirer.prompt([
		{
		  type: 'input',
		  message: 'To update stock please enter item ID #:',
		  name: 'product'
		},
		{
		  type: 'input',
		  message: 'Please enter adjustment amount:',
		  name: 'quantity'
		}
	]).then(function(answer){
		var quantity = parseInt(answer.quantity);
		var product = answer.product;
		var currentQuantity;
    //Select the record from products table with an item_id = the user's answer
		connection.query('SELECT stock_quantity FROM products WHERE item_id=?', [product], function(err, results){
			currentQuantity = parseInt(results[0].stock_quantity); //set var currentQuantity to value of stock_quantity of the record returned
      //Update the stock_quantity to the user's adjustment qty
      connection.query('UPDATE products SET ? WHERE item_id=?',
							[
	             {stock_quantity: quantity + currentQuantity},
	             product
	            ],
            	function(err, results){
					if (err) throw err;
						if (quantity && product !== undefined) { //when var quantity & product are defined...
							console.log("\n Stock is updated. Please review the adjustment:");
							setTimeout(inventoryTable, 1500);
							console.log("");
							setTimeout(managerMenu, 3000);
						}
			});
		});
	});
};

//function to add a new item to the database
function addItem(){
  //connect to db to select the departments table to get department names for inquirer list below
  connection.query("SELECT * FROM departments", function(err, results) {
    if (err) throw err;

	inquirer.prompt([
			{
				type: 'input',
				message: 'Please enter item name.',
				name: 'item_name'
			},
			{
				type: 'input',
				message: 'Please enter retail price.',
				name: 'price'
			},
			{
				type: 'list',
				message: 'Please select a department for this item.',
        choices: function() {                              //making the choices for departments a function
          var choiceArray = [];                            //set an empty array
          for (var i = 0; i < results.length; i++) {       //loop through the results
            choiceArray.push(results[i].department_name);  //push each existing department name into the array
          }
          return choiceArray;                              //return the updated array as the list of choices to the user
        },
				name: 'department_name'
			},
			{
				type: 'input',
				message: 'Please enter initial stock quantity.',
				name: 'stock_quantity'
			}
		]).then(function(answers){
			var item_name = answers.item_name;
			var price = answers.price;
			var stock_quantity = answers.stock_quantity;
			var department_name = answers.department_name;
      //connect to db and insert the new record with user supplied values
			connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [item_name, department_name, price, stock_quantity], function(err, results){
				if(err) throw err;
			});
      //once all the answers have been supplied by the user...
			if (item_name && price && stock_quantity && department_name !== undefined) {
        setTimeout(inventoryTable, 500);
				setTimeout(managerMenu, 1500);
			}

		});
  });
};

//function to delete a record from the database
function deleteItem() {
  inquirer.prompt([
      {
        type: 'input',
        message: 'What is the id # of the item you want to delete?',
        name: 'product'
      },
  ]).then(function(answer){
      var product = answer.product;  
        connection.query('SELECT * FROM products WHERE item_id=?', [product], function(err, res) {
          if (err) throw err;
          var item_name = String(res[0].product_name); 
            inquirer.prompt([
              {
                type: 'confirm',
                message: '\nAre you sure you want to delete '+colors.yellow(item_name)+'? This will erase this item from the database.',
                name: 'itemDelete',
                default: false    
              },
            ]).then(function(data){
                if (data.itemDelete) { 
                  connection.query('DELETE FROM products WHERE item_id=?', [product], function(err, results) {
                      if (err) throw err;
                      console.log("\nThe item " + colors.yellow(item_name) + " has been "+ colors.white("DELETED")); //gives the user a message of the item that was deleted
                      console.log("\nUpdating the item list......\n"); 
                      setTimeout(inventoryTable, 1000); 
                      setTimeout(managerMenu, 1500);    
                  });
                }else {   
                  managerMenu();  
                }
            });
        });
  });
};

