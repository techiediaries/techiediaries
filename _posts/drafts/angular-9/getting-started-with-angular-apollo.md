# 

This Dot Labs: Getting Started with Angular & Apollo

GraphQL came about to solve some of the issues present with RESTful API architecture. Issues like: over-fetching (getting far more data than I need), under-fetching (not getting enough data and having to make another round-trip), all-or-nothing (if an error occurs while trying to retrieve any of the data, the operation fails), type-safety (require what is expected, know what will be returned; thus, fewer bugs), etc. It is a very powerful spec (all hail the mighty resolver) that has caused a pretty massive shift in the industry.

The focus of this article will be on interacting with a GraphQL API to query and mutate data through an Angular SPA. We will build an app around an Event Calendar, view events, create & edit events, etc. To connect to our GraphQL API we will be using the  [Apollo Angular](https://www.apollographql.com/docs/angular/)  library. Apollo is a great platform implementation of GraphQL with a variety of awesome libraries, toolsets, even a GraphQL server.

Follow along with the  [repo here](https://github.com/cmwhited/event-calendar).

## Setup

To begin, let’s create a new Angular Application using the  [angular cli](https://cli.angular.io/). If you have not installed the angular cli, it is very simple, open your favorite terminal and install it globally with npm:

```
npm i -g @angular/cli
```

Once completed, you can validate that it was installed successfully by checking the version:

```
ng --version
```

### Create the App

Now lets create the app using the cli (you will want to be in the directory where you want the app installed, if so,  `cd`  into that directory first):

```
$ ng new event-calendar --style=scss --routing=true
```

And huzzah! A new angular app! For sanity sake, let’s make sure everything went smoothly,  `cd`  into the new app directory and run it:

```
$ cd event-calendar
$ ng serve
```

If the app started successfully, you should be able to open a web browser window and navigate to  [http://localhost:4200/](http://localhost:4200/)  and see the app. Note. 4200 is the default port, if you would like to run it on some other port, add the port as a param to the  `ng serve`  command:

```
$ ng serve --port 4201
```

### Adding Apollo

The  `ng add`  functionality of the cli makes it incredibly easy to add new modules to our angular apps. Including the angular apollo GraphQL client implementation module;

```
$ ng add apollo-angular
```

This command does a few things for us:

-   Installs and adds the required dependencies to our  `package.json`
-   Creates a GraphQL module:  `./src/app/graphql.module.ts`  which has the initial setup required to create a connection to our graphql server and expose the connection as an angular module
-   Adds the GraphQL module to the Application module:  `./src/app/app.module`  imports property to make it available to our application.

This is awesome as it took care of the initial boilerplate work for us. The only thing we need to do is set the URI of where our GraphQL API server is running. Open the  `./src/app/graphql.module.ts`  GraphQL Module file and you will see a  `const`  variable named:  `uri`  that is currently and empty string with a helpful comment saying telling you to “<-- add the URL of the GraphQL server here”. Go ahead and do as the comment says and let's add our GraphQL Server URI. For the purpose of this article, the URI will be:  `http://127.0.0.1:3000/graphql`. Note this is a local graphql api I have running, checkout the  [repo](https://github.com/cmwhited/event-calendar-api)  for more information.

### Adding Angular Material Styling

The focus of this article is not on Angular Material, but it is a component of this project. Checkout the  [Angular Material Docs](https://material.angular.io/)  for usage, component docs, guides, etc. We will add the angular material module to our app using  `ng add`  just like we did with apollo:

```
$ ng add @angular/material
```

This will prompt you with some questions:

1.  Choose a prebuilt theme name, or “custom” for a custom theme → I went with Deep Purple/Amber. Choose whatever you would like.
2.  Set up HammerJS for gesture recognition → Y
3.  Set up browser animations for Angular Material → Y

And just like with apollo, this will install the required dependencies and update the  `package.json`. It also add the theming info to  `./src/styles.scss`  as well as importing the Roboto & Material Design icon fonts.

## Getting Calendar Events

That is enough boilerplate/setup. Time to start leveraging the power of GraphQL. Let’s start with a query to get a list of events for our calendar and display these events.

### Creating the calendar-event module

Angular architecture promotes the creation of  `modules`; think package-by-feature. A module should contain all of the necessary components to provide for the full feature. Things like:

-   Routing
-   Models
-   Services
-   Route Guards
-   Components

Those are all traditional angular class types, we will also have:

-   Queries
-   Mutations

To support this module interacting with our GraphQL server to query & mutate data. Again, we will use the cli to create our module:

```
$ ng g module calendar-event --routing=true
```

This creates a directory called  `./src/app/calendar-event`  for us with 2 files:  `./src/app/calendar-event/calendar-event-routing.module.ts`  and  `./src/app/calendar-event/calendar-event.module.ts`. These are the building blocks of our module. We can leave these alone for now.

### Calendar Event Models

Let’s create a model that will represent a calendar event. Create a directory called  `models`  inside of  `./src/app/calendar-event`. And in this directory create a file:  `calendar-event.model.ts`. This is where we will define the models that represent a calendar event entry.

```
export type EventStatus = ‘UPCOMING’ | ‘STARTED’ | ‘COMPLETED’;
export type AttendingStatus = ‘GOING’ | ‘PENDING’ | ‘NOT_GOING’;

export type Guest = {
	_id: string;
	name: string;
	email: string;
	attending: AttendingStatus;
}

export type CalendarEvent = {
	_id: string;
	Status: EventStatus;
	eventStart: string;
	startTime: string;
	eventEnd: string;
	endTime: string;
	name: string;
	description?: string;
	location?: string;
	guests?: Guest[];
}
```

### GraphQL Queries

To solve the over/under-fetching problem with REST, GraphQL exists as a querying framework for your API. What this means is, as the client/consumer of the API, you can define what fields you want returned from the API. This is incredibly powerful. It allows us to select only the fields we  _want/need_  to be returned without the potential overhead of all the fields.

On the flipside, there is not a potential second round trip request. For instance, if you have a list of objects and in your list you only need the id and a couple fields, then that is your query and that is what the API returns; no extra bloat from fields you do not need. Then if the user navigates to a details page, you can run another query to return all of the fields in the object and display those. We can also specify multiple queries in one request and it will return the results from all queries.

_Note_  it does not process the queries necessarily in the order you give them.

Let’s look at a quick example of this.

For this example, we have an API that has two queries it exposes:  `hello`  which returns a  `string`: ‘HELLO’, and  `world`  which also returns a  `string`: ‘WORLD’. To retrieve both, we can write a query:

```
query RetrieveHelloWorld {
	hello
	world
}
```

And when submitted, it will run both queries and return both in the response:

```
{
	“data”: {
		“hello”: “HELLO”,
		“world”: “WORLD”
	}
}
```

Awesome! Both queries and data returned. This is amazing. Think on load of an application, you could get the authenticated user and any initial data you would like instead of having to make each request separately making multiple roundtrips to the server.

### Adding Queries in Apollo Angular

Apollo provides a couple ways we can query for data in Angular. Let’s explore them now.

The first way to run a query is by utilizing the  `Apollo`  service provided by the  `apollo-angular`  library. Just like any service provider, inject the  `Apollo`  service in the constructor of your component and pass the graphql query in to the  `.watchQuery`  method on the  `Apollo`  service. The  `valueChanges`  of this method return an  `Observable`  of our data that we can interact with. Let’s create a component to query for a list of  `CalendarEvent`  records:

```
//src/app/calendar-event/containers/calendar-events-list-container/calendar-events-list-container.component.ts
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { CalendarEvent } from '../../models;

const calendarEventsListQuery = gql`
	query CalendarEventsQuery {
		events {
			_id
			name
			description
			eventStart
			startTime
			eventEnd
			endTime
		}
	}
`;

@Component({
	selector: ‘app-calendar-events-list-container’,
	templateUrl: ‘./calendar-events-list-container.component.html’,
	styleUrls: [‘./calendar-events-list-container.component.scss’]
})
export class CalendarEventsListContainerComponent implements OnInit {
	calendarEvents$: Observable<CalendarEvent[]>;

	constructor(private readonly apollo: Apollo) {}

	ngOnInit() {
		// use injected apollo service to run query
		// response JSON returns as { data: { events: [] } }
		// to get the calendarEvents$, map to the data.events
		this.calendarEvents$ = this.apollo.
			.watchQuery({ query: calendarEventsListQuery })
			.valueChanges.pipe(map(({ data }) => data.events));
	}
}
```

Super simple. The  `valueChanges`  getter on the  `Apollo`  service returns an observable of our data. We can use this with the  `map`  operator to select the  `events`  from the returned JSON data. We can also pass variables into our queries by passing an object to the  `variables`  prop in the  `.watchQuery`  method. If we want to pass in a variable like  `first`  to get the first # of results that match the query, update the query to include the variable:

```
const calendarEventsListQuery = gql`
  query CalendarEventsQuery($first: Int!) {
    events(first: $first) {
      _id
      name
      description
      eventStart
      startTime
      eventEnd
      endTime
    }
  }
`;
```

And then update the call to the  `Apollo`  service:

```
const variables = { first: 10 }
this.calendarEvents$ = this.apollo.
  .watchQuery({ query: calendarEventsListQuery, variables })
	.valueChanges.pipe(map(({ data }) => data.events));
```

Check out the Query Apollo Angular docs  [here](https://www.apollographql.com/docs/angular/basics/queries/)  for more info.

The other, and my preferred, way to query for data is to create a custom service provider class that extends  `Query`  and defines our query.  `Query`  is a type exposed by the  `apollo-angular`  library and accepts two generic types: the response type, and a type representing any variables to pass to the query. Let’s move our Calendar Events list query from above and build out a query service for it instead:

```
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent } from '../../models;

type CalendarEventsListResponse = {
	events: CalendarEvent[];
}

@Injectable()
export class CalendarEventsQuery extends Query<CalendarEventsListResponse> {
	document = gql`
		query CalendarEventsQuery {
			events {
				_id
				name
				description
				eventStart
				startTime
				eventEnd
				endTime
			}
		}
	`;
}
```

Because this is a service provider, and is annotated  `Injectable()`, we need to provide it to our module to make it available for dependency injection. To achieve this, add it to the  `providers`  prop on the  `NgModule`

```
// imports
import { CalendarEventsQuery } from ‘./graphql’;

@NgModule({
	// declarations, imports, etc
	providers: [
		// other services
		CalendarEventsQuery
	]
})
export class CalendarEventModule {}
```

And we can now update our container component:

```
//src/app/calendar-event/containers/calendar-events-list-container/calendar-events-list-container.component.ts
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { CalendarEventsQuery } from '../../graphql;

@Component({
	selector: ‘app-calendar-events-list-container’,
	templateUrl: ‘./calendar-events-list-container.component.html’,
	styleUrls: [‘./calendar-events-list-container.component.scss’]
})
export class CalendarEventsListContainerComponent implements OnInit {
	calendarEvents$: Observable<CalendarEvent[]>;

	constructor(private readonly calendarEventsQuery: CalendarEventsQuery) {}

	ngOnInit() {
		// use injected apollo service to run query
		// response JSON returns as { data: { events: [] } }
		// to get the calendarEvents$, map to the data.events
		this.calendarEvents$ = this.calendarEventsQuery.watch().valueChanges.pipe(map({ data }) => data.events));
	}
}
```

And, just like with the first option, we can add variables as well. First we need to update our  `CalendarEventsQuery`  service class:

```
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

import { CalendarEvent } from '../../models;

type CalendarEventsListResponse = {
	events: CalendarEvent[];
}

export type CalendarEventsListVariables = {
	first: number;
}

@Injectable()
export class CalendarEventsQuery extends Query<CalendarEventsListResponse, CalendarEventsListVariables> {
	document = gql`
		query CalendarEventsQuery($first: Int!) {
			events(first: $first) {
				_id
				name
				description
				eventStart
				startTime
				eventEnd
				endTime
			}
		}
	`;
}
```

And now we pass the variables into the  `watch`  method on our injected query instance in our component:

```
//src/app/calendar-event/containers/calendar-events-list-container/calendar-events-list-container.component.ts
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { CalendarEventsQuery } from '../../graphql;

@Component({
	selector: ‘app-calendar-events-list-container’,
	templateUrl: ‘./calendar-events-list-container.component.html’,
	styleUrls: [‘./calendar-events-list-container.component.scss’]
})
export class CalendarEventsListContainerComponent implements OnInit {
	calendarEvents$: Observable<CalendarEvent[]>;

	constructor(private readonly calendarEventsQuery: CalendarEventsQuery) {}

	ngOnInit() {
		// use injected apollo service to run query
		// response JSON returns as { data: { events: [] } }
		// to get the calendarEvents$, map to the data.events
		this.calendarEvents$ = this.calendarEventsQuery.watch({ first: 10  }).valueChanges.pipe(map({ data }) => data.events));
	}
}
```

Very similar to what we had in the first option. The advantage here is that, because we separated out the query into its own service class, we can inject it into any component to connect and run our query. It makes the query reusable in case multiple components wanted to consume the data. For more information about this method of querying for data, check out the query service  [docs here](https://www.apollographql.com/docs/angular/basics/services/).

## Creating a Calendar Event

Queries are all about fetching data. The convention is that a Query should not change any data in a data platform. However, creating, updating and deleting data is almost always a requirement. GraphQL handles this with the concept of a  `Mutation`. A mutation is really similar in structure to a query: you pass in the name of the mutation, any necessary variables, and the data you want returned. The key differences are that a mutation request starts with the keyword  `mutation`  and if we need to pass input to the mutation (like the object to create/update) that object needs to be an  `input`  type object.

### GraphQL Mutations

Let’s go through a quick example from the  [docs](https://graphql.org/learn/queries/#mutations)  First let’s define our input type which we will pass as a variable to our mutation:

```
input ReviewInput {
	stars: Int!
	commentary: String
}
```

The key here is that our type of  `ReviewInput`  is  `input`. The mutation will fail if this not declared as  `input`. This is one of the biggest complaints against GraphQL as it can lead to duplicated types. I personally find this helpful as it helps me to be very specific about the shape of my input and what I want to require to create or update a data object. And now to write our mutation:

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
	createReview(episode: $ep, review: $review) {
		start
		commentary
	}
}
```

This should look very familiar. As I mentioned, the shape of the request is very similar to a Query. Key difference being the  `mutation`  keyword to start the request.

### Adding Mutations in Apollo Angular

Now for the angular part. Just like queries above, we can use the  `Apollo`  service and then dispatch a mutation with the  `mutate({ mutation })`  method. But instead, let’s use a  `Mutation`  service provider; code-reusability and all. The  `Mutation`  class we will extend is very similar to the  `Query`  class, it accepts a couple generics: the return type from the mutation, and a type that represents the variables to pass to the mutation.

```
import { Injectable } from ‘@angular/core’;
import { Mutation } from ‘apollo-angular’;
import gql from ‘graphql-tag’;

import { CalendarEvent } from ‘../../models’;

type CreateCalendarEventResponse = {
	createEvent: CalendarEvent;
};

type CreateCalendarEventVariables = {
	event: CalendarEvent;
};

@Injectable()
export class CreateCalendarEventMutation extends Mutation<CreateCalendarEventResponse, CreateCalendarEventVariables> {
	document = gql`
		mutation CreateCalendarEvent($event: CalendarEventInput!) {
			createEvent(event: $event) {
				_id
				status
				name
				description
				eventStart
				startTime
				eventEnd
				endTime
				location
				recurring
				guests {
					_id
					name
					email
					attending
				}
			}
		}
	`;
}
```

Super straightforward. Create a  `mutation`  request object where we can pass in our  `$event`  variable that will be provided through the  `CreateCalendarEventVariables`  type, give it the name of our mutation -  `createEvent`  - reference the variable, and list the fields we want returned.

Just like the query, since this is annotated as  `@Injectable()`, we need to provide it to our module, open the  `calender-event.module.ts`  again and lets add it to our  `providers`  prop:

```
// imports
import { CalendarEventsQuery, CreateCalendarEventMutation } from ‘./graphql’;

@NgModule({
	// declarations, imports, etc
	providers: [
		// other services
		CalendarEventsQuery,
		CreateCalendarEventMutation
	]
})
export class CalendarEventModule {}
```

Create a container component that will inject the  `CreateCalendarEventMutation`  service. It exposes a  `mutate`  method where we will pass our variables:  `{ event: CalendarEvent }`  and then subscribe to the result. To keep it simple, on subscribe, we will route to the  `CalendarEventDetails`  component which will display the details of the newly created  `CalendarEvent`:

```
import { Component } from ‘@angular/core’;
import { Router } from ‘@angular/router’;

import { CalendarEvent } from ‘../../models’;
import { CreateCalendarEventMutation } from ‘../../graphql’;

@Component({
	selector: ‘app-create-calendar-event-container’,
	templateUrl: ‘./create-calendar-event-container.component.html’,
	styleUrls: [‘./create-calendar-event-container.component.scss’]
})
export class CreateCalendarEventContainerComponent {
	constructor(private readonly createCalendarEventMutation: CreateCalendarEventMutation, private readonly router: Router) {}

	createCalendarEvent(event: CalendarEvent) {
		this.createCalendarEventMutation.mutate({ event }).subscribe(({ created }) => {
			// created is the data.createdEvent response from the mutation
			// the type is CalendarEvent
			// route to the details page
			this.router.navigate([‘/calendar-events/details’, created._id]);
		}
	}
}
```

When the  `createCalendarEvent`  function is invoked with the event data, like from the user entering the data from a form, we use the injected  `CreateCalendarEventMutation`  instance to dispatch our mutation with the  `CalenderEvent`. When it completes, we subscribe to the results which should contain the created  `CalendarEvent`  data and navigate to the event details page.

## Conclusion

There is a lot more to the apollo angular library. It helps a lot with the abstraction of connecting to a GraphQL API, handling data caching, and providing convenience classes to perform our queries and mutations.

This article only covers a couple quick examples of queries and mutations. Check out the  [repo](https://github.com/cmwhited/event-calendar)  for more, as well as the forms to enter and save  `CalendarEvent`  records. I hope you found this article helpful, thanks for reading along.

## References

-   [GraphQL Learn Docs](https://graphql.org/learn/)
-   [Apollo Angular Docs](https://www.apollographql.com/docs/angular/)
-   [Angular Material](https://material.angular.io/)