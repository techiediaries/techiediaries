It’s often common to have a single entry-point that exposes all the members of another module as a single member.

import * as utilities from "./utilities.js";
export { utilities };

This is so common that ECMAScript 2020 recently added a new syntax to support this pattern!

export * as utilities from "./utilities.js";

This is a nice quality-of-life improvement to JavaScript, and TypeScript 3.8 implements this syntax. When your module target is earlier than  `es2020`, TypeScript will output something along the lines of the first code snippet.

Special thanks to community member  [Wenlu Wang (Kingwl)](https://github.com/Kingwl)  who implemented this feature! For more information,  [check out the original pull request](https://github.com/microsoft/TypeScript/pull/34903).