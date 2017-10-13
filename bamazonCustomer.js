const mysql = require("mysql");
const inquirer = require("inquirer");
const colors = require('colors');
const Table = require("cli-table");

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',                      
    password : "",          
    database : 'bamazon_db'                 
});

var orderTotal = 0;

connection.connect(function(err) {          
    if (err) throw err;
});

//Function to display the Title Banner
function titleHeader() {
  var storeFront = colors.white("⚡  Bamazon");
  var custPortal = colors.white("Shopper's Cove ⚡ ");
  var sfStyling = colors.cyan('═════════════════════════════════════');

  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
  console.log("");
  console.log(`${sfStyling} ${storeFront} ${custPortal} ${sfStyling}`);  
  console.log("");
  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
}

titleHeader();

//function that prints a table of current items available
function inventoryTable() {
    connection.query('SELECT * FROM products', function(err, results) {  
            if (err) throw err;
            var table = new Table({   
                head: [colors.cyan('ID'), colors.cyan('Item'), colors.cyan('Price'), colors.cyan('Quantity')],
                colWidths: [5, 70, 13, 10]
            });
            for (var i = 0; i < results.length; i++){  
            table.push(  
                [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
                ("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
        }
        console.log("\n" + table.toString()); 
        console.log(colors.cyan('_______________________________________________________________________________________________________'));
        console.log("");
    });
}

inventoryTable();

//Function containing the logic for the customer purchase process
function customerBuy(){
  inquirer.prompt([
      {
        type: 'input',
        message: 'Please select an item to purchase and enter its item ID:',
        name: 'itemID',
        validate: function(value) {       
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: 'input',
        message: 'Please enter the quantity you wish to buy:',
        name: 'quantity',
        validate: function(value) {      
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answer){
      var itemID = answer.itemID;            
      var quantity = answer.quantity;        
      connection.query('SELECT * FROM products WHERE item_id=?', [itemID], function(err, results){
        if (err) throw err;
        var stock_quantity = results[0].stock_quantity;           
        if (stock_quantity < quantity) {                          
          console.log(colors.red("Insufficient stocks is available to fulfill your request. Please enter an amount equal to or less than the available stock."));
          setTimeout(customerBuy, 1000);                          
        } else{                                                  
          stock_quantity -= quantity;                             

          var totalPrice = quantity * results[0].price;          
          var totalSales = totalPrice + results[0].product_sales; 
          var department = results[0].department_name;           

          console.log(colors.cyan("\nYour line item total on this product: $" + (quantity * results[0].price).toFixed(2)));  

          orderTotal += (parseFloat(totalPrice));                 
          console.log(colors.cyan("\nYour order total for all products this session: ") + colors.yellow("$"+orderTotal.toFixed(2))+"\n");

          connection.query('UPDATE products SET ? WHERE item_id=?', [{stock_quantity: stock_quantity}, itemID], function(err, results){
            if (err) throw err;
          });
          
          connection.query('SELECT total_sales FROM departments WHERE department_name=?', [department], function(err, results){
            if (err) throw err;
            var departmentTotal = results[0].total_sales + totalPrice; 
            //SQL oto update the total_sales value of the departments table 
            connection.query('UPDATE departments SET total_sales=? WHERE department_name=?', [departmentTotal, department], function(err, results){
              if(err) throw err;
            });
          });

          //Continue Shopping Prompt
          inquirer.prompt([
            {
              type: "confirm",
              message: "Would you like to continue shopping?",
              name: "yesOrNo",
              default: true
            }
          ]).then(function(data) {
                 if (data.yesOrNo) {  
                   inventoryTable();   
                   setTimeout(customerBuy, 1500); 
                 } else {  //if the answer is no.....
                   console.log(colors.white("Thanks for your business! Come back again soon.")); 
                   process.exit(0);  
                 }
          });
        }
      });
    });
}

setTimeout(customerBuy, 500); 