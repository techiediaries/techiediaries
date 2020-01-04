---
layout: post
title: "Unhandled rejection TypeError: Illegal invocation at Sequelize.log"
image: "images/content/unhandled-rejection-typeerror-illegal-invocation-at-sequelize-log/titleimage.png"
excerpt: "In this short post we are going to see how to solve an Electron and Sequelize ORM error,Unhandled rejection TypeError: Illegal invocation at Sequelize.log ."
tags : sequelize
---

{% include image.html
       img="images/content/unhandled-rejection-typeerror-illegal-invocation-at-sequelize-log/titleimage.png"
       title="Unhandled rejection TypeError: Illegal invocation at Sequelize.log"
%}

Recently I've used Electron from GitHub and Sequelize ORM to build a cross platform Desktop application for both Windows and Linux .Since I don't use raw SQL to interact with databases but instead ORMs ,I've been looking for a Node.js ORM that's powerful enough ,easy to use and also has a good community around it to support me in case of problems and errors .The only Node.js ORM that has these requirements is Sequelize .It really has all of that and it's a very powerful ORM .Combine it with the awesome project from GitHub ,Electron and you'll have very powerful tools to build Desktop applications that have extensive use of databases such as ERPs ,applications of accounting  or inventory management which is the one I'm currently building .

When developing the application all went without any errors until I've packaged the application then I suddenly get this error which was terrifying in the beginning since the customer is expecting the product to be delivered in about a day

<b> Unhandled rejection TypeError: Illegal invocation at Sequelize.log </b>

I have spent some time searching on the Internet on how to solve the error and got many suggestions like It's realted to your Node.js version or you need to use a previous version of Sequelize anyway to really solve the problem you just need to set the appropraite value for Sequelize options.logging ,for example .


    var Sequelize = require("sequelize");
    var sequelize = null;  
    sequelize = new Sequelize(config.dbName, config.username, 
    	config.password ,{
    	host: config.server || '127.0.0.1',
    	dialect:config.dbType || 'mysql',
	    pool: {
	      max: 5,
	      min: 0,
	      idle: 10000
	    },
	    logging: console.log.bind(console)
	}); 


That's what has really solved my problem if it doesn't work for you .There is another suggestion from some other developers which is to roll back to a previous version of Sequelize(3.20.0) So just try this :

	npm uninstall sequelize --save
	npm install sequelize@3.20.0 --save	



Conclusion
-------------

I really like to work with new technologies to build applications with modern stacks or tools instead of traditional tools and languages such as Java or C# but sometimes that comes with some costs such as those sudden errors that no developer has really a clue on how to solve them .So I write always posts talking about my experience on solving these errors to help other developers like me who enjoy using these new technologies and to encourage them to not be afraid of using these modern tools for building applications for  their customers and not just as hobbies in their free time.   



