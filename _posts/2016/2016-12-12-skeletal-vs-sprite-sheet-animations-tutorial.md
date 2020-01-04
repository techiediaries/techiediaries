---
layout: post
title: "Skeletal versus spritesheet animations"
image: "images/content/skeletal-vs-sprite-sheet-animations-tutorial/titleimage.png"
excerpt: "In this post we are going to discuss a very popular game development related topic : Skeletal versus sprite sheet animations "
tags : games 
---
{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/bigimage.png"
       title="In this post we are going to discuss a very popular game development related topic : Skeletal versus sprite sheet animations"
%}

A lot of game developers are asking about skeletal versus sprite sheet animations .Which approach is the best to follow ? what are the disadvantages and advantages of each type of these animations ? and what tools are used to produce these animations ? So in this post we will try to discuss this subject and shed some light on this topic .

Skeletal animations are used in both 3D and 2D game development but i'm going to discuss them from a 2d game developer perspective since I've used them only in the context of 2d game development. 

First lets start by defining skeletal and sprite sheet animations so we can set a basic understanding of what we are talking about .

What's skeletal animations or bone based animations ?
-------------------------------------------------------------

Skeletal animations use a set of interconnected and hyrarchical bones to animate characters in games .The main use of this technique is for animating human characters and other creatures such as animals and monsters but can be used also for animating other things such as cars ,trees and other solid objects .It can also be used for any type of deformations .

So to create a skeletal animation you need to create a set of bones connected to each other via a parent/child relationship so wehenver you animate the parent bone all its child bones are animated too .The set of interconnected bones represents the skeleton or the rig .As you can notice this type of animation is inspired from nature .This is how we humans and other creatures animate/move .So after you create the set of bones you need for your character animation you have to define keyframes for all possible transformations and that's it you have your animation ready.This type of animation is really simple than sprite sheet based animations .Next we'll see why .



What's sprite sheet animations ?
---------------------------------

The concept of sprite sheet animations is very easy to understand .The developer creates a set of sprites (the sprite sheet) for each character with different positions/transformations .The animation is then constitued by combining all these sprites, frame by frame ,so you'll get the illusion of animation .In reality this is just a set of sprites that are swapped in a specific frame rate  .Even if the concept is easy to understand for game developers it's relatively hard and need some artistic talents and more efforts to produce ,that's because we need to produce sprites (sprite sheet) for different animation keyframes .Sprite sheet based animations have been used a long time before skeltal animations by game developers so you'll find that more developers are familiar with this approach than the other one .

Skeletal and sprite sheet based animations are two different approaches/techniques for producing animations for 2D games that use different concepts and tools .In order to help game developers choose the right type to use ? or more specifically the right type they should use depending on differnt scenarios we need to know what are the advantages and disadvantages of each type of animations ?

Lets start by skeletal animations 

Advantages of skeletal animations 
---------------------------------------------------

Skeletal animations have many disadvantages that make using them a good choice for many 2d game developent scenarios.

Skeletal animations don't consume a lot of memory and efforts since they don't need different sprites for each frame .

Using forward/inverse kinematic you can produce natural movements .

Skeletal animations can be used for generating procedural animations .

You can easilly create animations at runtime.    

Skeletal Animations look more smooth 

Tools used to produce skeletal animations require less artistic skills and make the process starightforward and easy .



Now lets talk about the disadavnatges of skeletal animations

Disadvantages of skeletal animations 
---------------------------------------------------

Even if skeletal animations are easier than sprite based animations but doesn't mean they don't have their disadvantages .So lets see what are these advantages ?

Skeletal animations consume more processor time  .

They are complex to implement without the right tools .


Advantages and disadvantges of sprite sheet animations 
---------------------------------------------------


It's easy and quick  to create sprite sheet animations if your game needs a few animations  

Sprite sheet animations are used long time before skeletal animations .As a result most game developers are familiar with them .You'll be able to find more tutorials and help online .

You can use sprite sheets to make your animations load relatively quickly .

For disadanatges of sprite sheet based animations .If your game needs a lot of animations  .The process becomes time and efforts consuming .

You need to produce game art and sprites for different frames .

You'll need more sprites for mulitple animations for the same characters .

For games that requires a lot of animations ,memory consumption augments .

Animations don't look smooth and natural as you might expect .

Tools of the trade 
---------------------

Now after we have talked about both techniques of 2D animations .Lets talk about the tools we need to produce each type of them 

Spine
------------
----------------
{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/spine-2d.png"
       title="spine 2d"
%}

For 2D skeletal animations ,the best tool is Spine .It's a tool that's dedicated to 2D skeletal animations which allows game developers to create amazing ,both simple and complex,animations .Spine offers tools that makes skeletal animations relatively easy once you learn how to use the tool and also offers ways to export animations for easy integartions with many popular game engines .
{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/spine-2d-1.png"
       title="spine 2d"
%}
Spine have different runtime librariries for major 2D games engines so once you export your animations data you'll be to import them and start using them very easily from your perefred game engine .Spine supports popular games engines such as 

<ul>
 <li>Unity </li>
 <li>Cocos2d </li>
 <li>Cocos2d-x </li>
 <li>libGDX </li>
 <li>XNA etc.</li>
</ul>

{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/game-engines.png"
       title="popular 2d game engines"
%}

You can find about all the runtimes <a href="http://esotericsoftware.com/spine-runtimes" rel="nofollow">here</a>


Spine is available for major operating systems Windows,Linux and MAC .The trial version of Spine have all the tools except for saving,exprting and runtimes which are paid features .You can get Spine from their <a href="http://esotericsoftware.com" rel="nofollow">official website</a>

<iframe width="1200" height="450" src="https://www.youtube.com/embed/5RTkImAOJKM" frameborder="0" allowfullscreen></iframe>

Creature
-------------
--------------


Creature is another skeltal and automated animations tools .It's a good alternative to Spine .It has different tools for implementing simple and complex animations such as Physics Bend Motors, Automated Walk Cycle Generation, Directable Flesh/Muscle/Soft Body Dynamics, Advanced Intelligent Bone Weighting, 2D Motion Capture etc. Creature also support export and runtime librairies for most popular games engines and platforms such as Pixi.js ,Cocos2d-x ,Unity ,Unreal ,libGDX and HTML etc.You can get it <a href="http://creature.kestrelmoon.com" rel="nofollow">here</a>

You can export to industry standard formats such as FBX and Alembic which makes it easy to exchange your animations data between different tools .

Creature has very good documentation .

Creature is avaliable for both Windows and MAC but has no Linux version .

<iframe width="640" height="360" src="https://www.youtube.com/embed/LPRmr-d-0Lg" frameborder="0" allowfullscreen></iframe>



Spriter 
-----------
------------

A spritesheet based animation tool for making animations from sprites .This tool is very poerful and introduces different techniques for reducing problems related to spritesheet animations related to smoothness of animations and multitple character animations .Spriter uses a modular approach for creating silky-smooth animations which allows reusable images and other benefits.You can get the Spriter tool <a href="https://brashmonkey.com" rel="nofollow">here</a>     
Spriter has two flavors 

Spriter essentails which's free to use .

Spriter pro which's a paid version .

Marionette Studio
---------------------
--------------------

Marionette Studio is an online animation tool for produing 2D games skeletal animations without installing any other software .You can create skeletal based animations on your web browser and export them to use with your prefered game engine or platform .

You can check this tool <a href="http://marionettestudio.com/" rel="nofollow">here</a>

With Marionette Studio all your files can be stored on the cloud and animations can be exported as image packs.

Unity
-----------
------------       

Unity can be used to produce skeletal animations using thrid party packages available from the Unity assets store such as

<a href="https://www.assetstore.unity3d.com/en/#!/content/2844" rel="nofollow">smoothmoves</a> . 

<a href="http://anima2d.com" rel="nofollow">animate2d</a> is an advanced 2D skeletal animation tool for Unity .

{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/unity-anima2d.png"
       title="Unity skeletal animation with anima2d"
%}

{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/unity-anima2d-1.png"
       title="Unity skeletal animation with anima2d"
%}

Cocos Studio
--------------
--------------

Cocos Studio is a game development tool based on Cocos2d-x game engine .The studio has an animation editor( alongside a UI editor and a scene editor )which enables game developers to create 2D skeletal animations .You can find out more about Cocos Studio <a href="http://www.cocos2d-x.org/wiki/Cocos_Studio" rel="nofollow">here</a> .

{% include image.html
       img="images/content/skeletal-vs-sprite-sheet-animations-tutorial/cocos-studio.png"
       title="Unity skeletal animation with anima2d"
%}



References
--------------

<a href="http://www.cocos2d-x.org/wiki/Skeletal_Animation" rel="nofollow">http://www.cocos2d-x.org/wiki/Skeletal_Animation</a>


Conclusion
------------

Each of these animations techniques are being used by game developers around the world to create fantastic games with spritesheet based animatoins being used long time before skeletal or bone based animations .This post doen't favor one type over the other,the subject is about the advantages and disadvantages of each one of them so you can choose which one to use depending on your game conditions .So as a summary if your game needs few animations and you know exactly how to produce the sprites for different character transforations then you can go with spritesheet animations but if your game needs a lot of animations or needs dynamic and procedural animations then you need to use skeletal based animations .I personnally use skeletal animations for most use cases since when I've found out about them, that's because i'm not good with producing sprites for different poses and transformations .    

