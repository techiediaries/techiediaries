# Python Firebase Real Time Database Tutorial with Example

Python Firebase Real Time Database – in this Python article iam going to talk about Python Firebase Real Time Database.

So first of all Firebase is platform which allow to build web and mobile applications without server

side programming language. You can store users data on its real-time database which sync

data among users data in no time.

Firebase is a google product which offers so many useful features. Like

_1: Firebase Real Time Database  
_2: Push Notifications  
_3: Firebase Authentication_  
_4: Firebase Cloud Messaging  
_5: Firebase Test Lab For Android  
_6: Firebase Crash Reporting_  
_7: Firebase Notification  
_8: Firebase App Indexing and many more _

So in this article we are going to use Real Time Database Feature of Firebase.

OK when you want to use Firebase in Python you need to install some packages

**_pip install requests_**

_**pip install python-firebase**_

So now this is the code for  **inserting data to Firebase Real Time database**

```
from firebase import firebase


firebase = firebase.FirebaseApplication('URL of Database', None)
data =  { 'Name': 'John Doe',
          'RollNo': 3,
          'Percentage': 70.02
          }
result = firebase.post('/python-example-f6d0b/Students/',data)
print(result)

```

OK now in this line of code FirebaseApplication takes two parameters; one is URL of database and second is authentication details for database

because for this project we have not set a rule by this reason we have given None in the second parameter.

```
firebase = firebase.FirebaseApplication('URL of Database', None)

```

And in this line of code we are going to insert data to our table

```
result = firebase.post('/python-example-f6d0b/Students/',data)

```

OK this was for inserting data and now we want to retrieve the data, you can use this code

## **Retrieving The Data **

```
from firebase import firebase



firebase = firebase.FirebaseApplication('URL of database', None)
result = firebase.get('/python-example-f6d0b/Students/', '')
print(result)

```

## **Updating The Data**

```
from firebase import firebase

firebase = firebase.FirebaseApplication('Database URL', None)
firebase.put('/python-example-f6d0b/Students/-LjLUhaWGuxNd5gOEmse','Name','Bob')
print('Record Updated')

```

## **Deleting The Data**

```
from firebase import firebase

firebase = firebase.FirebaseApplication('URL Of Database', None)
firebase.delete('/python-example-f6d0b/Students/', '-LjLUhaWGuxNd5gOEmse')
print('Record Deleted')
```