---
layout: post
title: "How You Can Upgrade Clojure Projects to use Java 11"
image: "images/content/ionic-modals.png"
excerpt: "How You Can Upgrade Clojure Projects to use Java 11" 
tags : [ closure, java]
author: kibo
---

  

![Upgrade Clojure Projects to use Java 11 ](https://lh6.googleusercontent.com/K5nhyW02eVEtXMVUJIZIfDgnkwQBGjLg6HXI2NYpBbexLReOyq72y7yVABUv4XzbNlxqLEYWVl7ObT3I-OCdzbhH5EWkL2asvKn5O3brG1UizZjT26tmBiTTyK_WZYTUcrLtomm3BBfBjyU6lw)

Are you a Java developer? Have you ever dealt with the project Clojure along with the other deliverables? In the past, with the severe changes in JDK 8, the java developers need to update their dependencies or building tools. A few number of open source projects have resolved their queries by adding support for JDK 9 and 10. But, with the new version release of JDK 11, things seem to be going much simpler and upgrading to java 11 is not tough.

  

In this article, we will be looking at a few simple ways to how you can upgrade your Clojure projects to the latest JDK 11. Let us begin with some basic terms.

### What is JDK 11?

[JDK 11](https://openjdk.java.net/projects/jdk/11/) was launched in the year of 2018 and it is claimed to be the first [long term support](https://www.oracle.com/technetwork/java/java-se-support-roadmap.html) release since JDK 8. Because of the shorter support lifespan of JDK 9 and 10 including the number of breaking changes between the releases, various businesses and individuals continued to stick for JDK 8.

  

All of the open-source and free updates for JDK 8 by Oracle ended in the month of January 2019 for all enterprise users and estimated to shut down for personal users in December 2020. This indicates that the various closure projects are going to upgrade to JSK 11 sooner or later; they can also stick to the JDK 8 by installing other JDK providers. Also, to support the developer's community, Oracle has released a [set of guidelines](https://docs.oracle.com/en/java/javase/11/migrate/index.html#JSMIG-GUID-C25E2B1D-6C24-4403-8540-CFEA875B994A) on upgrading to JSK 11. The guide does not seem relevant at the Clojure programs but it is worth to have a quick scan. So, how do you work with JDK 11 in correspondence with your Clojure projects?

### Check for Library Upgrades

Before taking a leap into JSK 11, you need to check for the new versions of your dependencies. These dependencies can have an easy fix for incompatibilities that are introduced in the newer versions of the JDK by breaking down the amount of breakage you require to resolve it later. Also, it is much easier all of your libraries first and then trying on hands for JDK to escape upgrading both at the same time. You can also check for similar updates to your [Boot projects,](https://github.com/martinklepsch/boot-deps)  [Leiningen projects](https://github.com/xsc/lein-ancient), and [tools.deps projects](https://github.com/slipset/deps-ancient) by using different dependencies. You can make use of [Deps Versions](https://versions.deps.co/) for adding a README badge if your project is publicly available on GitHub and up-to-date dependencies.

  

## Deprecations and Removals

JDK 9 [deprecated](https://docs.oracle.com/javase/9/migrate/toc.htm#JSMIG-GUID-F640FA9D-FB66-4D85-AD2B-D931174C09A3) various Java EE and CORBA [modules](https://www.oracle.com/corporate/features/understanding-java-9-modules.html) but still there are a few modules which are active in the JDK and not resolved by default. For accessing those modules, you need to add them explicitly with the command line flag called --> --add-modules.

  

The most frequent use of these modules is made in the Base64 convertors among the Clojure community. Later, JSK 8 added a [Base64](https://github.com/http-kit/http-kit/commit/0cc921f0c2b62566f0884f0d8affa52516e30ac7) class to java.util which seems to be a good alternative. If you quench for any support to the older JDK's other than version 8 then you can make use of http-kit as it displays a proper usage of using macros for supporting both the methods.

  

If we talk about JDK 11, then the new release had removed the CORBA modules and Java EE. Hence, if you are still using these modules then you need to add them explicitly as dependencies. JEP 320 is having much more information for the modules that are been removed and also get the best suitable alternatives.

  

## Building Tools

There is a wide range of tools allocated in order to make use of JDK 11. Boot has been updated to the new version 2.8.2 in order to work under Java 11 and also you can update boot to get the latest version. Another comes the Leiningen 2.8.0 or later is used under JSK 11 and to get the latest version you can run lein upgrade. Lastly, tools.deps is having no blocking issues when it comes to running JDK 11.

  

## Collection to Array

On the off chance that you have overhauled for supporting JDK 9 or JDK 10, the fundamental driver emerges when you face an issue moving up to JDK 11 as an expansion to the java.util.Collection interface. A new toArray method is added that overloads the existing 1-arit method on the JVM to resolve the ambiguity.

  

RRB Vector and Ordered are having an immense effect the same number of tasks are having conditions or transitive conditions on anybody these libraries which incorporate Puget, Fipp, Lacinia, Midge, lein-monolith, compojure-api interface and ring-middleware-format. In the event that you are utilizing Leiningen, there is an extraordinary use-case for the element of managed-dependencies. On the off chance that you have any Leiningen modules alongside the plugins on rrb-vector or requested, you can supersede the resolved dependency just by adding an explicit dependency to the plugins vector. Take a look at an example given below:

![](https://lh3.googleusercontent.com/KWfsGwnV87LV9HJtJHGsn9xVzPlHjs-x6oe_G0ne-erYfWeC8Hr3soQVigJm3Z5mTqlVEkJnIDgvrw0w2qyUAW8gP_dOUJhW84632_YetC5hwu7eHvCX7f7g8_Nx9FiSZwqhBqKYfd_BTkDDNA)

  

If this seems to be not working out where a dependency is coming from then you can make use of a new feature in Lein 2.8.

![](https://lh6.googleusercontent.com/KHQmR25VewEeBooqDiCHGDrPuz48ZgtldwN9rjQ1qHJinWbCdCl-L3VyjLWHfOHAP58nTMa0H80lk7W_G8FceMgrjyvto0XjDh8ZGfZACP-vpc4KPK9HeRVeZzcVBn9iiBXuTNbMXIHaj8NeMQ)

  

## ClojureScript Versions

Both the Clojure and ClojureScript are fixing to improve compatibility with JDK version 9 and more. ClojureScript includes [CLJS-2377](https://clojure.atlassian.net/browse/CLJS-2377) that avoids its dependence on java.xml.bind. On the other hand, [Clojure 1.9-beta1](https://clojure.org/community/devchangelog#__a_href_https_groups_google_com_d_msg_clojure_pz_kzg_k2ac_acvolkxydwaj_1_9_0_rc2_a_nov_27_2017) supports to run on the bootclasspath under JDK 9.

  

## Wrap Up

The latest six-monthly launch cycle of Java is increasing the price of adjustments in the JDK and the versions that library shoppers might also be using. The multiplied willingness to deprecate and extract a few components of the JDK indicates that many builders consider checking out on the early accessed versions of to make sure they don't get caught off-guard. Here, we come to the end of the article. We hope you have learned about the upgrading process. Till then - Keep Learning!!

  
