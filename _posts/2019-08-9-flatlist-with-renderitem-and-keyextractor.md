---
layout: post
title: "Displaying lists with FlatList (renderItem & keyExtractor props) in React Native"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll se how to use the FlastList component in React Native to display a virtualized list of the data fetched in the previous part. We'll also see how to use keyExtractor to add unique keys for each list item"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we'll se how to use the FlastList component in React Native to display a virtualized list of the data fetched in the previous part. We'll also see how to use `keyExtractor` to add unique keys for each list item.

React Native provides UI components like [FlatList](https://facebook.github.io/react-native/docs/flatlist) or [SectionList](https://facebook.github.io/react-native/docs/sectionlist) for efficiently displaying the lists of data.

`FlatList` is an implementation of [VirtualizedList](https://facebook.github.io/react-native/docs/virtualizedlist) which makes virtualization for improving the memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space.  


According to the [docs](https://facebook.github.io/react-native/docs/using-a-listview):


> The `FlatList` component displays a scrolling list of changing, but similarly structured, data. `FlatList` works well for long lists of data, where the number of items might change over time. Unlike the more generic `ScrollView`, the `FlatList` only renders elements that are currently showing on the screen, not all the elements at once.

You need to pass the `data` and `renderItem` props to `FlatList`:


- `data` represents the source of data that will be displayed in the list,
- `renderItem` takes one item from the source and returns a formatted component to render.

First import the `FlatList` component:


    import {
      View,
      Text,
      Image,
      ImageBackground,
      FlatList
    } from 'react-native';

Next, change the `HomeScreen` component as follows:


    const HomeScreen = (props) => {
      console.log("articles: ", props.articles);
      return (
        <View>
            <FlatList
              data={ props.articles }
      renderItem={({item}) => <Text> {item.title}</Text>}
            />
        </View>
      );
    }

This is a screenshot of the UI:


![React Native FlatList Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565123455841_Screenshot_1565123418.png)


Instead of displaying only the title of the article, let’s also display the description and encapsulate them inside their own component that will be rendered for each item.

Let’s create the `ArticleItem` component that will be rendered for each item:


    const ArticleItem = ({article}) => {
      const { description, title } = article;
      return (
        <View>
          <Text>
            { title }
          </Text>
          <Text>
            { description }
          </Text>
        </View>
      )
    }

The article will be passed as a prop. Using [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), we unpack the `title`, and `description` properties from the article object. Next, we use a `<Text>` component for displaying them.

Read the [reference](https://facebook.github.io/react-native/docs/flatlist) for more info about `FlatList`.
 

## Using unique keys with keyExtractor
 
 You can see that `FlatList` throws this warning:
 

![keyExtractor example in React Native](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565217447388_Screenshot_1565217370.png)


**VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.**

This simply says that we need to specify a unique key for each item in the list. We can use a custom `KeyExtractor` for the `FlatList` as follows:


            <FlatList 
              data={ props.articles }
              keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ArticleItem article = { item }  />}
            />

See this [link](https://stackoverflow.com/questions/44545148/basic-flatlist-code-throws-warning-react-native) for more information.

Now, the warning should disappear.
