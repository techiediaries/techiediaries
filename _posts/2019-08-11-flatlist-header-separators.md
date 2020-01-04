---
layout: post
title: "Adding item separators and header to FlatList"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll see how we can customize our FlatList component using a header and item separators"
tags: [ 'reactnative', react ] 
categories: react-native-tutorial
---

In this tutorial, we’ll see how we can customize our `FlatList` component in our React Native app using a header and item separators.

The `FlatList` component allows you to add and customize the list header and item separators using the `ListHeaderComponent` and `ItemSeparatorComponent` props.

Let’s start with the item separator component. In the `App.js` file, add the following code:
 
{% raw %}

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
{% endraw %}


We simply use a `View` component for our separator with a height of `1`, a `100%` width and a black background color. This will render an horizontal black line that takes the full width of the list.

Next, let’s add a header component in the same `App.js` file:


{% raw %}

    FlatListHeader = () => {
      return (
        <View elevation={1} 
          style={{
            height: 100,
            width: "97%",
            margin: 5,
            backgroundColor: "#fff",
            border: 2.9,
            borderColor: "black",
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 16,
            },
            shadowOpacity: 1,
            shadowRadius: 7.49
          }}
        >
          <Text style={{  textShadowColor: 'black', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>Latest articles</Text>
        </View>
      );
    }
{% endraw %}

For the header, we used a `View` with a `Text` components. We have used the `style` prop for each component to add a bunch of inline styles, particularly the shadow properties for adding some shadows to the `View` container and `Text` component.
 
You can make use of this online [React Native shadow generator](https://ethercreative.github.io/react-native-shadow-generator/) for generating the shadow styles. 

Now, let’s change our `FlatList` component by adding the `ListHeaderComponent` and `ItemSeparatorComponent` props and assigning the previous components:


    const HomeScreen = (props) => {
      console.log("articles: ", props.articles);
      return (
        <View>
            <FlatList
              data={ props.articles }
              ListHeaderComponent = { this.FlatListHeader }   
              ItemSeparatorComponent = { this.FlatListItemSeparator }
              keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ArticleItem article = { item }  />}
            />
        </View>
      );
    }

This is a screenshot of our UI with a list header, item separators and shadow around the header: 


![FlatList Header and Separators Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565306817595_Screenshot_1565306800.png)


We have a much better UI even with this little customization. 

In the next part, we’ll implement the functionality of the open and save buttons attached to each `FlastList` item. We’ll be able to open the URL of each article in a web browser or save the article using local storage for later reading.

