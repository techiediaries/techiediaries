---
layout: post
title: "How to backup and restore a MySQL database with mysqldump "
image: "images/content/mysqldump-backup-restore-database.png"
excerpt: "How to backup and restore a MySQL database with mysqldump" 
tags : [mysql]
---

mysqldump is a very handy utility which can be useful if you work with MySQL databases ,you'll often need 
to backup your databases and restore them or import them back .

The mysqldump utility produces a set of SQL statements when executed against a database will create the 
same table structure and table rows or data.

mysqldump is fairly easy to use ,you can use it from the command line with different commands and options 
to tackle different use cases.

Lets see some practical examples to backup your databases with mysqldump :

Say you have a set of mySql databases ,you can backup them all with one command 

    mysqldump --all-databases --user=root --password > backup-all-databases.sql 

This will create <em>backup-all-databases.sql</em> file in your current directory which has a dump for 
all databases .

All the options are self explanatory --user and --password are for specifying mySql username and password .

If you need to backup only one database ,you just need to specify its name 

    mysqldump --all-databases mydb1 --user=root --password > backup-mydb1.sql 
 

 Restoring and importing database backups
 --------------------------------------------
 --------------------------------------------

 As you can see creating backups for your mySql databases is easy using the mysqldump utility .Restoring 
 and importing backups back is also easy by using mysql utility .

 For example ,lets import backup-mydb1.sql 

    mysql -u root -p < backup-mydb1.sql

This may take a while depending on your database(s) size .

Please note that you can dump either only database tables (structure) ,only data rows or both of them by default .

Make sure to see all available <a href="http://dev.mysql.com/doc/refman/5.6/en/mysqldump.html">mysqldump commands from this link</a>

Conclusion 
-------------
-------------

You can also use phpmyadmin or other commercial solutions for advanced features when backing up or restoring 
your databases but still mysqldump can be very useful in most situations .


