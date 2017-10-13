# Bamazon - CLI Storefront
## App Purpose: 
Provide an interactive Amazon-like CLI storefront using node.js & mysql server.

Overview: 

In this assignment I created a storefront using mysql server, node.js and the following NPM packages: inquirer, cli-tables, and colors. 

The app has three core functions: 
1. Shopping: 
	* Allow shoppers to select and purchase individual items in specific quantities.
	* Provide totals for items purchased and a running total for that shopping session. 
	* Allow the user to continue shopping until they've finished.
2. Inventory Management System: 
	* A management system view allowing the user to view all products and product details in a tabular fashion
	*  View enabling review of products with 5 items or less in the inventory
	* Allow a manager to update product stock levels
	* Allow a manager to dynamically add new items and associated data,  ie:  Item Name, Department, Cost, and Inventory levels. 
		- Manager will be able to immediately view the updated inventory level. 
	* Allow a manager to remove products from the inventory.
3. Supervisory System
	* Allow a system supervisor to review product sale data by all departments. Including: 
		* Overhead Costs
		* Total Sales
		* Total Profit
	* Enable a system supervisor to dynamically create new departments.

**Files**
* bamazonCustomer.js
* bamazonManager.js
* bamazonSupervisor.js
* bamazon.sql

**Getting Started**
1. Clone repo.
2. From a linux command line type: 'npm install'
3. Setup mysql server
4. Execute the sql in the bamazon.sql file to build the initial db and tables
3. Run the following commands to perform the described activity:
	* Shopping App: 'node bamazonCustomer.js'
	* Inventory Management System:'node bamazonManager.js'
	* Supervisory System: 'node bamazonSupervisor.js
4. Or watch the Videos!

**Video**
http://www.google.com
