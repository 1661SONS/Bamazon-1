const mysql = require("mysql");
const Table = require("cli-table");
const inquirer = require("inquirer");
const colors = require('colors');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user     : 'root',                      //change to your user name if it is not root
    password : "",          //change to your password or set up a keys.js file
    database : 'bamazon_db'                    //import schema.sql & schema-seeds.sql to have the Bamazon db.
});

connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
});

//Function to display the Title Banner
function titleHeader() {
  var storeFront = colors.white("⚙  Bamazon");
  var custPortal = colors.white("Supervisory System ⚙ ");
  var sfStyling = colors.cyan('═══════════════════════════════════');

  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
  console.log("");
  console.log(`${sfStyling} ${storeFront} ${custPortal} ${sfStyling}`);  
  console.log("");
  console.log(colors.blue('₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪'));
}

titleHeader();

//Function for the Supervisor Menu Options
function supervisoryMenu(){
	inquirer.prompt([
			{
			  type: 'list',
			  message: 'Please choose a Bamazon Supervisor Activity:',
			  choices: ["View Departmental Product Sales", "Create New Department", "Exit"],
			  name: 'options'
			}
		]).then(function(results){
			switch(results.options){
				case "View Departmental Product Sales":
				  deptTable();                    
					setTimeout(supervisoryMenu, 1000);  
					break;
				case "Create New Department":
					addDept();                     
					break;
				case 'Exit':
					console.log(colors.white("Keep on growing our sales!"));
					process.exit(0);   
					break;
			}
	});
};

supervisoryMenu(); 

//Function to print the depat table
function deptTable() {
    connection.query('SELECT * FROM departments', function(err, results) {        
            if (err) throw err;
            var table = new Table({                                              
                head: [colors.white('ID'), colors.white('Department Name'),   
                  colors.white('Overhead Costs'), colors.white('Total Sales'), colors.white('Total Profit')],
                colWidths: [5, 23, 23, 23, 23]                                    
            });
            for (var i = 0; i < results.length; i++){     
            table.push(                                   
                [(JSON.parse(JSON.stringify(results))[i]["department_id"]), (JSON.parse(JSON.stringify(results))[i]["department_name"]),
                ("$ "+JSON.parse(JSON.stringify(results))[i]["over_head_costs"].toFixed(2)), ("$ "+JSON.parse(JSON.stringify(results))[i]["total_sales"].toFixed(2)),
                ("$ "+parseFloat(results[i].total_sales - results[i].over_head_costs).toFixed(2))]);
  			}
        console.log("\n" + table.toString());            
    });
};

//Function enabling the user to dynamically add new Departments
function addDept(){
	inquirer.prompt([
			{
				type: 'input',
				message: 'Please enter adepartment name:',
				name: 'dept_name'
			},
			{
				type: 'input',
				message: 'Please enter overhead costs:',
				name: 'costs'
			}
		]).then(function(answers){
			var dept_name = answers.dept_name;   
			var costs = answers.costs;         
      var totalSales = 0;
      
			connection.query('INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES (?, ?, ?)', [dept_name, costs, totalSales], function(err, results){
				if(err) throw err;
			});
			if (dept_name && costs !== undefined) {
        setTimeout(deptTable, 500);
				setTimeout(supervisoryMenu, 1500);
			}

		});

};