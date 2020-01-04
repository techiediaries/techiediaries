---
layout: post
title: "Hotel Room Reservation - Database Design and Modeling"
image: "images/content/database.png"
excerpt: "In this tutorial, you'll learn to design a database model for a Hotel room reservation system" 
tags : [database] 
---

In this tutorial, you'll learn to design a database model for a Hotel room reservation system.

Throughout this tutorial, we're going to design a simple data model for a hotel room reservation system. We'll create a general database model for room reservation but keep in mind that this is usually related to requirements defined by clients:

**Our database model should be able to represent information about the _rooms_ and the _reservations_ booked by a _person_ at the hotel**. 

Database design and modeling is an iterative process. We first need to identify the principal tables and their columns. 

From the bold sentence in the end of the previous paragraph, we can say that we initially need two database tables - so in our database model, we'll have two tables which are: `room`and `reservation`. 

After defining the tables we need, we also need to define their columns. The room table has columns such as: 

- the room's number, 
- status,
- name,
- and smoke flag etc.

The **Reservation** table has columns such as:

- `startdate` (the starting date of reservation),
- `enddate` (the end date of reservation),
- status` (new, confirmed, arrived, checked-out, canceled etc.),
- and `method` (online, phone, in_person etc.).

The **Person** while 

The attributes of the table guest are: 

- first_name,
- last_name and member_since.

Perhaps you feel like the reservation table needs more attributes (like room type, number of beds), we will cover this point later, until then, consider our reservation table incomplete.

