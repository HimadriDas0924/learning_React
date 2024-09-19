## Good Practices:

1. make separate files for separate components.

2. All the main `React code` i.e JS CODE is kept in a `src` folder.

3. src/Components -> within this keep all the components

   - Recommended: to give file name same as Component name.

   - `NOTE:` some people also write the extension of the file as '.jsx' (bcz Component returns JSX) instead of '.js' (bcz it's JS code). It's does matter what you give the extension as bcz JSX is JS only.

   - It's NOT mandatory to create a file structure, we can also keep everything within the same file.

   - But it's recommended to do so: for code readability, code maintainance, easier debugging.

   - We can Structure our app in any way we want to.
   - you can create folders for : api/ , components/, etc.
   - OR folders for routes: profile/, feed/ , etc.

4. Also it's recommended to avoid too much nesting in the file structure.

5. while doing import: we can even skip writing the extension : JS will treat the imported file as jS only.

6. Never keep a Hard Coded Data in a Components file (eg: resList, some fixed URL).

   - Keep them in another folder: `utils` or `config` or `constant` or `common` => to store common utilities.

7. while using useState(); if you name the stateful value it returns as 'x', then name the function it returns as 'setx'

## NOTE:

- Advantage of React over JS:

  - React is efficient in updating the DOM.

0. How to attach an eventListener on Something:

   ```javascript
   <button
     onClick={() => {
       // do something
     }}
   ></button>
   ```

1. After placing Components to separate files, what if `Components depend on each other`.

   - Then `import` required components and objects to the required Component file.

   - Make sure that `each Component file has everything the function is using`.

   - Advantages:

     - Clearer dependency tree: each file explicitly states it's own dependency.
     - easier maintainance
     - better performance : helps in code-splitting && lazy-loading.
     - improve testability

2. `import` : Behind the scenes

   - import `DOES NOT copy` the exported code to the main file, rather it `references the exported files`.

   - Bundling: during build process, bundler like Parcel: combines separate files into 1/more bundles.

3. How to give `inline styles to JSX` ?

   - styles are given in the form of a JS object.
   - And to use JS inside JSX, use {}.

   ```javascript
   const jsx = (
     <div style={{ backgroundColor: "#f0f0f0", color: "white" }}>
       <div>Content</div>
     </div>
   );
   ```

4. 2 types of import and export:

   1. default export, default import

      - from `each file`, `only 1 default export` is possible.

      - we can import this default export with any variableName bcz of the advantage of being able to do 1 default export per file.

      - **USE**: write `export default varName` at the end of the file.

   2. named export, named import

      - generally used when we want to `export multiple things` from a file.

      - **USE**: `export const varName = {}`

   - **NOTE :** we can `export the same varible twice` once as global export and once as named export. This won't create any error, as long as we import them using different variable name.

   ```javascript
   // both ways of named export
   // we can also rename it while exporting
   export const varA = 1;
   const varB = 2;
   const varC = 3;

   export { varB as variableB, varC };
   ```

   ```javascript
   // named import
   // also we can rename things.

   import { variableB, varC as variableC } from "location";
   ```

5. What is a `HOOK` ?

   - Hook is a `normal JS function` written in React.

   - 2 important hooks:

     1. `useState()`;

        - it returns a (state variable) and (a function to update the state variable).

        - Both of them should be accepted in an array.

        - we pass the `default value of the state variable` in the `useState()` function as `argument`.

          - default value: is the data that the component is using to display things in the UI.

        - The state variable cannot be updated without the function.

        - When we call the function, we pass `(updated value of the state variable)` into the `function` as `arguments`. The function then updates the state variable.

        - **NOTE:** As soon as the `state variable is UPDATED`, the `component is RE-RENDERED`.

          - Since the component uses the state variable to display things in UI. so updated state variable leads to updated UI.

     2. `useEffect()`;

6. **USECASE of useState ?**

   - Suppose a Component uses some data.

   - Using that data you're rendering something on the UI.

   - Now, based on some events you're changing the data.

   - Based on the changed data, you want UI to update.

   ```javascript
   // resData contains the data that we're using to display all the cards in the UI.
   // when we click on some button, we want to filter some objects from resData.
   // and display those cards from the filtered objects only.

   import { resData } from "smt";

   const Component = () => {
     const [listOfRestaurants, setListOfRestaurants] = useState(resData); // resData is default value of listOfRestaurants

     /* on click we want to update the data i.e listOfRestaurants */
     /*
        update listOfRestaurants using the function
   
        as soon we update it, listOfRestaurants is updated and <Component/> is re-rendered.
   
        since listOfRestaurants is updated. so in res-card-container the cards are displayed according to updated listOfRestaurants.
    */
     return (
       <div>
         <button
           onClick={() => {
             const filteredList = listOfRestaurants.filter(
               (res) => res.rating > 4
             );

             setListOfRestaurants(filteredList);
           }}
         >
           CLICK HERE
         </button>

         <div className="res-card-container">
           {listOfRestaurants.map((res) => {
             return <RestaurantCard key={res.id} resObj={res} />;
           })}
         </div>
       </div>
     );
   };
   ```
