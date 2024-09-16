## Things to Remember:

- `Component Composition:` using one component inside another component.

1. **INDUSTRY STANDARD:** to run script to run a command.

   - rather than using a command: (npx parcel index.html) all the time, we can create a script to run our app in dev mode.

   - in `package.json` there is a key `"scripts"`, within that we can write script in replacement of writing the entire command to do something.
     - behind the scenes the same command is only getting executed.

   ```javascript
      { ,
        ,
        ,
        "scripts" : {
          "start" : "parcel index.html",
          "smtElse" : "parcel build index.html"
        }

        // so we can name them anything: bcz behind the scenes same things is getting executed.
      }

   ```

   - How to run a npm script ?

   - `npm run ${name of the script}`

     - eg: `num run dev` OR `num run start` OR `npm run mango`

   - **NOTE**: `start` has an exception i.e instead of writing `npm run start`, we can also write : `npm start`.

   - **NOTE**: we didn't write `npx` anywhere.

2. **Why JSX ?**

   - React.createElement() -> creates a React Element which is a JS object.

   - But React.createElement() is not a good way when we're creating a lot of nested elements, bcz code get un readable.

     - Solution: `JSX`: javascript syntax to create React Element.

     - JSX is not a part of React.

- Advantages of JSX:

  1. Sanitizes the data:

  - If you call an API and it returns some malicious data. This attack is called Cross-Site-Scripting (XSS).
  - It can read cookies, local storage, session storage, device info.
  - JSX takes care of it. If some API passes malicious data, JSX escapes it, sanitizes the data before rendering.

  2. Makes core more readable.

  3. makes code simple and eligant.

  4. shows useful error and warning.

## 1. Using JSX

- JSX is not HTML. It's a HTML like syntax. It's more like mix of HTML and JS.

- `Babel` (i.e a `dependency of Parcel`) converts `JSX to React.createElement()` -> i.e a React Element -> i.e a JS object -> which is rendered as HTML element.

  ```javascript
  // heading is a React Element -> i.e a JS object -> which is rendered as an HTML element.
  const heading = React.createElement("h1", { id: "heading" }, "Namaste React");

  const jsxHeading = <h1 id="heading">Namaste React using JSX </h1>;
  // jsxHeading is bydefault not a 'react element'.

  // so bcz of 'babel' : there is no difference between React.createElement() and JSX.

  console.log(heading);
  console.log(jsxHeading);

  // BOTH are js Object.

  // rendering is the same
  const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

  reactRoot.render(jsxHeading);

  // above 2 lines: converts the (ReactElement/JS object) to an HTML element and replace all the contents of the HTML elem (id:root) with this HTML element.
  ```

- Another feature of Babel is:

  - It can `transpile` the `modern JS code into plain JS code for the older browsers` to understand.
  - That's why Bable is also a `dependency of browserslist` for making code compatible with older browsers.

- JSX: `<h1 id = "myId" className = "myClass"> hello world! </h1>`
- HTML : `<h1 id = "myId" class = "myClass"> hello world! </h1>`

- **NOTE:** if we need to give `attributes to JSX`: use `camelCase`

- **Single Line JSX** v/s **Multi Line JSX**:
  - if your JSX goes convers multiple lines, `wrap the JSX in ()`.

## 2. React Components:

- everything in React is a Component.
- 2 types of React Components:

  - **Class Based Components** - OLD way - JS classes
  - **Functional Components** - NEW way - JS functions

- React Functional Component

  - `is a normal jS fn which returns JSX/ react Element.`

  - & since JSX is also a 'React Element'. So functional components are JS fns that returns a series of React Element.

  - name it with a `Captial letter`, else you'll get error

  ```javascript
  const TitleComponent = () => <h2> Functional Component Title </h2>;

  // we can also use normal functions instead of arrow fn.
  const TitleComponent2 = function () {
    return <h1> TitleComponent2 heading </h1>;
  };

  const HeadingComponent2 = () => (
    // code(i.e JSX) of one component can be rendered inside another component.

    <div id="container">
      <TitleComponent />
      <h1 className="heading"> Functional Component Heading </h1>
    </div>
  );

  // Bable converts the above react Components into a series of React.createElement()

  /*
    const HeadingComponent2 = () => (
  
      React.createElement("div", {id: "container"}, [
        React.createElement(TitleComponent, null),
        React.createElement("h1", {className: "heading"}, "Functional Component Heading")
      ])
    )
    */

  // how do you render a functional component:
  const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

  reactRoot.render(<HeadingComponent2 />); // syntax: that Babel understands.

  // <HeadingComponent2> is translated to React.createElement(HeadingComponent2, null);
  ```

  - **NOTE:** in React.createElement() we can pass "string literal" OR "react component" as the 1st argument.

  - `<ContainerComponent/>` is translated by Babel to `React.createElement(ContainerComponent, null)`

  - How is the above code getting executed ?

    ```javascript
    // Below steps are written from GPT. May learn about them in future lectures.
    ```

    1.  When `React.createElement(Container, null) is called` : it just creates a `JS object` and the Container function is not yet called.

    2.  Now, during the `RENDERING process`, when `'Container' is encountered`, `Container() fn is called` and it returns it's own tree of React.createElement() calls.

    3.  React then process this entire tree of elements, creating a `virtual DOM structure`.

    4.  `Virtual DOM is then compared` with the previous render's virtual DOM in a process called `'reconciliation'`.

    5.  React then finally `determines the necessary changes` and commits them to the actual DOM.

## 3. More about Functional Components:

- **we can also execute/insert a JS code inside the functional components** using `{js code}`.

- we can put:

  - **React Element (i.e JSX) inside Component.**

    - using {}: bcz react element is a JS object: so it's rendered correctly

  - **React Element inside React Element.**

    - using {}: bcz react element is a JS object.

  - **Component inside Component && inside React Element.**

    - Concept used is: using a React Elem inside another React Elem.
    - use: `<Component/>` or (`{Component()}` i.e a `{React Element}`)

  - **NOTE:** if component A is used inside Component B and v.v. Then rendering either of the component will lead of INFINITE LOOP and Browser freezes.

```javascript
const no = 12;

const heading = <h1>my heading</h1>;

// using an Element inside a Component
const TitleComponent = () => <h1>Title Content</h1>;

// 3 ways to use the use a Component inside another Component
const HeadingComponent = () => (
  <div>
    <TitleComponent />
    <TitleComponent></TitleComponent>
    {TitleComponent()}

    <h2>{no * no}</h2>
  </div>
);

// using Component inside an element
const childElement = (
  <div>
    <HeadingComponent />
    <p>Child</p>
  </div>
);

// using an Element inside another Element
const parent = <div>{childElement}</div>;
```
