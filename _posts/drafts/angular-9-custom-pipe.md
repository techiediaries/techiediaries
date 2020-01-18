How to Create Custom Pipe in Angular 8?
 By Hardik Savani |  November 18, 2019 |  Category : Angular


Are you looking for create custom pipe in angular 8? than i will help you to how to create custom pipe in angular 8 step by step. i will create two types of pipe in angular 8. i will create without parameters and with parameters pipe in angular 8.

I written step by step creating custom pipe in angular 8. we will use angular 8 command to create custom pipe in angular app.

You have to follow that command and i written very basic example so you will easily understand how pipe is work and what you can write logic in your custom pipe. So let's see both example so that will help you to create custom pipe in angular 8.



Example 1: Pipe without Parameters

We need to run following command to creating pipe in angular 8 application.

ng g pipe genderPipe
hari@hari-pc:/var/www/me/ang/pipeApp$ ng g pipe genderPipe

CREATE src/app/gender-pipe.pipe.spec.ts (204 bytes)

CREATE src/app/gender-pipe.pipe.ts (213 bytes)

UPDATE src/app/app.module.ts (545 bytes)

Now we need to write some logic on our custom pipe ts file. so let's write logic as i written for demo now.

gender-pipe.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {
   
  transform(gender: any): string {
    if(gender == 0){
      return 'Male';
    }
    return 'Female';
  }
   
}
Now we need to create one array with some dummy records, so we will create new array in component ts file as like bellow:

app.component.ts

import { Component } from '@angular/core';
   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipeApp';
   
  persons = [
    {
      id: 1,
      name: 'Hardik Savani',
      gender: 0,
      website: 'itsolutionstuff.com'
    },
    {
      id: 2,
      name: 'Kajal Patel',
      gender: 1,
      website: 'nicesnippets.com'
    },
    {
      id: 3,
      name: 'Harsukh Makawana',
      gender: 0,
      website: 'laracode.com'
    }
  ]
}
Ok, now we can use 'genderPipe' custom pipe in html file, so let's write it.

app.component.html

<h1>Example from ItsolutionStuff.com</h1>
  
<table border="1">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Website</th>
  </tr>
  <tr *ngFor="let person of persons">
    <td>{{ person.id }}</td>
    <td>{{ person.name }}</td>
    <td>{{ person.gender | genderPipe }}</td>
    <td>{{ person.website }}</td>
  </tr>
</table>
Example 2: Pipe with Parameters

We need to run following command to creating pipe with parameters in angular 8 application.

ng g pipe genderLabelPipe
hari@hari-pc:/var/www/me/ang/pipeApp$ ng g pipe genderLabelPipe

CREATE src/app/gender-label-pipe.pipe.spec.ts (225 bytes)

CREATE src/app/gender-label-pipe.pipe.ts (223 bytes)

UPDATE src/app/app.module.ts (555 bytes)

Now we need to write some logic on our custom pipe ts file. so let's write logic as i written for demo now.

gender-label-pipe.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
   
@Pipe({
  name: 'genderLabelPipe'
})
export class GenderLabelPipePipe implements PipeTransform {
   
  transform(name: string, gender: any): string {
    if(gender == 0){
      return 'Mr. '+name;
    }
    return 'Miss. '+name;
  }
  
}
Now we need to create one array with some dummy records, so we will create new array in component ts file as like bellow:

app.component.ts

import { Component } from '@angular/core';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipeApp';
  
  persons = [
    {
      id: 1,
      name: 'Hardik Savani',
      gender: 0,
      website: 'itsolutionstuff.com'
    },
    {
      id: 2,
      name: 'Kajal Patel',
      gender: 1,
      website: 'nicesnippets.com'
    },
    {
      id: 3,
      name: 'Harsukh Makawana',
      gender: 0,
      website: 'laracode.com'
    }
  ]
}
Ok, now we can use 'genderPipe' custom pipe in html file, so let's write it.

app.component.html

Read Also: How to Set Style Dynamically in Angular 8?
<h1>Example from ItsolutionStuff.com</h1>
   
<table border="1">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Website</th>
  </tr>
  <tr *ngFor="let person of persons">
    <td>{{ person.id }}</td>
    <td>{{ person.name | genderLabelPipe:person.gender }}</td>
    <td>{{ person.gender }}</td>
    <td>{{ person.website }}</td>
  </tr>
</table>
Now you can run your angular 8 app and check.

I hope it can help you...