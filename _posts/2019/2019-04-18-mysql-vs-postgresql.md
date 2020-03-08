---
layout: post
title: "MySQL vs. PostgreSQL: 2019 Showdown"
image: "images/content/react.png"
excerpt: "In this article, we compare two of the most popular open-source RDBMS on the market. The comparison looks at the difference in features, governance, SQL compliance, supported platforms, performance, security, and cloud hosting so you can make an informed decision when choosing a database system for your application." 
author: gilad
tags : [ mysql , postgresql ]
---

[Relational Database Management Systems <a rel="nofollow" href="https://searchdatamanagement.techtarget.com/definition/RDBMS-relational-database-management-system">RDBMS</a> are based on the relational model developed by Edgar F. Codd. These databases store data as tables. The model creates a relationship between the tables which permits linking of the data. Data can thus be referenced from different places in the database.

In this article, we compare two of the most popular open-source RDBMS on the market. The comparison looks at the difference in features, governance, SQL compliance, supported platforms, performance, security, and cloud hosting so you can make an informed decision when choosing a database system for your application.

## What is PostgreSQL?

[PostgreSQL](https://www.postgresql.org/about/) is an object-relational database management system (ORDBMS). It gives importance to standards compliance and extensibility. PostgreSQL is transactional, ACID-compliant has materialized and updatable views, foreign keys, and triggers. It also allows for stored procedures and functions.

PostgreSQL uses constraints, tables, triggers, stored procedures, roles, and views as the central components that users work with. A table contains rows and each row is made up of the same set of columns. PostgreSQL uses primary keys to recognize each row, or record, in the table. It uses foreign keys to support its ability to reference between two related tables.

PostgreSQL also facilitates many NoSQL features.
**Top Features of PostgreSQL**

- A community that is increasing its development
- Runs of major OS platforms
- Support for applications such as JSON and XML
- ANSI SQL support for portable code and skills
- Extensive indexing
- Table views and joins for data retrieval
- Foreign keys support for data storage
- Stored/Triggers Procedures
- Read scalability and replication for data backup

## What is MySQL?

[MySQL](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html) is a common open-source relational database management system (RDBMS). MySQL uses a server/client architecture made up of a multi-threaded SQL server. This multi-threaded character of MySQL facilitates better performance as the kernel threads can make use of multiple Central Processing Units (CPUs).

The database is written in C and C++ and can be used with platforms such as Windows Server Operating Systems and Ubuntu and Linux distros like RHEL 7. Some core components of MySQL are scalability, replication, and security.
**Top Features of MySQL**

- A community-driven system
- Compatible with several platforms using major middleware and languages
- Provides support for Multi-version concurrency control (MCC or MVCC)
- Meets ANSI SQL standards
- Permits trigger-based and Log-based replication SSL
- Object-oriented
- Multi-layered design and fully multi-threaded (uses Kernel Threads)
- Server offered in client-server model or embedded DB
- Can handle data, 50 million rows or more
- Provides Built-in tools for space and query analysis
- Runs on varieties of UNIX and non-UNIX systems (such as OS/2 and Windows)

## PostgreSQL vs MySQL in 6 Key Areas

### 1. Governance
PostgreSQL is created by the PostgreSQL Global development group and can be used under an open-source license. MySQL project is open-sourced to the public under the CNU license. MySQL is owned by Oracle Corp. and various paid versions are available for commercial use.

### 2. SQL Compliance

SQL compliance standards are regulations that a database must meet while applying all SQL standards and guidelines. SQL compliance is a serious constraint for companies who want to work with heterogeneous databases for their application project.

PostgreSQL is most SQL compliant as it adheres to 160 of the 170 key components of the SQL standard, as well as several optional components. MySQL is only partially SQL compliant and doesn’t apply the full SQL standard.

### 3. Supported Platforms

PostgreSQL and MySQL systems can both run on the Windows Operating Systems, Solaris, Linux, and OS X. Solaris is an Oracle product, OS X was created by Apple Inc., Windows OS is a Microsoft product and Linux is an open-source operating system. PostgreSQL also supports the HP-UX OS, created by Hewlett-Packard, and the open-source Unix OS. MySQL supports the open-source FreeBSD OS.

### 4. Performance

Use PostgreSQL in large systems where write and read speeds are key and where data must be validated. It supports performance optimizations that can be found on commercial solutions, including Geospatial data support. PostgreSQL performance typically works best when you use it in systems that need execution of complex queries.

PostgreSQL performs efficiently in OLTP/OLAP systems when read and write speeds are necessary and extensive data analysis is demanded. PostgreSQL also works with Business Intelligence applications, however, is better fitted to data analysis applications and data warehousing that demand fast read and write speeds.

MySQL is suited to straightforward data transactions. MySQL can underperform when you use heavy loads or when you need to complete complex queries. MySQL performs well in OLAP/OLTP systems when you only need read speeds.

MySQL + InnoDB offers good read and write speeds for OLTP. My SQL performs well when you use it with high concurrency scenarios. You can use MySQL with Business Intelligence applications, as they are generally read-heavy.

### 5. Security

PostgreSQL has ROLES and inherited roles to maintain and create permissions. PostgreSQL has native SSL support for connections to encrypt client/server transactions. Another feature is Row Level Security. PostgreSQL also has built-in enhancement, named SE-PostgreSQL, which offers access controls based on SELinux security policy.

MySQL provides security based on Access Control Lists (ACLs) for all queries and connections. There is also a degree of support for SSL-encrypted connections between MySQL servers and clients.

### 6. Cloud hosting

PostgreSQL and MySQL are supported by all major cloud service providers, such as Amazon, Google, and Microsoft.

## Migrating from Oracle to PostgreSQL

3 reasons to <a rel="nofollow" href="https://www.enterprisedb.com/blog/no-time-waste-migrate-oracle-postgres-minutes">migrate from Oracle to PostgreSQL</a>:

- **Cost**—Oracle license cost is expensive and there are additional costs for features like high availability and partitioning.
- **Flexibility**—flexible open source licensing and availability from public cloud providers like AWS.
- **Benefits**—from open source add-ons to enhance performance.

Migration from Oracle to PostgreSQL can be challenging. Your organization may be hesitant to move due to knowledge, technical and integration risks. However, there are tools and technologies to help you convert your Oracle database to EDB Postgres, such as EDB Migration Toolkit, EDB’s Database Migration Assessment program, and the EDB Migration Portal.

## Conclusion

We have seen the difference between MySQL and PostgreSQL, and overall PostgreSQL is more powerful than MySQL in many instances. You can decide which database to use based on your specific project. PostgreSQL is being used in industries such as patient genetics, B2B applications, and hospital applications.

