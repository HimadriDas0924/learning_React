**NOTE:**

- React recommends to name a custom hook with prefix: `use`. Although even if we don't it won't show error bcz it's not a necessity..
- Although if you're using a 'linter' it shows error if you don't follow above rule. Disabling the linter won't show any error even if custom hook doesn't have prefix 'use'.
- simiarly React recommends us to name a component using 1st letter as capital.
- These convention make other developers to easily get the things we're trying to code.

1. what is modularity in code ?

- when we break the code into small small modules i.e follow the SINGLE RESPONSIBILTY PRINCIPLE (SPA) i.e each component does only 1 work.

- then we get the advantage of :
  - reusability
  - maintainability
  - testing
    - i.e we'd be writing TCs of each component and test it. So it's easier to catch bugs.

2. creating a `custom hook` can make our `code modular` i.e maintaining SPA for a component.

   - eg: in RestaurantMenu component earlier we were doing fetching data from an API and displaying it

   - But suppose using a custom hook, the custom hook only returns us the data and we're displaying it. so using it we're just: get data + display data (&& RestaurantMenu Component won't be concerned about how to get the data -> json -> update state variable?).

   - so when using customHooks we've also removed the state variable from the RestaurantMenu.js

   - And using custom Hooks to modularize the code is a good practice. i.e doing smt(i.e fetching data) inside a function (i.e hook) and this maintains modularity.

3. Hooks are utility functions. So general convention is create them in /utils and single file for each hook.

4. Implementing ONLINE STATUS of application :

- using a custom hook which will tell us about the ONLINE status.

- 1st thing to think about while creating a hook is: determine the input and output from the custom hook.

- HOW ?
  - by attaching an event listener on event: "online", "offline".
  - and based on the event execute some cb function.

5. What does a BUNDLER do ?

- it bundles up all the files into a single file.
- eg: in the /dist folder, we can see there is a single JS file.
- in browser dev tool -> Network -> select JS -> 'we can see that there is a single JS file'.

6. what if there are 1000s of component and if we bundle everything up into a single JS file, it's size would increase by a lot && take a lot of time to download.

- **SOLUTION :**

  - create multiple chunks i.e multiple JS files.

  - So should we NOT do bundling ? -> No : we need to bundle bcz we cannot like make the browser call for 1000s of JS files.

  - So we'll make smaller multiple bundles. It's known as:

    - Chunking
    - Code Splitting
    - Dynamic Bundling
    - on demand loading
    - lazy loading

  - AND we'll define which files we want to bundle together and which files we want to not.

  - **NOTE :** eg: if our application has 2 logical sections like -

    - we've a lot of components for 'selecting, ordering restaurant food in our app'
    - && we've a lot of components for 'selecting, ordering groceries in our app'

    - Now, when I host my app on some port then bundled up JS file consist of 'all the code for both these section'.

    - Rather I want to create 2 separate bundles for both these sections.

    - **HOW TO DO :**

      - What to acheive: when I go to the 'grocery page' then only load it.

      - how to acheive: don't directly import grocery component rather import it using lazy.

      - lazy loading (i.e whatever we're going to load using lazy loading, won't be included into the main bundle, rather when needed it will be separately loaded)

      - to use lazy loading: use the function lazy() that react provides && don't import Grocery Component directly into app.js else gets included in bundles.
