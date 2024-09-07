// creating nested elements in Rect
/* 
<div id = "parent">
    <div id = "child">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
</div>

*/

// NOTE: to create siblings: in 3rd argument of React.createElement() : pass all the children in the form of "Array of React Elements"

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm h1 tag"),
    React.createElement("h2", {}, "I'm an h2 tag"),
  ])
);

// creating an element using React
// NOTE: element is created in React: so it's the part of React object

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World from React!"
// );

// 3 args: type, {} which contains attributes to the tag, child (i.e a React Element unless it' plain text children)

console.log(parent); // react element (= JS object)

// In react, we need to tell: what is the "root" in which we'll render all the stuffs.
// NOTE: rendering things is the job of "ReactDOM" object

const root = ReactDOM.createRoot(document.getElementById("root"));
// arg: pass the DOM element which'd serve as a container for the react application.

// root.render(heading);

// Behind the scenes: it takes the react element 'heading' && create a <h1> tag out of it that browser understand and put it inside the root element (i.e argument of ReactDOM.createRoot())

// NOTE: root.render(react Element) -> convert the react element into proper HTML && REPLACE all the HTML present in the (root HTML element) with the current HTML.
// NOTE: any element other than the root element in HTML will remain same.

root.render(parent);
