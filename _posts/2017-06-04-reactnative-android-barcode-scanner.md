---
layout: post
title: "Create a Barcode/QR Code Scanner application for Android with React Native"
image: "images/content/react-native-android-barcode-scanner.png"
excerpt: "Create a Barcode/QR Code Scanner application for Android with React Native" 
tags : [reactnative,android]
---

{% include image.html 
    img="images/content/react-native-android-barcode-scanner.png" 
    title="ReactNative Android Barcode Scanner" 
%}


React Native is a mobile framework designed to build Android and iOS apps using JavaScript .It's built by Facebook 
and based on React library .In this tutorial we'll be covering how to React Native to create an Android Barcode 
Scanner .

Lets get started by opening a terminal or command prompt depending on which operating system you are using 
(Unix like or Windows) then run the following command to generate a new React Native project 

    react-native init ReactBarcodeScannerProject
    
After successfully generated a new project ,it's time to install react-native-camera which also supports barcode 
scanning .

So navigate inside your root project directory 

    cd ReactBarcodeScannerProject

The simply run these two commands to install and link the React Camera component 

    npm install react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save
    react-native link react-native-camera

For Android 7 or higher ,you need also to add the Vibration permission to your <em>AndroidManifest.xml</em>

so open <em>android/app/src/main/AndroidManifest.xml</em> then add 

    <uses-permission android:name="android.permission.VIBRATE"/>    

So now we are ready to use the React Camera component to scan barcodes .

You can scan any Barcode format which  from this list : UPC E ,CODE 39 ,CODE 39 MOD 43 ,EAN 13 ,EAN 8 ,CODE 93 ,CODE 138 ,PDF 417 ,QR ,AZTEC .

Here is the Scenario we are going to implement :we are going to start the back Camera then start scanning ,
when a barcode is successfully found we are going to hide the camera and then open the scanned barcode 
data .

Now lets start coding .

Head over to <em>index.android.js</em>

The first thing is to import React and other dependencies :

    import React, { Component } from 'react';
    import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Linking,
    Vibration,
    Dimensions
    } from 'react-native';

    import Camera from 'react-native-camera';

Then we add these methods :

    getInitialState() {
            return {
                scanning: true,
                cameraType: Camera.constants.Type.back
            }
    }

Which is going to set the component internal state with two variables 

scanning : decide if we render or hide the camera .

cameraType : tells the camera component to use the rear camera .


Next 

    _handleBarCodeRead(e) {
        Vibration.vibrate();
        this.setState({scanning: false});    
        Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        return;
    }      

This method is called back when we successfully scan a barcode with Camera .

it first vibrate the device ,set the scanning state variable to false then open the scanned barcode data .

Next the render method 

    render() {
        if(this.state.scanning) {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            Barcode Scanner
            </Text>
            <View style={styles.rectangleContainer}>
            <Camera style={styles.camera} type={this.state.cameraType} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}/>
                </View>            
            </Camera>
            </View>
            <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            </Text>
        </View>
        );
        }
        else{
        return (<View  style={styles.container}>
            <Text style={styles.welcome}>
            Barcode Scanner
            </Text>      
            <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            </Text>     
        </View>);
        }
    }
    }      

If scanning is true we show the Camera      

        <Camera style={styles.camera} type={this.state.cameraType} onBarCodeRead={this._handleBarCodeRead.bind(this)}>           
        </Camera>

with type property set to back and onBarCodeRead to our _handleBarCodeRead method .

Then we add styles .

Here is the full component 

    import React, { Component } from 'react';
    import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Linking,
    Vibration,
    Dimensions
    } from 'react-native';

    import Camera from 'react-native-camera';

    export default class ReactBarcodeScannerProject extends Component {
    
    _handleBarCodeRead(e) {
        Vibration.vibrate();
        this.setState({scanning: false});    
        Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        return;
    }  
    getInitialState() {
            return {
                scanning: true,
                cameraType: Camera.constants.Type.back
            }
    }   
    render() {
        if(this.state.scanning) {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            Barcode Scanner
            </Text>
            <View style={styles.rectangleContainer}>
            <Camera style={styles.camera} type={this.state.cameraType} onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}/>
                </View>            
            </Camera>
            </View>
            <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            </Text>
        </View>
        );
        }
        else{
        return (<View  style={styles.container}>
            <Text style={styles.welcome}>
            Barcode Scanner
            </Text>      
            <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            </Text>     
        </View>);
        }
    }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    camera: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    },  
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },  
    });

    AppRegistry.registerComponent('ReactBarcodeScannerProject', () => ReactBarcodeScannerProject);   

This is a simple example with no advanced UI just to show you ho to implement Barcode scanning using 
the React Native Camera component .

Conclusion
---------------
---------------

So we have seen ho to use React Native Camera to scan Barcodes with different formats or types .This application 
was created for Android but you can very easily use for iOS .Actually you don't need to change anything since 
the code doesn't use platform specific components you just need to put this code in <em>index.ios.js</em>
instead of <em>index.android.js</em> or even better place it in a shared file .

If you have any questions please feel free to drop a comment below .

