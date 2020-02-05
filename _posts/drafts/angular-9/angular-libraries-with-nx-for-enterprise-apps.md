# This Dot Labs: Angular Libraries with Nx for Enterprise Apps

![nx-library-enterprise](https://images.ctfassets.net/zojzzdop0fzx/748toQKGBiQ78jD946ppd/722522e2649f4134081806ba15c68a14/Asset_52.png)  In this tutorial, I'm going to show you how to work with an Angular library, inside of your Nx Workspace, in your next enterprise project.

## What is Nx?

Nx is an extensible dev tool for monorepos.

"Using Nx, you can add TypeScript, Cypress, Jest, Prettier, Angular, React, Next.js, and Nest into your dev workflow. Nx sets up these tools and allows you to use them seamlessly. Nx fully integrates with the other modern tools you already use and love." - Nx Team.

## Why Use Angular Libraries?

You should use Angular libraries because sharing code across one app is easy, but sharing code between different projects requires extra steps.

When we do encounter services or components that can be reused across different teams and projects, and that ideally do not change very often, we may want to build an Angular Library.

## Downside Of Using Libraries?

-   You have to link your library to your main project, and rebuild it on every change.
-   You will need to keep syncing your project with the latest version of the library.

## Advatanges Of Using Libraries?

-   We need to think and build these modules with reusability in mind.
-   Publish and share these libraries with other teams or projects.

## What are Monorepos?

Monorepos are a source control pattern, in which essentially all of the codebase lives in the same repository. All projects will always use the latest version of the code. That's one of the reasons why  **Nx**  comes in handy when working with libraries.

## Advatanges Of Using Angular Monorepos?

-   Same library version for every app.
-   Ease of maintenance: when you update a shared library, you update it for all apps.
-   No conflicts between versions.

[For more information on Angular Monorepos](https://medium.com/ngconf/angular-architecture-matters-monorepo-df110b2a508a "Angular architecture matters: Monorepo")

## Let's Get Our Hands Dirty

1) Run the following command in your terminal to install Nx globally.

```
npm install -g @nrwl/schematics
```

2) Create a Nx Workspace. When asked about 'preset', select empty.

```
npx create-nx-workspace@latest thisdot
```

![carbon](https://images.ctfassets.net/zojzzdop0fzx/5b2hzwsWHULzqtwttU6SSX/6a5c8808a1000fb389937b0ba7f7c33d/carbon.png)

When asked what CLI should power your Nx workspace - select  `Angular CLi`

![carbon (1)](https://images.ctfassets.net/zojzzdop0fzx/1JQ6pSBSOeLNPuSCy3M77J/f18a5b7331adfd898fa3f82961be9575/carbon__1_.png)

## Nx Workspace Structure

![Screen Shot 2019-11-20 at 5.32.56 PM](https://images.ctfassets.net/zojzzdop0fzx/49ajl622rCrbi2H0XeF9Ab/ec3f5febe6727734faf2cafe3b83f308/Screen_Shot_2019-11-20_at_5.32.56_PM.png)

3) Add the capability to create Angular applications via:

```
ng add @nrwl/angular --defaults
```

4) Create a new angular app inside of your Nx workspace.

```
ng g @nrwl/angular:application employees
```

Then it will ask you which stylesheet format would you like to use. Select sass.  ![carbon (2)](https://images.ctfassets.net/zojzzdop0fzx/5jPoyCFpAw9KsckeWzuwaT/ca93a3d0644695d010e08f39e36c9d2c/carbon__2_.png)

**press enter**

The next question will be, "Would you like to configure routing for this application? (y/N)" Type  `y`

**press enter**

## Project Structure

![Screen Shot 2019-11-20 at 5.39.48 PM](https://images.ctfassets.net/zojzzdop0fzx/3HJg31WIdswCc2fhvObpv3/3278c7b12ba74c5c494c6cbe06738eaa/Screen_Shot_2019-11-20_at_5.39.48_PM.png)

5) Serve the Angular app, and go to  [http://localhost:4200](http://localhost:4200/).

```
ng serve employees
```

You should see something like this:  ![Screen Shot 2019-11-20 at 5.41.29 PM](https://images.ctfassets.net/zojzzdop0fzx/2Bb6dqRo13vHsVczwyExzX/ae3365cd8a1e00f3f947c1b36247e80f/Screen_Shot_2019-11-20_at_5.41.29_PM.png)

For this app, we are going to create a library that contains an employee interface that will be shared across multiple applications.

6) Create a sharable interface with the following command:

```
ng g @nrwl/workspace:lib employee
```

7) Go to libs/employee/src/lib/employee.ts and "copy-paste" the following:

```
export interface Employee {
  id: number;
  name: string;
}
```

8) Go to your  **app.component.ts**  file inside of your  `employees`  application.

Whenever you need to use the employee's interface inside of this workspace, you will import it to your file as following:

```
import { Employee } from '@thisdot/employee';
```

_**Note: If You are using vscode and doens't recognize it - restart vscode.**_

A cool thing about  **Nx**  is that, if you have your backend inside of this workspace, you can reuse this interface as well.

## Creating A UI Library

9) To create the ui library, run the following command:

```
ng g @nrwl/angular:lib ui
```

Your project structure will look like this:

![Screen Shot 2019-11-20 at 5.50.06 PM](https://images.ctfassets.net/zojzzdop0fzx/24qQnYfYURcck889HwJppO/8d168b430958806db1d08d8353a353f7/Screen_Shot_2019-11-20_at_5.50.06_PM.png)

10) Now go to your  **ui.module.ts**. You file should look like this:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})
export class UiModule {}
```

## Time To Create A Component In Our UI Library

11) Run the following command:

```
ng g component employee-list --project=ui --export
```

Your project structure should look like this  ![Screen Shot 2019-11-20 at 5.54.14 PM](https://images.ctfassets.net/zojzzdop0fzx/2lnVNSsiIkoAqDGHnoCIq7/e0c3979b0807dfc51360e63b0f20203f/Screen_Shot_2019-11-20_at_5.54.14_PM.png)

12) Now lets go to your  `employee-list.component.ts`  file insdie of our ui library.

-   You will add the employee interface we created.
-   You will create an input that takes an array of employees.
-   We will add a trackBy function just for you to see how we create one for optimization.

Your file should look like this:

```
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '@thisdot/employee';
@Component({
  selector: 'thisdot-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Employee[];
  constructor() { }

  ngOnInit() {}

  trackById(employee: Employee) {
    return employee ? employee.id : null;
  }
}
```

13) Inside of your employee.component.html file

```
<ul>
  <li *ngFor="let e of employees; trackBy: trackById(e)">{{ e.name }}</li>
</ul>
```

As you can see, I'm using the trackBy function to promote better performance of our app.

For more information on trackby visit this  [link.](https://angular.io/api/common/NgForOf)

## Creating A Service

14) Run the following command to create a service inside of our ui library:

```
ng g s employee --project=ui
```

15) Now go to your ui library, and search for your employee.service file, and make sure it looks like the following:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@thisdot/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: Observable<Employee[]>;
  constructor(private http: HttpClient) {
    this.employees$ = this.http.get<Employee[]>(
      'https://my-json-server.typicode.com/devpato/nx-fake-data/employees'
    );
  }
}
```

16) Now go to your  **index.ts**  file

![Screen Shot 2019-11-20 at 6.04.06 PM](https://images.ctfassets.net/zojzzdop0fzx/3fniVhiXWJHacJfUzVBf6d/7dc315c273b45dc9d2cc7f5827a7e6e2/Screen_Shot_2019-11-20_at_6.04.06_PM.png)

17) Add the service to your file. Your file should look like this:

```
export * from './lib/ui.module';
export * from './lib/employee.service';
```

18) Now go to your  **ui.module.ts**. The file should look like this:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [EmployeeListComponent],
  exports: [EmployeeListComponent]
})
export class UiModule {}
```

_**Note: you can see I have added the HttpClientModule and Nx has added the component for me already.**_

## Time To Use Our UI Library

19) Go to your employees app, and open the  **app.module.ts**

-   Inject our library at the top of the file
-   Then add it to your imports

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@thisdot/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UiModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

_**Our Ui library is ready to be used in this project.**_

20) Now, open your  **app.component.html**  file inside of your employees app, and copy paste the following code.

```
<div class="employees-container">
  <img src="../assets/images/logotdm.png" />
  <h1>Employees</h1>
  <thisdot-employee-list 
  [employees]="employeeService.employees$ | async">
  </thisdot-employee-list>
</div>
```

-   This is where I'm injecting the employee-list component we created.

21) Open in your  **app.component.ts**, and change it to match the example below:

```
import { Component } from '@angular/core';
import { EmployeeService } from '@thisdot/ui';

@Component({
  selector: 'thisdot-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private employeeService: EmployeeService) {}
}
```

**As you can see, I'm injecting the service we created inside of the ui library.**

22) Go to your  **app.component.scss**  file, and add the following code.

```
.employees-container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
}
```

## Bonus (Shared Assests)

### Now, I'm Going to Show You How to Share Assets Between Projects.

23) Go to your ui library, and create a subfolder called 'shared-assets', then create another folder called 'images', and add an  [image](https://miro.medium.com/max/3150/1*L_snRPts5LPR2tDBouaYjA.png)  there. Then name it as shown on the picture.

![Screen Shot 2019-11-20 at 6.29.59 PM](https://images.ctfassets.net/zojzzdop0fzx/5gE33ltJrcCYL2UZ0JxBoJ/0597107442e79df700189f47990487d3/Screen_Shot_2019-11-20_at_6.29.59_PM.png)

24) Now go to your  **angular.json**, and find assets.

Your file should look like this:

```
"assets": [
             "apps/employees/src/favicon.ico",
              "apps/employees/src/assets",
            {
              "glob": "**/*",
              "input": "./libs/ui/src/lib/shared-assets",
              "output": "./assets"
            }
          ]
```

**Restart VS Code to make sure it detects all the changes.**

## Time To Test Our App

25) In your command line run:

```
ng serve employees
```

![Screen Shot 2019-11-20 at 6.33.40 PM](https://images.ctfassets.net/zojzzdop0fzx/7njetbHNZpXnO1Tp6ImYKy/dd3aeefe7a82856e52986217ea04b320/Screen_Shot_2019-11-20_at_6.33.40_PM.png)

## And We Are Done! :)
