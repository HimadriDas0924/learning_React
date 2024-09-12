- React just isn't making our app fast, A lot of packages apart from 'react' are required to make the app fast.
  - eg: Parcel

### Points to remember:

0. Using a Bundler, we can create different dev build and prod build for our application.

1. What is `dev build` v/s `prod build`

- development build and production build refers to the different configuration and optimization applied to the codebase during the build process. These builds are used in different phases of SDLC.

- **Development Build:**

  - optimized for debugging and development speed.

  - usually NOT minified or compressed.

  - may include extra logging OR development only features.

  - faster build time, as some optimizations are skipped.

- **Production Build :**

  - optimized for performance and reduced file size.

  - minified, compressed.

  - tree shaking (removal of dead code)

  - optimized assets (images)

  - removal of dev only code or features.

2. if encountering any error regarding some dependencies:

- delete the node_modules, .parcel-cache, dist
- it won't matter bcz they can be re generated.
- do `npm install`: to download code of all dependencies of node_modules.
- then again create a dev build.

### STEP 1 -> (npm init)

- `npm init` : initializes a new node js project by creating a `package.json`. and asks for various information like : project name, author, version, description, keywords, git repo, entry point. These things entered are reflected in package.json.

  - whereas `npm init -y` or `npm init --yes` directly creates a package.json with `default value`.

- `package.json` is a configuration for npm. It will manage all the packages that we'll install in our system.

- package and dependencies are the same.

### STEP 2 -> (install a bundler)

- `Bundler` bundles/minifies your app for faster loading, manages dependency between different parts of the code. and then it can be put into production.
  eg: `webpack`, `parcel`, `veet`.

- There are 2 types of dependencies/packages that we can install :

  1. `dev dependency`: used during development.
  2. `normal dependency`: can be used when we're putting code in production.

  - `NOTE:` bundling has to be done during the development phase. So we'll install a bunder as a dev dependency `-D`

    - `npm install -D parcel`.

    - As soon as we install it, in `package.json`, we can see:

    ```javascript
        {   ...,
            ...,
            ...,
            "devDependencies": {
                "parcel": "^2.12.0"
            }
        }

    ```

    - `^ (charat)` represent that if there is a minor update i.e suppose: version: `2.12.1` then it will be automatically updated.

    - But if we put `~(tilda)` then in case of a major update eg: `3.0.0` also it will be automatically updated

    - `NOTE`: Always use ^ bcz putting ~ 'd update the dependency to a major version and things might break. `Don't put anything if you don't need any updates(major OR minor);`

    - `NOTE:` as soon as we install a package, a new file has appeared: `package-lock.json` && a folder `node_modules/` containing code for all the packages installed as well as (code of the dependencies on which our dependies depends on). That's why there is so much code.

      - This is called `Transitive dependency`.

      - so `parcel also has a package.json`.

      - So there are multiple package.json if we consider node_modules/ also.

    - `package-lock.json` keeps track of all the versions of all the dependencies used in our project. But `package.json` has a charat on it in the version of each dependency.

      - So `both package.json && package-lock.json are required` to know "what packages are used" && "what version is used" to maintain consistency between local and production.

      - In `package-lock.json`, for a dependency there exists keys like version , `intrigrity` (containing a hash: could be used to verify/check the version of package used in different places).

- `NOTE`: if I know what's in package.json && package-lock.json. I can regenerate my node_modules/

  - `npm install` in terminal. Then entire node_modules can be generate based on package.json && package-lock.json.

### STEP 3 -> (all about parcel)(bundler)

#### Role of Parcel:

- Parcel is one of the reason why react apps are fast.

  - Parcel also depends on other packages to make things fast.

- `npx parcel index.html`

  ### steps:

  - parcel goes to index.html and `builds a development build of it`.

  - Parcel `doesn't immediately write` this build to the `/dist` folder. Instead it keeps the `dev build in memory for faster processing`.

  - Parcel then `starts a development server` and `serves your app from memory`, typically a local port (default: `1234`).

  - **File Watching:** As you make changes in the source file, parcel watches for all these changes and updates the in-memory build.

  - The **dev server** uses `HMR = Hot Module Replacement` to push all these updates to the browser `without a full page reload`.

  - **/dist** folder: The dist folder is primarily used for `production build`. That's when parcel will store the `optimized, production-ready code to the 'dist' folder`.

  - **.parcel-cache** folder: stores cached data to speed up subsequent builds. On subsequent runs, parcel checks this `cache to determine what has changed and what can be reused`. This speeds up build time.

  - Initially when we create a dev build/prod build: both the folders : .parcel-cache and dist are created.

    - Since they are can be re generated so we shouldn't push them to github.

- Parcel also does `HMR = Hot Module Replacement` i.e update a part of the application in real without a full page reload.

  - HOW ?

    - parcel keeps track of everything you do in your project. It's done using `file watching algorithm` written in c++.

    - Parcel is also giving you faster builds bcz it's caching things in `.parcel-cache` folder.

    - `NOTE:` so if we delete the parcel-cache folder, then do : npx parcel index.html. It will take a longer time. But later if we make a change in App.js and save, it will create a Build in much less time.

- Parcel also does `image optimization`.

  - Loading images is a very expensive operation.

- `Bundling` = (merging separate source files and their dependencies, reduces HTTP request and improve load time, It creates larger files containing multiple original source files).

- Minification = (reduces files size leading to faster download)

- Compression.

- Code splitting.

- Consistent Hashing.

- Differential Bundling -> to support older browsers. i.e creating different bundles for different type of older browsers.

- Better Error Suggestions.

- support of HTTPs.

- `Tree Shaking`: it analyses the import and exports of each module and removes the code that isn't used.

- Parcel can `create different build for dev and prod`. prod build takes more time than dev build bcz prod build is more optimized.

  - Now how do we create a prod build ?

    - `npx parcel build index.html` // index.html is what we need to host on server.

    - `NOTE:` But here we'll encounter and error bcz

      - `In package.json : entry point is App.js and here we're mentioning it to be index.html`
      - `So, in package.json : remove the entry point set to be App.js` i.e remove main: App.js from the Object.

    - Now we can serve this prod build to the user. This is optimized and fast.

- `npx package_name` -> this will execute the package.

### NOTE:

- React can also be used as a npm package.

1. cdn links are not a good way to bring React and ReactDOM into our project.

- `WHY ?`

  - bcz via cdn, we're making a call to a server and downloading the code and then executing it.

    - But if we already have 'React' in our node_modules then it'd be easier and a better way to use it.

  - In the cdn links: it's specifically mentioned about which version of react are we using.

    - So, if later another version came, we need to change the links. Using React via npm, we can control things like auto-update for a minor or major update.

2. Why not push /node_modules, /dist, /.parcel-cache to github ?

- Suppose we push our production ready code to github and server uses the code from github.

- package.json && package-lock.json will be pushed to github.

- Now, in server we'll be doing :

  - `npm install` : this will install all the dependencies mentioned in package.json && versions in package-lock.json.

  - `npx parcel build index.html` : will create cache files and bundled files in .parcel-cache and dist respectively.

### STEP 4 -> (install react, react-dom)

- install react and react-dom

  - `npm install react`
  - `npm install react-dom`

- Now, react and react-dom code is present in node_modules

  - So how do I use them.
    - we need to `import them`

- React uses ES6+ features + module syntax
  - so to use 'React' in our script, set the `type = "module"`

### STEP 5 -> (using browserslist)(support for older browsers)

#### (make app compatible for older versions of browser)

- use `browserslist` : already present in node_modules

- we just need to configure it.

  - how to use it ?

    - go to browserslist.dev => to check how much % of browsers we cover by writing what.

    - we don't want to cover a lot of browsers bcz that increases the code that'll be bundled up. So covering around 95% browsers is fine.

    - **NOTE :** based on the github of browserslist we can explore a lot of options to make to more browser specific, country specific, etc.

```javascript
// add another key in package.json
{ ,
  ,
  ,
  "browserslist": [
    "last 2 versions"
  ]
}
```

- How does **browserslist work** ?

  - browserslist identifies which browsers are being targetted.

  - Then `tools` like (`babel for JS`), (`autoprefixer for CSS`) `identifies` which feature is not supported by target browsers and `transforms` it to make it compatible

  - eg: arrow fn to normal fn, polyfill creation for missing apis, fallback styles or alternate implementations.

  - In some cases, developers may choose to use progressive enhancement, where basic functionality is provided for all browsers with enhanced features for modern browsers.
    - use of `conditionals in code`.

- **NOTE**: All above things is what create react app does.
