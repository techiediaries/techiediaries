![](https://miro.medium.com/max/808/1*Te6AUmIkPJQUnZ03GYvN3A.png)

Image source: Sarindu Udagepala

When I first started working with NgRx, I faced a steep learning curve. It took quite a bit of reading and research to understand the basic elements that NgRx comprises. The prime objective of this piece is to pass on the knowledge that I gathered to readers so that their lives with NgRx will be easier.

I intend to cover the following topics:

-   What is NgRx?
-   Fundamental elements of NgRx: Store, Actions, Reducers, Selectors, Effects
-   Interaction between NgRx components
-   Pros and cons of NgRx

----------

# **What Is NgRx?**

To begin with,  [NgRx](https://ngrx.io/)  stands for Angular Reactive Extensions. NgRx is a state management system that is based on the  [Redux](https://redux.js.org/)  pattern. Before we go further into details, let’s try and understand the concept of  _state_  in an Angular application.

## State

Theoretically, application state is the entire memory of the application. In simple terms, application state is composed of data received by API calls, user inputs, presentation UI state, application preferences, etc. A simple, concrete example of an application state would be a list of customers maintained in a CRM application.

Let’s try to understand the application state in the context of an Angular application. As you are well aware, an Angular application is typically made up of many components. Each of these components has its own state and has no awareness of the state of the other components. In order to share information between parent-child components, we use  `@Input`  and`@Output`  decorators. However, this approach is practical only if your application consists of a few components, as shown below.

![](https://miro.medium.com/max/30/1*NEUhZVLdda4h_JGsN0YQbA.png?q=20)

![](https://miro.medium.com/max/1000/1*NEUhZVLdda4h_JGsN0YQbA.png)

When the number of components grows, it becomes a nightmare to pass the information between components solely via  `@Input`  and  `@Output`  decorators. Let’s take the following figure to elaborate on this.

![](https://miro.medium.com/max/30/1*tc8j2S1sQOvn1HTuFDWQ7Q.png?q=20)

![](https://miro.medium.com/max/1620/1*tc8j2S1sQOvn1HTuFDWQ7Q.png)

If you have to pass information from component three to component six, you will have to hop four times and involve three other components. As you can see, it’s a very cumbersome and error-prone way of managing the state. This is where the Redux Pattern comes into play.

## Redux

Redux is a pattern that’s used to simplify the state management process in JavaScript applications (not just for Angular). Redux is primarily based on three main principles.

**Single source of truth** — This means the state of your application is stored in an object tree within a  single store. The store is responsible for storing the data and providing the data to components whenever requested. (I’m referring to Angular applications here. But Redux can be applied to any JavaScript application in general.) According to this architecture, data flows between the store and the components, instead of from component to component. The following figure illustrates this concept.

![](https://miro.medium.com/max/30/1*m7oCgnY2PSeEXB1PK47syQ.png?q=20)

![](https://miro.medium.com/max/1280/1*m7oCgnY2PSeEXB1PK47syQ.png)

**Read-only state** — In other words, state is immutable. This doesn’t necessarily mean that state is always constant and cannot be changed. It only implies that you are not allowed to change the state directly. In order to make changes in the state, you have to dispatch  _actions_  (which we will discuss in detail later) from different parts of your application to the store.

**State is modified with pure functions**  — Dispatching actions will trigger a set of pure functions called  _reducers_. Reducers are responsible for modifying the state in different ways based on the action received. A key thing to note here is that a reducer always returns a new state object with the modifications.

## NgRx

NgRx is a group of libraries inspired by the Redux pattern. As the name suggests, NgRx is written specifically for Angular application as a state management solution. We will dive into the fundamental building blocks of NgRx library in the next section. Please note that I will be using NgRx version 8 for all the sample codes.

----------

# Fundamental Elements of NgRx: Store, Actions, Reducers, Selectors, Effects

## The store

The store is the key element in the entire state management process. It holds the state and facilitates the interaction between the components and the state. You can obtain a reference to the store via Angular dependency injection, as shown below.

constructor(private store: Store<AppState>) {}

![](https://miro.medium.com/max/30/1*eToWxwblvR9I7l-_OYnfvQ.png?q=20)

![](https://miro.medium.com/max/328/1*eToWxwblvR9I7l-_OYnfvQ.png)

This store reference can be subsequently used for two primary operations:

-   To dispatch actions to the store via the  `store.dispatch(…)`  method, which will in turn trigger reducers and effects
-   To retrieve the application state via selectors

**Structure of a state object tree**

Suppose your application consists of two feature modules called User and Product. Each of these modules handles different parts of the overall state. Product information will always be maintained in the  `products`  section in the state. User information will always be maintained in the  `user`  section of the state. These sections are also called  _slices_.

![](https://miro.medium.com/max/30/1*gF8j4ZNldTYOdS-N180h-w.png?q=20)

![](https://miro.medium.com/max/1100/1*gF8j4ZNldTYOdS-N180h-w.png)

## Actions

An action is an instruction that you dispatch to the store, optionally with some metadata (payload). Based on the action type, the store decides which operations to execute. In code, an action is represented by a plain old JavaScript object with two main attributes, namely  `type`  and  `payload`.  `payload`  is an optional attribute that will be used by reducers to modify the state. The following code snippet and figure illustrate this concept.

![](https://miro.medium.com/max/30/1*fZUDdgwDbBW9zQD6TqRbpQ.png?q=20)

![](https://miro.medium.com/max/312/1*fZUDdgwDbBW9zQD6TqRbpQ.png)

{ "type": "Login Action", "payload": { userProfile: user }}

NgRx version 8 provides a utility function called  `createAction`  to define action creators (not actions, but action creators). Following is an example code for this.

You can then use the  `login`  action creator (which is a function) to build actions and dispatch to them to the store as shown below.  `user`  is the  `payload`  object that you pass into the action.

this.store.dispatch(login({user}));

## Reducers

Reducers are responsible for modifying the state and returning a new state object with the modifications. Reducers take in two parameters, the current state and the action. Based on the received action type, reducers will perform certain modifications to the current state and produce a new state. This concept is showcased in the diagram below.

![](https://miro.medium.com/max/30/1*LJ-jxq0mpM18JOrtJzGPiw.png?q=20)

![](https://miro.medium.com/max/760/1*LJ-jxq0mpM18JOrtJzGPiw.png)

Similar to actions, NgRx provides a utility function called  `createReducer`  to create reducers. A typical  `createReducer`  function call would like the following.

As you can see, it takes in the initial state (the state at the application startup) and one-to-many state change functions that define how to react to different actions. Each of these state change functions receives the current state and the action as parameters, and returns a new state.

## Effects

Effects allow you to perform side effects when an action is dispatched to the store. Let’s try to understand this through an example. When a user successfully logs in to an application, an action with  `type`  `Login Action`  will be dispatched to the store with the user information in the  `payload`. A reducer function will listen to this action and modify the state with the user information. In addition, as a side effect, you also want to save user information in the browser's local storage. An effect can be used to carry out this additional task (side effect).

There are multiple ways to create effects in NgRx. Following is a raw and self-explanatory way of creating effects. Please note that you don’t generally use this method to create effects. I only took this as an example to explain what happens behind the curtain.

-   `actions$`  observable will emit actions received by the store. These values will go through an operator chain.
-   `ofType`  is the first operator used. This is a special operator provided by NgRx (Not RxJS) to filter out actions based on their type. In this instance, only  `login`-type actions will be allowed to go through the rest of the operator chain.
-   `tap`  is the second operator used in the chain to store the user information in browser local storage. The  `tap`  operator is generally used to perform side effects in an operator chain.
-   Finally, we have to manually subscribe to the  `login$`  observable.

However, this approach has a couple of major drawbacks.

-   You have to manually subscribe to the observable, which is not a good practice. This way, you will always have to manually unsubscribe, which leads to lack of maintainability.
-   If an error pops up in the operator chain, the observable will error out and will stop emitting subsequent values (actions). As a result, the side effect will not be performed. Therefore, you have to have a mechanism in place to manually create a new observable instance and resubscribe if an error occurs.

In order to overcome these issues, NgRx provides a utility function called  `createEffect`  to create effects. A typical  `createEffect`  function call would look like the following.

The  `createEffect`  method takes in a function that returns an observable and (optionally) a configuration object as parameters.

NgRx handles the subscription to the observable returned by the support function, and therefore you don’t have to manually subscribe or unsubscribe. In addition, if any error occurs in the operator chain, NgRx will create a new observable and resubscribe to ensure that the side effect always gets executed.

If  `dispatch`  is  `true`  (default value) in the configuration object, the  `createEffect`  method returns an  `Observable<Action>`. Else, it returns an  `Observable<Unknown>`. If  `dispatch`  property is  `true`, NgRx will subscribe to the returned observable of  `type`  `Observable<Action>`  and dispatch the actions received to the store.

If you are not mapping the received action to a different type of action in the operator chain, you will have to set  `dispatch`  to  `false`. Otherwise, the execution will result in an infinite loop, as the same action will get dispatched and received in the  `actions$`  stream again and again. For example, you don’t have to set  `dispatch`  to  `false`  in the code below because you map the original action to a different type of action in the operator chain.

In the above scenario,

-   Effect receives actions of  `type`  `loadAllCourses`.
-   An API is invoked and courses are loaded as the side effect.
-   The API response to an action of  `type`  `allCoursesLoaded`  is mapped and the loaded courses are passed as the  `payload`  to the action.
-   And finally, the`allCoursesLoaded`  action that’s been created is dispatched to the store. This is done by NgRx under the hood.
-   A reducer will listen to the incoming  `allCoursesLoaded`  action and modify the state with the loaded courses.

## Selectors

Selectors are pure functions used for obtaining slices of the store state. As shown below, you can query the state even without using selectors. But this approach again comes with a couple of major cons.

const isLoggedIn$ = this.store.pipe(map(state => !!state.user));

-   `store`  is an observable that you can subscribe to. Whenever the store receives an action,  `store`  will push the state object on to its subscribers.
-   You can use mapping functions to obtain slices of state and carry out any computation if required. In the above example, we are obtaining the  `user`  slice in the state object tree and converting it into a boolean to determine whether the user has logged in or not.
-   You can either manually subscribe to the  `isLoggedIn$`  observable or use it in an Angular template with async pipe to read the values emitted.

However, this approach has a major drawback. In general, the store receives actions frequently from different parts of the application. As per the above implementation, every time the store receives an action, a state object will be emitted by the store. And this state object will again go through the mapping function and update the UI.

However, if the result of the mapping function hasn’t changed from last time, there is no need to update the UI again. For example, if the result of the  `map(state => !!state.user)`  hasn’t changed from the last execution, we don’t have to again push the result on to the UI/Subscriber. In order to achieve this, NgRx (not RxJS) has introduced a special operator called  `select`. With the  `select`  operator, the above code will change as follows.

const isLoggedIn$ = this.store.pipe(select(state => !!state.user));

The  `select`  operator will prevent values being pushed to UI/subscribers if the result of the mapping function hasn’t changed from last time.

This approach can be improved further. Even if the  `select`  operator doesn’t push unchanged values to UI/Subscribers, it still has to take the state object and do the computation to derive the result every time.

As already explained above, a  `state`  will be emitted by the observable when the store receives an action from the application. An action doesn’t always update the state. If the state hasn’t changed, the result of the mapping function computation will not change either. Therefore we don’t have to do the computation again if the emitted  `state`  object hasn’t changed from last time. This is where the selectors come into play.

A selector is a pure function that maintains a memory of the previous executions. As long as the input hasn’t changed, the output will not be recalculated. Instead, the output will be returned from the memory. This process is called  _memoizatio_n.

NgRx provides a utility function called  `createSelector`  to build selectors with memoization capability. Following is an example of the`createSelector`  utility function.

The  `createSelector`  function takes in one-to-many mapping functions that give different slices of the state and a projector function that carries out the computation. The projector function will not be invoked if the state slices haven’t changed from the last execution. In order to use the created selector function, you have to pass it as an argument to the  `select`  operator.

this.isLoggedIn$ = this.store .pipe( select(isLoggedIn) );

----------

# Interaction Between NgRx Components

The following figure illustrates how the different components in NgRx ecosystem interact with each other.

![](https://miro.medium.com/max/30/1*5ljMtJ-F-WXRO_B2KD-JOg.png?q=20)

![](https://miro.medium.com/max/954/1*5ljMtJ-F-WXRO_B2KD-JOg.png)

----------

# Pros and Cons of NgRx

## Pros

-   The concept of a single source of the truth makes it easier for components to share information in an Angular application.
-   Application state cannot be directly changed by the components. Only the reducers are able to change the state. That makes debugging easier.

## Cons

-   There is a steep learning curve when you first start working with NgRx.
-   Application will be a bit verbose as you have to introduce several new artifacts, such as reducers, selectors, effects, and so on.

----------

# Conclusion

The prime objective of this piece was to give you an introduction to NgRx concepts. I’m planning to implement a complete NgRx-based Angular application in my next piece.