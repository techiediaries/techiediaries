Java 14 features:  Pattern Matching for `instanceof`, `jpackage` & helpful NPEs
If you're a java developer you probably heard (often many times) that java is dead. But this is absolutely not true, and java is more alive than ever before.

There were a huge discussion in the java community about the new release cadence, which is now 6 month! But this turned out to be the healthiest thing that happened to Java and the short cadence release continue to deliver.

This is the first post in the series to highlight some exciting features planned to be included in Java 14, making it the most important release since 8! It covers 3 main features: Pattern Matching for instanceof, jpackage & the improved NPEs

Java 14 rew features articles:
Record
JEP 305: Pattern Matching for instanceof (Preview)
Patterns basically test that a value has a certain shape, and can extract information from the value when it has the matching shape. We all, at some point, created some pattern matching algorithms using the combination of if else expressions.

Let's consider the following Shape classes:

public class Square  
{
    public double side;

    public Square(double side)
    {
        this.side = side;
    }
}
public class Circle  
{
    public double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }
}
Now if we want to create a method that calculates the Shape area, we end up with something like the below snippet, where we test a parameter to determine its type, convert it, declare a local variable so we can use the shape value and compute the shape area based on its type.

public double ComputeArea(Object shape)  
{
    if (shape instanceof Square)
    {
        Square s = (Square)shape;
        return s.side * s.side;
    } 
    else if (shape instanceof Circle)
    {
        Circle c = (Circle)shape;
        return c.radius * c.radius * Math.PI;
    }
    throw new IllegalArgumentException("shape is not a recognized shape");
}
JEP 305 aims to make the the conditional extraction of components from objects a lot more simpler, concise, readable and secure. A small refactoring to the ComputeArea method using the newly introduces pattern matching for the instanceof operator will allow the following simplification:

public double ComputeAreaPM(Object shape)  
{
    if (shape instanceof Square s)
        return s.side * s.side;
    else if (shape instanceof Circle c)
        return c.radius * c.radius * Math.PI;
    throw new IllegalArgumentException("shape is not a recognized shape");
}
In this improved version, the instanceof operator both tests the parameter and assigns it to a binding variable of the proper type. Also, the variables s and c are only in scope and assigned when the respective pattern match expressions returns true. If we try to use either variable in another location, the code generates compiler errors.

JEP 343: Packaging Tool (Incubator)
After the removal of JavaFX from Openjdk 11, the javapackager, a packaging tool distributed with the Oracle's JDK 8, was also removed. JEP 343 aims to fill the gap left after this removal (and the removal/depreciation of similar tools) by introducing the jpackage utility, to package self-contained java apps into a platform-specific image that includes JRE (it actually invokes the jlink tool to create the runtime image) and all of the necessary dependencies. The generated image is stored in a single directory in the filesystem and can include the following:

Native application launcher
JDK runtime image
Application resources
Configuration files (plist, cfg, properties)
jpackage supports msi and exe formats on Windows, pkg and dmg on MacOS, and deb and rpm on Linux, with the goal to allow packaged Java applications to be installed and uninstalled cleanly and easily. On the other hand, there will be no support for cross compilation, no native splash screen support, no auto-update mechanism and no support for Solaris.

jpackage supports both modular application (composed of modular JAR files and/or JMOD files) and Non-modular applications (composed of JAR files that run on the classpath).

Sample Usage
The easiest way to explore jpackage options is to run jpackage --help command, this will display a series of useful information. Let's explore some of them.
For example, to generate a dmg file named laytoun-app from a modular application composed of modular JAR files in a laytlib directory, with laytoun/app.Main as the main class:

jpackage --type dmg -n laytoun-app -p laytlib -m laytoun/app.Main  
Also, the command below generate a deb file from a non-modular application where the lib/laytoun-app.jar contains the main class:

jpackage --type deb --name laytoun-app --input laytlib --main-jar laytoun-app.jar --main-class app.Main  
Additionally, We can customize further the runtime image and invoke jlink ourselves and pass the resulting image to the jpackage tool via the --runtime-image option.

$ jlink --add-modules java.base,java.sql --output laytjre
$ jpackage --name laytoun-app --input laytlib --main-jar laytoun-app.jar --runtime-image laytjre
JEP 358: Helpful NullPointerExceptions
The number one exception that all java developers encounter is the infamous NullPointerExceptions. But while developers uses some debugging tools to solve NPEs and figure out what's wrong, the SRE, who observes NPEs in production environments, is many steps removed from the developer whose code caused it, according to Lindenmaier & Schmelter.

JEP 358 aims to solve this specific issue by displaying important and helpful troubleshooting informations. For example Consider the following sample code:

// s is null
log.info(s.length());  
Executing this snippet would normally print the following trace:

  Exception java.lang.NullPointerException
        at (#2:1)
by enabling JEP 358, we end up with a more detailed message:

  Exception java.lang.NullPointerException: Cannot invoke "String.length()" because "REPL.$JShell$11.s" is null
        at (#2:1)
The null-detail message can be enabled using the command-line option -XX:+ShowCodeDetailsInExceptionMessages, since its switched off by default for 3 main reasons:

Performance: The algorithm adds some overhead to the production of a stack trace.
Security: The null-detail message gives insight into source code that is otherwise not easy to obtain (the message could contain variable names from the source code).
Compatibility: The JVM has not traditionally included a message for an NPE, and including a message now might cause problems for tools that parse stack traces in overly sensitive ways.
Ressources:

https://cr.openjdk.java.net/~briangoetz/amber/pattern-match.html
https://jaxenter.com/java-jep-358-improved-nullpointerexceptions-160882.html
https://openjdk.java.net/projects/jdk/14/
