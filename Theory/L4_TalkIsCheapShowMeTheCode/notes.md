## NOTE:

0. USECASE OF PROPS:

   - to pass variable arguments to a functional component.

   - props are NOT used to pass constant data to a component.

   - store constant data in a separate file, export it, and then import it.

1. how to represent a `<img>` tag in JSX:

   - `<img src = "image address"/>`
   - we can also store the Image URL in a variable then do:
   - `<img src = {imagURL}/>`

2. How to give `inline CSS` to `jsx`:

   - properties are given in the form of a JS object.
   - Just how css styles were added to elements in JS i.e camelCase && value in "".
   - `<div style = {{backgroundColor: "yellow", borderRadius: "2px"}}></div>`

3. what does `<Component/>` mean ?

   - Only represent that the Component will be rendered at this position.
   - During the Rendering process, when react encounters this element, it calls the function which returns a react element.

4. How **React renders**: `Array of JSX` && `Adjancet JSX`.

```javascript

    // Both Component1 and Component2 are different.
    // But they will produce the same Result.

    // bcz: When React renders an Array of Element, it flattens the array and renders each element in order.


    const Component1 = () => {
      return (
        <div>
          <ChildComponent/>
          <ChildComponent/>
          <ChildComponent/>
          <ChildComponent/>
        </div>
      )
    }

    const Component2 = () => {
      return (
        <div>
          [<ChildComponent/>, [<ChildComponent/>, <ChildComponent/>], <ChildComponent>]
        </div>
      )
    }
```

5. What is `Config Driven UI` ?

   - It is basically a practice of writting code in our app.

   - when then UI is driven by config.

   - `Definition:` Config-driven UI is an approach to building user interfaces where the structure, layout, and behaviour of the UI are defined by the configuration files or data structures, rather than hard coded in the application's source code.

   - Advantages:

   1. flexibility to modify UI without code changes.
   2. reusability of UI components.
   3. faster UI changes.
   4. useful for dashboard creation, content management system.

- `USECASE :`
  - if we get lesser no of object by the API, then we won't have to make changes in our code, bcz that many cards will be displayed.
  - eg: based on festival time, in flipkar, amazon: some discount is applied to items. So no separate code is added for this.

## STEP 1

- Building a Food Ordering Application.

- First thing to do while building an App is "PLANNING"
  1. Build a visual model of the app i.e "how it looks" i.e parent and child boxes.
  2. What all componenets in App. i.e children components of each parent.

## STEP 2 -> (reusable components, props)

1. create separate component for different things.

2. How to create Dynamic Restaurant Cards:

   - we've create a CardComponent.

   - `we can dynamically pass data to a component using props` (i.e properties).

     - A Functional Component is just a normal JS function.

     - Similary, props are just normal arguments we pass to a function.

   - `So, we pass props to a component.`

   - `NOTE:` When we pass props (i.e arguments) to a component(i.e `<Component prop1 = "val1" prop2 = "val2"/>`). All the props are bundled into a JS object and then this object is received as the parameter of the Functional Component.

   - `NOTE:` When we receive data from an API in the form of JSON(is often array of objects). Then we can also send an entire object as a prop
     - `<Component obj = {apiResponse} />`

   ```javascript
   // Data is received in a JS object by the component (i.e JS function)
   // use this JS inside a JSX using {}
   const Component2 = (props) => {

    // may need to do some object destructuring (here)
     return (
       <div>
         <h1>{props.key1}</h1>
         <h2>{props.key2}</h2>
       </div>
     );
   };

   /* values passed to a component are called props.
    Here we're passing props to the component.
    React will wrap all these properties inside an Object and pass it to the Component.
    */

   /*
    (here) we're passing the props manually.
    we can also pass the entire JSON the API has fetched us in {} bcz it's a JS object.
    eg: key = {api_response}
    */
   const Component1 = () => {
     return (
       <div>
         <Component2 key1="one" key2="two" />
       </div>
     );
   };


   const resList = [{}, {}, ..];


   const Component3 = () => {
      return (
        <div>
        <Component4 resData = {resList[0]}>
        <Component4 resData = {resList[1]}>
        <Component4 resData = {resList[2]}>
        .
        .
        </div>
      )
   }
   ```

## STEP 3 -> (optimizing the code)

1. while passing dynamic data as props to a component, `destructure` it first and then use it in your components. To avoid doing a long chain of accessing things everytime.

2. do `optional chaining` while destructuring.

3. API could be returning a lot of objects in form of array of objects. So 100s of these card components are required to be placed in their container. Which we should not do manually. Can we use something like a loop ?

- use `map` function

  ```javascript
  const ChildComponent = (props) => {
    const { name, cuisines, rating } = props?.resData; // since props contain all the props passed by the component wrapped in a object. So access the 'key' i.e resData rep the object containing all the data.
  };

  const resList = [{}, {}, {}];

  // instead of manually putting multiple childComponent, use a map function.
  // For that execute all the JS inside {}.
  // also dynamically pass props to the child component

  const ParentComponent = () => {
    return (
      <div>
        {resList.map((resObj) => (
          <ChildComponent key = {some id} resData={resObj} />
        ))}
      </div>
    );
  };

  // NOTE: The map function returns an (array of ChildComponent with props), which is rendered in the same way as multiple adjacent elments are rendered.
  ```

4. we might get a warning in console:

- `each child` in a `list` should have a unique prop `"key"`
- this "key" is a `reserved prop` which should contain a `unique value`.

- `V.V.IMP: ` So always whenever you're looping on to rendering elements, put the prop `key` in each element.

  ### Above is a Major Optimization because:

  #### example: `Infinite Scroll`, `image collection app.` Where all the data is not loaded at once.

  - Suppose you don't give id to multiple elements of the same parent and they've been rendered.

  - Suppose, `Now a new element comes in` among the childrens (at some position). Now `React don't know which element has come up later`.

  - So it will `re-render all the childrens within the container`.

  - Now, if we give each of them a unique ID, React will be able to identify that (id1,id2,id3) was already there and (id4) later came.

  - So, it will `only render the (id4)` and `not re-render the prev elements.`

  - `NOTE:` some people also keep the index of the array to be value of `key` prop, bcz that is also unique to each element.

    - `V.V.IMP : ` But react's official docs suggest to not use index for key prop. BAD Practice.

    - Using a unique key >>>>>> array index >>>>> putting no key prop value.
