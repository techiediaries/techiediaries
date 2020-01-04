---
layout: post
url: /building-rich-text-editors-javascript-react
title: Rich Text Editors With React
author: mrnerd
tags : [react]
---

React is a client side JavaScript framework built by Facebook for Facebook. React is open source and hosted on GitHub. It is presented by Facebook as the V in MVC which means it is the View but in reality it is the whole MVC and you are going to realize that when you start working with this great framework.

By learning React you can build modern JavaScript applications which have nothing to envy from existing apps.React is simple and readable with great features such as:

- Virtual DOM
- Data binding
- Reusable components
- Separation of concerns etc.

Throughout this article I'm going to show how you can develop rich text editors for your web applications or websites with React and another open source framework,also built by Facebook developers, for building rich text editors called Draft.js

Draft.js offers you a complete framework for building rich text editors and abstracts away cross browser differences so you can focus on building your rich text editor instead of worrying about browsers features support ,in addition Draft.js is built in React so you can take advantage of all features React has.

You can build any type of rich text editors from dead simple to complex text editors .

Installation

You can easily  install Draft.js via npm .Don't forget to install React and React DOM the only two dependencies of Draft.js :

npm i --save draft-js react react-dom

Now you can use it

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const {editorState} = this.state;
    return <Editor editorState={editorState} onChange={this.onChange} />;
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);
For complete documentation on Draft.js visit its GitHub page here
