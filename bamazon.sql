CREATE TABLE products (
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(35) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INT(5),
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL
);

INSERT INTO Departments(department_name, over_head_costs, total_sales)
VALUES ('ENTERTAINMENT', 50000.00, 15000.00),
    ('ELECTRONICS', 20000.00, 12000.00),
    ('HOME', 30000.00, 15000.00),
    ('BODY & HEALTH', 3000.00, 12000.00),
    ('GROCERY', 1200.00, 15000.00),
    ('KIDS', 40000.00, 12000.00),
    ('CLOTHING', 35000.00, 15000.00),
    ('SPORTS & OUTDOORS', 12000.00, 12000.00);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Fancy pants","CLOTHING",75.99,120),
    ("Apple TV 4K","ELECTRONICS",129.99,200),
    ("Super Deluxe Body Wash","BODY & HEALTH",50.49,50),
    ("Star Wars Bunk Bed","KIDS",599.00,5),
    ("Cheeze Snax Pax","GROCERY",15.25,35),
    ("Amazing Hair Conditioner","BODY & HEALTH",5.99,42),
    ("Biggie T-Shirts","CLOTHING",15.00,55),
    ("4D DVD Player","ELECTRONICS",159.50,90),
    ("Pokemon Bunk Bed Set","KIDS",599.50,85),
    ("Barrell of Frosted Animal Crackers","GROCERY",20.95,45),
    ("Funny Sox","CLOTHING",12.99,120),
    ("Super Large 4K TV","ELECTRONICS",2999.99,200),
    ("Super Face Scrub","BODY & HEALTH",10.49,4),
    ("Star Wars Sock Puppets","KIDS",75.00,10),
    ("Enormo-Cheez-Its Pak","GROCERY",40.25,35),
    ("Special Cream 12-Pak","BODY & HEALTH",10.99,3),
    ("Smallzie T-Shirts","CLOTHING",12.00,3),
    ("XL Tent","SPORTS & OUTDOORS",259.50,90),
    ("Fishing Poles","SPORTS & OUTDOORS",200.50,0),
    ("Bananagrams","ENTERTAINMENT",20.95,0),
    ("Escalade Kid Car","KIDS",299.50,0),
    ("UNO","ENTERTAINMENT",20.95,0),
    ("Unicorn Leggings","CLOTHING",20.50,0),
    ("Barney 10 Year Anniversary DVD Set","ENTERTAINMENT",99.95,0),
    ("Porsche Kid Car","KIDS",299.50,0),
    ("Monoply","ENTERTAINMENT",20.95,0);
    
select * from products;
select * from departments;