
This post explains how to make  _network-aware_  preloading strategy for lazy loading of Angular Router.

It can improve user experience with lazy loading despite users network condition.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--BInkreHU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/t6o2d6hv9v3jjbtx5pkl.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--BInkreHU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/t6o2d6hv9v3jjbtx5pkl.png)

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#what-is-preloading)What is Preloading?

**Preloading**  is an important feature of Angular Router's lazy loading. This is available since 2.1.0.

By default, when the application uses lazy loading with  `loadChildren`, chunked lazy modules will be loaded on-demand. It can reduce initial bundle size but users have to wait for loading of chunks on transition.

Preloading changes that. By preloading, the application will start loading chunked modules  **before needed**. It can improve user experience with smooth transition.

Here is the best article to read at first about preloading in Angular by Victor Savkin. He is the author of the feature.

[Angular Router: Preloading Modules](https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb)

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#preloading-strategy)Preloading Strategy

Angular Router supports customizing preloading behavior with  `PreloadingStrategy`  feature. There are two built-in strategies;  `PreloadAllModules`  and  `NoPreloading`.

`NoPreloading`  is the default behavior that doesn't preload any modules.

`PreloadAllModules`  loads all lazy modules immediately after bootstrapping. In other word, this is "As soon as possible" strategy.

```
import { RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // or NoPreloading
    }),
  ],
})
class AppRoutingModule {}

```

`PreloadingStrategy`  is a simple class object implementing a  `preload`  method. So we can make custom preloading strategy in ease like below.

The  `preload`  method takes two arguments;  `route`  and  `load`  .  `route`  is a route object that you declare in  `routes`  array.  `load`  is a function that trigger loading a module.

```
// custom-preloading-strategy.ts
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (shouldPreload(route)) {
      return load();
    } else {
      return EMPTY;
    }
  }
}

// app-routing.module.ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
})
class AppRoutingModule {}

```

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#preloading-problem-cost-of-networking)Preloading Problem: Cost of networking

Preloading can improve user experience, but it is only in the case the device uses in fast network enough. Sometimes mobile devices have a narrow-band network connection. If then the application tries to preload all modules ASAP, it affects other connections like AJAX in a bad way.

Preloading is an appropriate solution for users who has a strong network. If they don't, on-demand loading is better. But this condition can change very dynamically, so the application have to get network information in runtime and turning on/off preloading.

I call that "**Network-aware Preloading Strategy**".

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#using-network-information-api)Using Network Information API

[**Network Information API**](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)  is a new Web standard API proposal. The Network Information API provides information about the system's connection.

The entire API consists of the addition of the  `NetworkInformation`  interface and a single property to the  `Navigator`  interface:  `Navigator.connection`  . Because this API is not a standard yet, TypeScript doesn't have its type definition. So I've created that as  `network-information-types`  package and it is used in all example codes below.

## ![GitHub logo](https://res.cloudinary.com/practicaldev/image/fetch/s--qF2jUiUG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae041eacb8a148b1bab9.svg)[lacolaco](https://github.com/lacolaco)  /  [network-information-types](https://github.com/lacolaco/network-information-types)

### Type definitions for Network Information API

# network-information-types

[![npm version](https://camo.githubusercontent.com/5c72e3368a8b8727807180c48108963561dc2108/68747470733a2f2f62616467652e667572792e696f2f6a732f6e6574776f726b2d696e666f726d6174696f6e2d74797065732e737667)](https://badge.fury.io/js/network-information-types)

Type definition for  [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)

## Caveat

This is a temporary solution until TypeScript adds support for this API as built-in types. See  [https://github.com/Microsoft/TypeScript/issues/27186](https://github.com/Microsoft/TypeScript/issues/27186)  .

## Usage

-   Install Package via npm
-   Edit your tsconfig.json
-   Now you get  `navigator.connection`  with its type!

### Install

$ yarn add -D network-information-types

### tsconfig.json

`network-information-types`  is a  _ambient_  types that modify global  `navigator`  type, so  **it MUST be added in  `types`**.

Package names in  `types`  array are resolved with  `typeRoots`. By default,  `typesRoots`  is just  `./node_modules/@types`  To resolve  `network-information-types`  package, add the relative path directly as below.

{
  "compilerOptions": {
    ...
    "types": [
        "./node_modules/network-information-types"
    ]
  }
}

### Use the types

Now you can access  `navigator.connection`  property as  `NetworkInformation`  object.

`navigator.connection`  and its properties are all optional because browser support for each is separated See  [https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#Browser_compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#Browser_compatibility)  .

// Example: http://wicg.github.io/netinfo/#example-1
if (navigator.connection)

…

[View on GitHub](https://github.com/lacolaco/network-information-types)

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#making-networkaware-preloadingstrategy)Making Network-aware PreloadingStrategy

Let's make network-aware preloading strategy with Network Information API! The following code defines  `shouldPreload`  function that is used in the above  `CustomPreloadingStrategy`  example.

`navigator.connection`  is landed in limited browsers. So we MUST detect the feature. In this case,

```
export function shouldPreload(route: Route): boolean {
  // Get NetworkInformation object
  const conn = navigator.connection;

  if (conn) {
    // With network information
  }
  return true;
}

```

## [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#detecting-save-data-mode)Detecting "Save Data" mode

At first, "Save Data" mode should be prioritized the best. It means the user strongly cares about payload size for their cost- or performance-constraints. Use  `NetworkInformation.saveData`  property and return  `false`.

```
export function shouldPreload(route: Route): boolean {
  // Get NetworkInformation object
  const conn = navigator.connection;

  if (conn) {
    // Save-Data mode
    if (conn.saveData) {
      return false;
    }
  }
  return true;
}

```

## [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#detecting-2g-connection)Detecting "2G" connection

Network Information API can recognize the network's effective connection type; 4G, 3G, 2G, and Slow 2G.

In this sample, the application disables preloading when the user is in 2G network.

```
export function shouldPreload(route: Route): boolean {
  // Get NetworkInformation object
  const conn = navigator.connection;

  if (conn) {
    // Save-Data mode
    if (conn.saveData) {
      return false;
    }
    // 'slow-2g', '2g', '3g', or '4g'
    const effectiveType = conn.effectiveType || '';
    // 2G network
    if (effectiveType.includes('2g')) {
      return false;
    }
  }
  return true;
}


```

Network Information API has also several other properties like  `rtt`  (RTT, round-trip time of the connection). You can add more checks for your application.

# [](https://dev.to/lacolaco/network-aware-preloading-strategy-for-angular-lazy-loading-4hae#conclusion)Conclusion

-   Angular Router is supporting  **preloading**  feature since 2.1.0.
-   You can create your own custom preloading strategy
-   Preloading is effective only for users with a fast network.
-   **Network Information API**  is available in several browsers.
-   It's very easy to make network-aware preloading strategy.

Thank you for reading!
