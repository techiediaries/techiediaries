---
layout: post
title: "Unity versus Godot engine"
image: "images/content/unity-versus-godot-engine/titleimage.png"
excerpt: "A post about Unity versus Godot engine .Which is the best engine to use by game developers ? What are the advantages and disadvantages of each game engine versus the other one ."
tags : [games , godot , unity ] 
---
{% include image.html
       img="images/content/unity-versus-godot-engine/bigimage.png"
       title="A post about Unity versus Godot engine .Which is the best engine to use by game developers ? What are the advantages and disadvantages of each game engine versus the other one ."
%}

Throughout this post we'll try to answer some fundamental questions such as

How does Godot compare to Unity engine ?

What to choose Unity or Godot engine for making 2D and 3D games?

As a game developer you already know that choosing a game engine is the first and essential step before starting any game development project so today's post will be about a very popular game engine ,which is Unity as you may guess from the post title ,versus another very promising game engine, Godot, that's being recently adopted by many game developers for buidling 2d and 3d games .So lets first introduce both game engines .

Before choosing a game engine you need to consider different criteria .The better engine is the one which has a balance of the following factors :

The learning curve 
---------------------
---------------------
Which means how easy it is to learn and start using the engine on your own projects ? Can you learn it by yourself or you need professional trainings ? etc.For our Unity versus Godot comparison .Unity has a great and very clear documentation and a ton of free and paid ,both written and video ,tutorials so if you are a self learner you should be able to start with Unity very easily and even master the engine in a matter of a few projects .For Godot engine ,it's also easy to pick up but unfortunately lacks complete documentation and good tutorials on the web .

The cost of the game engine 
---------------------------
---------------------------

The cost is another critical factor when comparing game engines .Unity is free to use if you are just starting .In fact it's available on two editions ,Personal and professional edition .The personal edition  has some restrictions such as

The number of collabortors ,if you exceed 5 you need to buy the professional edition .

You can't change the branding or customize the splash screen unless you get the paid professional edition . 

Other than that Unity has no limitations ,you can start using the engine for free .You can build your game and export your game to all supported devices and platforms such as Android ,iOS and the Web .And you can release and sell your game without paying anything until your reach 100k a year .In this case you need to pay a one time amount of 4500$ which is fair and practical .

For Godot ,It's completely free to use it .To build your games and release them commercially and you don't have to pay anything no matter how much your earn from your game and no matter how much collaborators you have .Also there are no restrictions on your game branding and splash screens .So depending on your needs both Unity and Godot can be good choices .But Godot can be more flexisble on some situations .


Integrations with Third party SDKs and services
------------------------------------------------
------------------------------------------------

Integrations with third party SDKs and services such as Analytics ,Social media such as Facebook and Ads Networks is another factor that you won't consider as important when you are just starting developing games but after when you are ready to release your games for the broad markets you are going to pay attention how much integrations with different services is an important factor for your game .Unity engine has a really good integration with many popular services .There are official plugins ,free to use which makes integrations effortless and you can also use the Unity assets store to get either free or paid plugins if official plugins are not available or you are not satisfied with them . In case of Godot engine it's still not as good as Unity on the matter of integrations and official plugins .

Programming background and languages 
--------------------------------------
--------------------------------------

Your programming background and specifically the programming language(s) you master or you are just familiar with ,make another essential factor to consider when you are about to choose a game engine for your next game project(s) i.e if you are a programmer (you should !) and you already master some programming language then it's better to consider using a game engine that uses your programming language .Reinventing the wheel by trying to learn another language just for the sake of a particular game engine can be time and efforts consuming and might get in your way to properly master the ins and outs of your game engine of choice .Also you should consider things such as algorithms and data structures ,they are essential in game development so you should choose an engine that offers built in libraries or available ,either for free or paid, packages for implementing those algorithms if you don't have the required skills to do that by yourself .In the case of Unity engine you can use multiple scripting languages .You can choose between C# , Boo and UnityScript .The recommended language is C# so if you are already a C# programmer ,Unity should make a good choice for you .For algorithms ,data structures and game development patterns you should find pre-built packages on the Unity assets store either for free or for a reasonable cost .

As for Godot you can either use GDScript which is a stripped down Python version .It's easy to learn and use ,just like Python itself ,but if you are already a Python programmer it will be much better .You can also use C++ language with Godot .C++ is not an easy ,either to learn or to use ,language so you should avoid using it unless you are a C++ programmer .In this case choosing Godot with C++ can be a good decision for making your games.For prebuilt packages Godot is still inferior than Unity on this matter .

The general easiness of use 
------------------------------
-------------------------------

The easiness of use is another important factor that you should consider when choosing a game engine .That's because making games is already a complex thing to do by nature .Using the wrong engine will make your journey ,into your game release and publishing ,painful .On the contrary using an easy to use engine makes complex things possible to achieve in a reasonable amount of time and efforts .Both Unity and Godot are easy to use game engines ,combining that with the previous factor ,i.e familiarity with the programming language of the engine, offers the best game development experience .     

2D or 3D engine or both 
------------------------
-------------------------

Before making a decision about your game engine you need to know first wether you are developing 2d games ,3d games or both .If you a 2d game developer then it might be a good choice if you can consider a pure 2d game engine for many reasons ,for example a dedicated 2d game engine may offer you more tools to work with 2d assets .Both Unity and Godot can be used to build 2D games and 3D games .Unity was built in the first place as a 3D game engine and later integrated 2D game capabilities .It's worth to mention that 2D worlds in unity are just special case of their 3D counterparts ,that's because the 2D camera in Unity is just a 3D camera restricted to 2d axis by fixing the Z axis .So it's worth thinking about any problems that might gives you if you are making 2D games with Unity .

For Godot ,2D game development was considered from the start so it might gives a better 2D alternative to Unity .

Development environments and target platforms/devices 
------------------------------------------------------------
------------------------------------------------------------

Unity is avialable for major operating systems such as 

Windows for both 32 and 64 bit architectures .

Linux but only for 64 bit architectures .

MAC for both 32 bit and 64 bit architectures .

From my own experience Unity works great on Windows and MAC but has many technical problems under Linux .The installation process under Windows is straightforward and has no issues . 

Godot is also available on major operating systems and architectures ,Windows ,MAC and Linux .It also needs no installation ,you can grab the standalone execuatble which has the size of around 23 MBytes and start your first game project with no pain .

You can Unity to target a wide range od platforms and devices starting from the web with HTML5 and WebGL .You can also target both Android and iOS .You can very easily and with no pain generate the APK for Android (supposing you have the native development SDKs installed and configured on your system ,namely Java and Android SDKs) .For iOS ,if you are under a MAC system you should be able to generate an XCode project and then generating an IPA from XCode which is a painless and straightforward process too .  

You can also build your game for major operating systems ,platforms and devices with Godot .But again for iOS you should use a MAC system and for Android you should have the native SDKs installed and properly configured on your system .

So both engines are good and flexible regarding development environments and target platforms/devices .

The community
---------------
----------------

The community is one of the most considerable factors before making a decision on a game engine .The community gives you support ,tutorials ,trainings and also code examples and pre-built packages or libraries .The community also helps you solve technical problems related to installation and configuration issues . A good engine without a healthy community shouldn't considered as a good choice .But in reality that's a paradox because you can't find a good engine without a good community around it ,except if it's relatively new ,in this case it's just a matter of time before it gains its own community .

For Unity ,the engine has really a strong community since it's a professional and easy to use game engine and since it has been around for a good period of time .

As far as I know .Godot community is not as big as Unity's but since Godot is a very promising game engine .It's just a matter of time before it will gain the community it deserves .


Game engine license
--------------------------------------
--------------------------------------

Depending on your specific needs and goals ,also if your are an independent / an indie game developer or game development studio.The game engine license can either be irrelevant or very critical .Especially if it's an open source or closed engine ,free or commercial engine etc . which has a relation with your budget ,your game branding ,support availability etc. 

Unity is a commercial engine despite the fact that's free to use for start ,it's also a closed source game engine .

As for Godot ,It's an open source game engine which uses the very permissive MIT license .It's also free to use no matter how much you make from your game(s) .



Conclusion
--------------
---------------

Both Unity and Godot can be used to build decent and very powerful games .If you are good with C# and you don't mind pay an amount of money once you start making more than a specified threshold per year then go with Unity ,it's very professional,easy to learn and easy to use ,has good scene/UI editors etc .But If you prefer to use an open source and totally free game engine ,you don't mind use C++ or you are familiar with Python language then you can use Godot engine ,It's also a very good game engine which is gaining a lot of attention and popularity recently despite the fact that it's lacking complete documentation and either free or paid tutorials and trainings but that's going to change with time since the Godot community is growing steadily.

Also since Godot is an open source engine (with MIT license ) and use C++ then it will offer you more/total control and you can just fork the engine from its GitHub repository and start hacking/customizing it to build your own in-house game engine .For anything like collaboration ,community ,documentation ,libraries and packages (Thanks to Unity assets store) you should ,again and as I've mentionned before ,go with Unity.


