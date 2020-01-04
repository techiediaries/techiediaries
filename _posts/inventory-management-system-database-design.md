In this post we are going to create a database model for an inventory and stock management (control and tracking) application.

A good inventory application (and database) will make it dead easy for businesses to monitor and keep track of their stock inventory, by providing many features such as 

* Multi-user access. 
* Insights into inventory activities.
* Historical records.
* Analysis.
* etc.

## What is Inventory Management?

Inventory management allows businesses to make smart decisions about their stock inventory, for example a good inventory management will help you to:

 * Monitor and control stock availability so you can prevent products shortage.
 * And keep records of transactions and movements.
 
Managing and tracking stocks or inventory is an important process that makes part of any business that deals with buying, selling or manufacturing products. 

## Why Businesses Need Inventory Management Systems?

An inventory management system helps businesses track the available products and their quantities, it also records the in and out movements of each product.

* Management: a good inventoty system makes it easy to manage inputs and outputs from stock. Each product has a database record, with all the necessary information, such as name, reference, stock availability and much more.

* Recording: all inventory movements can be recorded. In this way, it is impossible to lose any trace of transactions in order to minimize thefts or losses due to forgetfulness or inadvertence.


* Backup: a good inventory system provides a way to backup data that can be easily restored in case of data lost because of some system failure or any other event that causes data lost. 
    
## Database Design Steps & Requirements

In any database design process you need to follow these steps:

* First you need to identify the (client's) problem you are trying to solve. In this case you are trying to create a database model for a stock management system.

* Next you need to gather the requirements. In this example we are going to assume you are designing a database model for a business with the following requirements.

###  Database Requirements

The business X (actually most businesses) need(s) to:

* Store information about its profile, warehouses, products, customers and suppliers.
* Keep track of the products (with references, names and quantities among other attributes) which are currently available in one of its many warehouses.
* Keep track of received items.
* Keep track of stocks transfers.
* Keep track of returns and adjustments.
* Keep track of inventory movements.
* Keep track of numbers, costs etc.
* Be able to create different types of documents for moving products in and out.
* Control the minimal quantity (re-order points) of available products.
* Be able to move products or items between different locations or warehouses.
* Store production orders.
* Store drop-shipping information.
* Persist Delivery details for clients. 
* Store transfer information between warehouses.
* Keep track of lost or broken products.
* Keep track of receptions.
* Maintain transactions of items received, sent and returned.
* Execute administrative taks such as managing users, roles and permisions.
* Be able to create flexible and custom naming schemes. 
* Handle different units of measures.
* Manage locations and wahrehouses.
* Produce different inventory enquiries and status reports.

Also you need to make sure the database respect these rules:

* Locations must have unique names and labels.
* Items must have unique numbers/references.

The system/database needs to be able to handle these situations:

* Store initial inventory.
* Update stock inventory after receptions.
* Update stock inventory after delivery.
* Update stock inventory after return or adjusment.

## Inventory Analysis Reports 

Inventory and stock management involves also creating thorough analysis such as

* inventory valuation
* value (quantity or cost) of lost/stolen products
* value (quantity or cost) of damaged products
* value (quantity or cost) of products delivered to client(s) over a period
* value (quantity or cost) of products received from supplier(s) over a period



