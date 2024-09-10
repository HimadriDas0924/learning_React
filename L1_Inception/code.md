- Below are the ways `(1,2,3)` in which React Code can be written without even `jsx`

- React will only work in places which you'll make the root as.

1. printing hello world!

```javascript
// creating an element using React
// NOTE: element is created in React: so it's the part of React object

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello World from React!"
);
// 3 args: type, {} which contains attributes to the tag, child (i.e a React Element unless it' plain text children)

console.log(heading); // react element (= JS object)

// In react, we need to tell: what is the "root" in which we'll render all the stuffs.
// NOTE: rendering things is the job of "ReactDOM" object

const root = ReactDOM.createRoot(document.getElementById("root"));
// arg: pass the DOM element which'd serve as a container for the react application.

root.render(heading);
// Behind the scenes: it takes the react element 'heading' && create a <h1> tag out of it that browser understand and put it inside the root element (i.e argument of ReactDOM.createRoot())
```

2. Creating Nested Children:

```javascript
/*

<div id = "parent">
    <div id = "child">
        <h1>I'm h1 tag</h1>
    </div>
</div>

*/

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "I'm h1 tag")
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
```

3. Creating Siblings:

   - 3rd argument of React.createElement() : pass all the children in the form of `Array of React Element`

```javascript
const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm h1 tag"),
    React.createElement("h2", {}, "I'm an h2 tag"),
  ])
);
```

- But for more complex Structure: code'll become messy and unreadable
  - Solution: `JSX`
