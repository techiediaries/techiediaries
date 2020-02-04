`useEffect`  is probably the most confusing and misunderstood hook in React. Today I want to clear that up for you (and there's a link to a  `useEffect`  cheatsheet PDF at the end of this email).

We use hooks all the time in  [TinyHouse](https://is-tracking-link-api-prod.appspot.com/api/v1/click/6332443681619968/6612104972861440)  and understanding  `useEffect`  is crucial if you're going to write modern-style React code.

Below we'll look at:

-   What  `useEffect`  is
-   How to run an effect on every  `render`
-   How to run an effect only on the first  `render`
-   How to run an effect on first render and re-run when a "dependency" changes
-   How to run an effect with cleanup

> By the way, we are  _completely_  finished with Part II of Tinyhouse - and we'll be running a sale all this week.
> 
> The new version has  **16+ additional**  hours of video that builds out the production features of the app (like taking payments and social auth).
> 
> You can get instant access to the course by  [clicking here](https://is-tracking-link-api-prod.appspot.com/api/v1/click/4651898945929216/6612104972861440)

## What is useEffect anyway?

The  [`useEffect`](https://is-tracking-link-api-prod.appspot.com/api/v1/click/5979720297742336/6612104972861440)  Hook allows us to perform  _side effects_  in our function components. Side effects are essentially anything where we want an "imperative" action to happen. This is stuff like:

-   API calls
-   updating the DOM
-   subscribing to event listeners

These are all side effects that we might need a component to do at different times.

## Run effect on every render

The  `useEffect`  Hook doesn't return any values but instead takes two arguments. The first being required and the second optional. The first argument is the  **effect callback function we want the Hook to run (i.e. the effect itself)**. Assume we wanted to place a  `console.log()`  message within an effect callback in a function component.

```

```

> Try the above code  [in CodeSandbox](https://is-tracking-link-api-prod.appspot.com/api/v1/click/5893139729743872/6612104972861440).
> 
> Some terminology: We're calling the  _function_  that is passed as an argument to  `useEffect`  "_the effect_". The code above is passing an "anonymous function" as the first argument to  `useEffect`. It's our anonymous function that we're calling "the effect" - that is, the thing we want to do that has a side effect.

By default, the effect stated in a  `useEffect`  Hook runs when the component  **first renders**  and  **after every update**. If we run the above code, we'll notice the  `console.log()`  message is generated as our component is rendered.  _If_  our component was to ever re-render (e.g. from a state change with something like  `useState`), the effect would run again.

Sometimes re-running an effect on  _every_  render is exactly what you want. But more often than not,  **you only want to run the effect in certain situations**  - like on first render.

## How to run the effect only on first render

The second argument of the  `useEffect`  Hook is optional and is a  **dependency list**  which allows us to tell React to  _skip_  applying the effect only until in certain conditions. In other words, the second argument of the  `useEffect`  Hook allows us to limit  **when the effect is to be run**. If we simply place a blank empty array as the second argument, this is how we tell React to only run the effect on  _initial render_.

```

```

With the above code, the  `console.log()`  message will only be fired when the component first mounts and won't be generated again even if the component re-renders multiple times.

> Try the above code  [in CodeSandbox](https://is-tracking-link-api-prod.appspot.com/api/v1/click/6183000221155328/6612104972861440).

This is much more "efficient" than running on every re-render, but isn't there a happy middle? What if we  _want_  to redo the effect, if something changes?

## Run effect on first render and re-run when dependency changes

Instead of having an effect run once in the beginning and on every update, we can attempt to restrict the effect to run only in the beginning and  **when a certain dependency changes**.

Assume, we wanted to fire off a  `console.log()`  message every time the value of a state property was to change. We can achieve this by placing the state property as a  _dependency_  of the effect callback. Check out this next code example:

```

```

Above, we have a button in the component template responsible in changing the value of the  `count`  state property when clicked. Whenever the  `count`  state property is changed (i.e. whenever the button is clicked), we'll notice the effect callback be run and the  `console.log()`  message be fired! Cue party-parrot gif.

> Try the above code  [in CodeSandbox](https://is-tracking-link-api-prod.appspot.com/api/v1/click/5994015150571520/6612104972861440).

## Run effect with cleanup

An effect callback gets run every time on initial render  _and_  when we've specified when an effect should run. The  `useEffect`  Hook also provides the ability to run a cleanup  _after_  the effect. This can be done by specifying a return function at the end of our effect.

```

```

In the example above, we'll notice the cleanup function message be fired  _before the_  intended effect is ever run. In addition, if our component ever un-mounts - the cleanup function will run as well.

A good example of when we might need a cleanup is when we set up a subscription in our effect but want to remove the subscription whenever the next subscription call is to be made, to avoid memory leaks.

> Try the above code  [in CodeSandbox](https://is-tracking-link-api-prod.appspot.com/api/v1/click/4972254913101824/6612104972861440).

This is primarily all the different ways the  `useEffect`  Hook can be utilized to run side-effects in components. In our  _Fullstack React Masterclass: Tinyhouse_, we've prepared neat cheat sheets of the different Hooks we use in the course. If you're interested in the  `useEffect`  Hook version, click the link below to download a copy.

[![image](https://ci5.googleusercontent.com/proxy/WzoKLkr41g70V4LnKwpuNIX-NWTOO4UuDiLutLQSE8Pke4JMGL3M6_Qq690HmBpw5Km5euxdKEc2AGjHtAC03Y0ixD9emVtUW59ylv4P2OVDx9tDXYuLL1o_WM97iV0Aw-4JJDJoJh7tw_Ucm1OX7GAOKDELjLyZsDFzvvx2YJK-gV1Up2YCzCXzwHQtVmZrTaKLVGHcX9Tee14-DWdu0H2fEuSP7W-7J0GuH_5cyax1Jhy2m69q4fh4H-8ekkcVPMVIQQoIqtMlVa1UrT1wr0a5ZseWu-uhxOmbJwcELxSqWwcnNjH9-A=s0-d-e1-ft#http://email-assets.fullstack.io.s3-website-us-east-1.amazonaws.com/assets/fs/2020-01-31-tinyhouse-useeffect-cheatsheet/s_23C2D645E2135A9867948FAC313A29B8DF5074DEB5634E09D8ED9B7C21291A65_1579485340651_image.e.jpg)](https://is-tracking-link-api-prod.appspot.com/api/v1/click/5312893741694976/6612104972861440)
