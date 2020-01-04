---
layout: post
title: "Getting started with Godot engine tutorial"
image: "images/content/getting-started-with-godot-engine-tutorial/titleimage.png"
excerpt: "This is my first tutorial in a series of tutorials on how to get started with Godot engine for building 2D games"
tags : games godot
---
{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/bigimage.png"
       title="This is my first tutorial in a series of tutorials on how to get started with Godot engine for building 2D games"
%}


Throughout these series of tutorials starting with this one ,getting started with Godot engine tutorial ,we are going to see the essential steps to build your first 2D game using Godot .Godot is a 3D and 2D game engine but since I'm only a 2D game developer I can only show you how to make 2D games .

Introducting the Godot engine 
-------------------------------

So first lets start with an introduction .Godot is an open source game engine for making both 2D and 3D games for free without paying anything .It's licensed under the very permissive MIT license and you can find the source code of the engine in GitHub if you want to start hacking and customizing or even build your own in-house game engine based on Godot .Yes that's totally possible if you need to do that and if you have the necessary skills but not required if you want just to use the engine as it is for building games .

Godot is an easy to learn and easy to use game engine especially if you are already familiar with game development concepts and patterns .Despite the fact that the documentation is not really that good and the lack of tutorials on the web to learn how to use Godot but it's still possible to use this engine to make your own 2D/3D games .

You can use C++ language or GDScript which is a variation/subset of Python language to build your games with Godot alongside with a powerful visual game editor .If you are already a game developer then you might know that C++ is the language of choice if you need more control when you are building your games but it's also not the easiest programming language to use .So if you are already a C++ programmer you should use it with Godot if not you need to use GDScript which is easy to learn and to use .

The Godot engine has powerful editor that you can use to build your scenes and game objects (Nodes) and then attach either C++ or GDScript scripts to add bahavior to your entities .

So in which cases you can use Godot ? you can use Godot if you need :

<ul>
	<li>A game engine that's multiplatform ,feature packed for buidling 2D and 3D games . </li>
	<li>A game engine that's has many game development common tools without reinventing the wheel .</li>
	<li>A game engine that targets major available platforms such as Windows ,Linux and MAC on Desktop and Android ,iOS ,Windows Phone ,BlackBerry on mobile ,PS3 for gaming consoles and the Web with HTML5 </li>
	<li>A free game engine so you don't have to pay for making and selling your games </li>
	<li>A game engines that can be used in major operting systems namely Windows ,Linux and MAC systems</li>
	<li>An open source and completely free clone of Unity engine .</li>
</ul>

How to get and install Godot engine ?
-----------------------------------------

The process is very easy ,all you need to do is going to the <a href="https://godotengine.org/download" rel="nofollow">official website of Godot</a> and get the installer for your operating system and architecture (32bit or 64bit ) .I personally use Ubuntu and a 32bit processor so i'll choose the Linux 32 bit version of Godot .

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/download-godot-engine.png"
       title="download godot engine"
%}

After clicking on the link corresponding to your system/architecture your download should start immediately which has only 15.5 MB (for linux 32bit) when zipped and a size of 39.5 MB when decompressed 

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-compressed.png"
       title="compressed godot engine"
%}

Next you should decompress the downloaded file somewhere on your development folder .Change it to executable mode (If you are under Linux ) and execute it .

You should get your first Godot window open 

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-project-manager.png"
       title="godot engine project manager"
%}

This is the project manager of Godot where you should be able to list recently projects ,Create new Godot projects or import existing Godot projects .

The project manager has also a second tab which shows available templates either from the official Godot website or on your local machine (If you have previously downloaded any templates of course )

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-templates-tab.png"
       title="godot engine templates tab"
%}

Next go ahead and create a new project by clicking on the New Project button on the right of Godot project manager - Project List tab and browse for the folder where you want your project to live .If it's not yet created you should be able to create right from Godot Open Directory window .After picking your folder the project name will be filled automatically by Godot from the folder name ,feel free to either change or leave it as it is if the name of the folder corresponds to  your game/project desired name .

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-new-project.png"
       title="godot engine new project "
%} 

I've named my game project catchsky which will be the name of the game we are going to create in the second tutorial of these series about Godot engine .

As you will see ,the project will be immediatly added to the Project List .To open it you just choose it and click on the Edit button at the right or you can also double click on it to start editing .

The Godot Editor 
-----------------

So go ahead double click on your previuosly created project .You should have the Godot editor open for your 

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-project-editor.png"
       title="godot engine project editor"
%}

As you can see the Godot engine editor has a self describing user interface with clear menus and buttons and also sub windows for different tasks such 

<ul>
<li>The main view port of your project</li>

<li>The FileSystem/resources window</li>

<li>The Scene window</li>

<li>The Inspector and Node windows/tabs</li>
</ul>

The main menus 

<ul>
	<li>Scene</li>
	<li>Import</li>
	<li>Tools</li>
	<li>Export</li>
</ul>

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-main-menus.png"
       title="godot engine main menus"
%}

Control buttons  for view port switching

<ul>
	<li>2D</li>
	<li>3D</li>
	<li>Script</li>
	<li>AssetLib</li>
</ul> 

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-viewport-controls.png"
       title="godot engine viewport controls"
%}


On the middle you find the controls to control the game play 
<ul>
<li>Play the project </li>
<li> Pause the scene </li>
<li> Stop the scene </li>
<li>Play the edited scene</li>
<li>Play custom scene </li>
<li>Debug options </li>
</ul>

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-play-controls.png"
       title="godot engine play controls"
%}


Just like Unity engine ,Godot has a great visual editor to create your scenes/levels ,your game user interface and other game constructs visually by simple drag and drop operations then attaching either C++ or GDScript to game entities for giving them life and some sort of behaviors and the ability to make actions and respond to their world actions .for example things such as explosions or collisions etc.

Creating/Saving your first scene 
-----------------------------------

You can's save your first scene until you create your first Node .So on the scene window click on plus button or just hit CTRL+A with your keyboard .

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-add-node.png"
       title="godot engine add new node"
%}


A window will open up showing all available types of nodes you can create

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-nodes.png"
       title="godot engine add new node"
%}

Choose Node2D .A node will be created for you that has no visual apparence .On the scene window double click on the node and rename it to "root" .It will be our main node or the parent of all other nodes on the scene .

Next right click on the root node .a contextual menu will show up .On the menu click on Add Child Node or hit CTRL + A

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-add-child-node.png"
       title="godot engine add child node"
%}

Then choose a Sprite node ,Rename the child node to "background" .Click to select it once done its properties will be shown on the Inspector window/tab located just below the scene window .

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-inspector-sprite-node.png"
       title="godot engine inspector properties"
%}

Next you need to change the texture property of background node to your background image of choice .

Before loading any images or saving any scene you should think of a directory structure of your project .I'm creating a very simple structure 

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-project-structure.png"
       title="godot engine project structure"
%}

Next put your background image  under resources/images folder .

Now it's time to save our first scene .Go ahead ,under Scene menu click on Save scene or Ctrl+S then choose the scenes folder and name you scene main.tscn .

If you click on Play Project (F5) now .Godot will ask will ask you to select a main scene .Choose select and select main.tscn as the main scene of your project .

You can also define/change your main scene from the settings of your project Scene > Project Settings.

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-project-settings.png"
       title="godot engine project settings"
%}

After running your project you should notice that the resolution of the game is wrong so we need to set it in Project Settings ->  Display -> Width and Height  to  320×480 .Save the settings and play your project again .

{% include image.html
       img="images/content/getting-started-with-godot-engine-tutorial/godot-engine-scene-played.png"
       title="godot engine project settings"
%}

So congratulations on your first played scene .

Changing the splash screen 
---------------------------

Setting a custom splash screen in Godot is actually very easy to use all you need to is to go to Project Settings under the Scene menu 









