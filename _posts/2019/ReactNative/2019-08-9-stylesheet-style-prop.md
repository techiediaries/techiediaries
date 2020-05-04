---
layout: post
title: "Styling in React Native: StyleSheet & the style prop"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll learn how to use StyleSheet and style prop for styling React Native components with CSS objects"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

After writing our first React Native components using the builtin View and Text components. In this tutorial, we’ll learn how to use `StyleSheet` and `style` prop for styling React Native components with CSS objects.

In React Native, you use JavaScript to style your UIs or more precisely, a part of CSS written as JavaScript objects. The properties are defined using the [camelCase](https://en.wikipedia.org/wiki/Camel_case). For example: `backgroundColor` instead of  `background-color`.


> **Note**: All of the core components accept a `style` prop which can either take an inline plain old JavaScript object (convenient for few styles) or a reference to a named JavaScript object defined outside of the JSX markup.
> 
> You can also use an array of styles - the last style in the array has precedence. This can be used for inheriting styles.

In our `<View>` component, we added some inline CSS styles using the `style` property:


    <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }></View>
    


> **Note**: Styling in React Native makes use of style objects instead of style sheets.

Why do we have two curly braces i.e `{{` and `}}`?

The first outer curly braces i.e  `{ ... }`  are used to include JavaScript in JSX markup. The inner curly braces are for denoting the plain old JavaScript object that contains the styles.
 
Finally, we use the `export default` statement to export our `App` component so it can be imported from the other files (In our case, the `index.js` file where we bootstrap our application).


## Defining styles with `StyleSheet`

When you need to add more styles in your component(s), you can avoid writing cumbersome styles using  the `StyleSheet.create()` method for defining several styles in one place and reference them from the JSX code. This will allow you to write clean and reusable styles.


> **Note**: In React Native, styles don’t cascade like the case in CSS, but you can make use of the same style prop in the parent components and their children to emulate this behavior.

Let’s change our simple example by pulling the inline styles from JSX and defining them using the  `StyleSheet.create()` method. First, you’ll need to import `StyleSheet`:


    import {
      StyleSheet,
    } from 'react-native';

Next, define the `styles` variable and define your styles using the `StyleSheet.create()` method as follows:


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    });

 
Next, change the component as follows:


    const App = () => {
      return (
        <View style={styles.container}>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };

The `style` prop can be also passed an array of style objects. The following code is also valid:


    const App = () => {
      return (
        <View style={ [styles.container] }>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };



> **Note**: You can also define styles in a separate file and import them using the `import` statement so you can reuse them across multiple components.

Let’s do that in our simple example. First, create a separate `styles.js` file:


    $ touch styles.js

Open the file and add the following code:


    import {
        StyleSheet,
    } from 'react-native';
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });
    export default styles;

Next, change your `App.js` file as follows:


    import styles from './styles';
    
    const App = () => {
      return (
        <View style={ [styles.container] }>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };

## Wrap-up

We have seen how to use the `style` prop available in the builtin React Native components to customize the appearence of our components using CSS objects. We have seen that we can either pass inline styles or references to objects defined with the `StyleSheet.create()` method.
 
