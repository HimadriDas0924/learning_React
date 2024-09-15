import React from "react";
import ReactDOM from "react-dom/client";
import { jsx } from "react/jsx-runtime";

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React React.createElement()"
);

const elem = <span>Elem to be put inside another React Elem</span>; // JSX -> React.createElement() -> Js obj -> so inside another JSX I can use it inside a {}

const TitleComponent = () => {
  return <h2 className="heading">Namaste React Functional Component: Title</h2>;
};

const jsxHeading = (
  <div>
    <TitleComponent />
    <h1>Namaste React Using JSX</h1>
  </div>
  // <h1 id="heading">
  //   {TitleComponent}
  //   Namaste React using JSX
  // </h1>
);

/* 
inside JSX:
- if we write {}, then inside it we can run any JS code.

- How to put a "react element" inside a component ? 
  - A react element is also a JS object 
  - so we can put it inside {} (inside a component)

- we can also put a React element inside a React Element:
  - bcz inside JSX: we can use a React Element (i.e JS obj) using {}

- Similary, we can also use a component inside a React Element i.e JSX
  - Now, for a component to be transpiled to be a series of React.createElement().
  - It has to be written as: <MyComponent/>
  
*/

/* 
NOTE: 
1.
  - if we fetch some data from some api && run it/use it using {}.
  - Even if someone sends some malicious data: JSX automatically sanitises the data and then run it/ use it inside {}.

2. 
  - <Title/> can also be written as: <Title></Title> 

3. a fn component is a fn returning JSX 
  - Another way to use a component inside another component
  - since we can directly use JSX/React Element inside a component using {} bcz they are just JS objects
  - so to use a component: we can directly call the component and use it's JSX inside {}.
*/
const no = 400;

const HeadingComponent2 = () => (
  <div id="container">
    {TitleComponent()}
    <TitleComponent />
    <TitleComponent></TitleComponent>
    <h2>{200 + no}</h2>
    {jsxHeading}
    <h1 className="heading">Heading inside Functional Component</h1>
  </div>
);

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

reactRoot.render(<HeadingComponent2 />);
// reactRoot.render(jsxHeading);
