# Bamazon - CLI Storefront
## App Purpose: 
Provide an interactive Amazon-like CLI storefront using node.js & mysql server.

##Overview: 

In this assignment I created a storefront using mysql server, node.js and the following NPM packages: inquirer, cli-tables, and colors. 

The app has three core functions: 
A. Shopping: 
	1. Allow shoppers to select and purchase individual items in specific quantities.
	2. Provide totals for items purchased and a running total for that shopping session. 
	4. Allow the user to continue shopping until they've finished.
B. Inventory Management System: 
	1. A management system view allowing the user to view all products and product details in a tabular fashion
	2. View enabling review of products with 5 items or less in the inventory
	3. Allow a manager to update product stock levels
	4. Allow a manager to dynamically add new items and associated data,  ie:  Item Name, Department, Cost, and Inventory levels. 
		- Manager will be able to immediately view the updated inventory level. 
	5. Allow a manager to remove products from the inventory.
C. Supervisory System
	1. Allow a system supervisor to review product sale data by all departments. Including: 
	* Overhead Costs
	* Total Sales
	* Total Profit
	2. Enable a system supervisor to dynamically create new departments.

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
3. Run command depending which mode you would like to be on:
	* Shopping App: 'node bamazonCustomer.js'
	* Inventory Management System - 'node bamazonManager.js'
	* Exective - 'node bamazonSupervisor.js
4. Or watch the Videos!

**Video**
http://www.google.com
