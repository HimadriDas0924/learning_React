NOTE:

```javascript
// for using React.Component : we can import React
import React from "react";

// OR we can directly destructure here only.
import { Component } from "react";
```

## 0. What is output of console.log(useState("hi")) ?

- 2 sized array is returned.
- 0th value: 'hey'.
- 1th value: function named: `bound dispatchSetState`.
- There are also other information in the function like: Fiber Node, Queue, Action to take to update the state variable.

## 1. Class Based Component INTRO:

- fn component: normal JS function that returns a piece of JSX.

- class component: normal JS class which has render method: that returns a piece of JSX and that'll be converted to HTML and rendered into the UI.

- extends React.Component : lets react know that this is a Component.

- React.Component is present in the package 'react'.

- How does the Class-Based Component receive props ?
- ans: constructor fn receives the props and we need to to pass the props to the parent using: super(props)

## 2. Passing Props to Class Based Component:

1. In the constructor fn of the class-based component, why should super(props) be explicitely called ?

- 1st: In case of Inheritance, there is a RULE that inside the constructor of the child class, firstly you should invoke the parent class constructor. This is done so that the properties,methods of the parent are first inherited to the child object(bcz the child object may work on them).

- without calling parent class's constructor, we cannot use 'this' inside the constructor.

- 2nd: If we don't pass the props to the React.Component i.e parent class via super(props), this.props is not initialized by the parent, so we cannot use this.props inside the child.

NOTE: 'props' is a property of the React.Component Class, which it initializes inside it's constructor: this.props = props we pass to parent via super.

## 3. Creating State Variables and Updating them:

```javascript
/* 
- Loading a Class Based Component in the webpage: means that we're creating a instance of the class.

- Whenever an instance of the class is created, it's constructor is called: 
    - And constructor is the best place to receive props.
    - And constructor is the best place to create state variables.

    - Earlier, there were NO HOOKS: so there was a different way to create stateVariables. i.e using this.state : {stateVariable: value}

-  NEVER UPDATE STATE VARIABLES DIRECTLY i.e this.state.count = this.state.count + 1;

- bcz this could create inconsistency && it will update the variable BUT won't automatically re-render the component on update.

- React provides a funtion i.e this.setState() to update the state variables. we can access this.setState() anywhere in the Class Component.

- this.setState() takes an object, key: stateVarName : value to update it with

- NOTE: we can also batch, updation of multiple stateVariables together to be done in SINGLE RENDER && in this.state = {}, only those stateVariables are getting updated which we're updating using this.setState().

- writing multiple this.setState(obj) to update the stateVariable is a bad practice, rather we can batch multiple updated together.

- NOTE:  when the state variable updates, react will re-render the component -> virtual DOM comparison -> only update a specific portion of the UI.
*/

import React from "react";

class UserClass extends React.Component {
  // constructor receives the props
  constructor(props) {
    super(props);

    // this.state: is a big object that contains all the state variables.
    // creating a state variable count
    this.state = {
      count: 0,
      count2: 2,
    };
  }

  // render method returns JSX
  render() {
    const { name, location } = this.props;
    const { count, count2 } = this.state;

    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        <h1>Count2: {count2}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h3>Name: {name}</h3>
        <h3>Location: {location}</h3>
        <h3>Contact: @himadriDas</h3>
      </div>
    );
  }
}

export default UserClass;
```

## 4. Life Cycle of Class based component:

1. if inside a component we're using a Class-based Component, then the code of the component is executed line by line and once the Class-Based-Component is encountered, an instance of the class-based-component is created. 1st constructor is called. 2nd render method is called AND once the class Component is mounted onto the DOM i.e its in the DOM then `componentDidMount()` is called.

2. **order of calling of lifecycle methods :**

   - parent constructor
   - parent render
   - (if another component is used in the render method of parent then:
     - child constructor
     - child render)
   - DOM is updated in a single batch(i.e REACT RECONCILIATION: 1st entire virtual DOM is created, diff algo, real DOM is updated in a single batch)
   - child component's componentDidMount()
   - parent component's componentDidMount()

   - ORDER OF COMPONENTDIDMOUNT() ?

   - **NOTE :** internally react maintains a queue: `whichever component's render() method is COMPLETELY executed 1st`, that component's `componentDidMount()` is called 1st after the DOM update.

```javascript
import React from "react";

class UserClass extends React.Component {
  // constructor receives the props
  constructor(props) {
    super(props);

    // this.state: is a big object that contains all the state variables.
    this.state = {
      userInfo: {
        name: "dummy name",
        location: "dummy location",
        twitter_username: "dummy username",
        avatar_url: "",
      },
    };
  }

  async componentDidMount() {
    // api call
    /* NOTE: we can make componentDidMount() as an async function. && then we can use 'await' inside it. It does return a promise, but React doesn't depend on componentDidMount's return value for it's life cycle so it doesn't matter. */
    const data = await fetch("https://api.github.com/users/HimadriDas09");
    const json = await data.json();

    // update a state variable with api data, which will re-render the component.
    this.setState({
      userInfo: json,
    });

    console.log(json);
  }

  // render method returns JSX
  render() {
    const { name, location, twitter_username, avatar_url } =
      this?.state?.userInfo;

    return (
      <div className="user-card">
        <div className="user-text-info">
          <h3>Name: {name}</h3>
          <h3>Location: {location}</h3>
          <h3>twitter: {twitter_username}</h3>
        </div>
        <div className="user-avatar">
          <img src={avatar_url} />
        </div>
      </div>
    );
  }
}

export default UserClass;
```

## 5. Update and Unmounting lifecycle:

- when we update our state variable, then UPDATING phase is scheduled for the component.

- `In the UPDATING phase:`

  - step 1: render().
  - step 2: DOM is updated (i.e virtual DOM creation, diff algorithm, changes made to real DOM).
  - step 3: componentDidUpdate() (i.e called after the DOM updates)

- `NOTE`: `THIS DOES NOT HAPPEN :` if in a same heirarchy: multiple state changes happen: then multiple UPDATING phase will happen in isolation.

  - Suppose, if we've update the states of parent only. then it's sure that UPDATING phase will happen for Parent.

  - BUT, using the` component tree React 1st finds out what components will the affected by the UPDATING phase of the parent. And UPDATES them all in a single render.`

  - i.e child, grand child : depend on parent. So UPDATING PHASE of parent, child, grand child will happen.

  - `render()` happens in `top to bottom.` bcz parent depends on the JSX of the child.

  - `componentDidUpdate()` sequence: `bottom to top` bcz 1st the entire lifecyle of the child should be executed and then of it's parent.

  CODE:

  ```javascript
  // execution order after updating: state of parent,grandchild

  /*
  Parent, GrandChild => UPDATING => supposed to happen. But Child may get affected by parent's UPDATING. So Child will also go through UPDATING phase.
  
  Does it mean GrandChild will be UPDATED twice ? => NO
  
  ORDER:
  
  parent's render
  chlid's render
  grandChild's render
  
  <DOM updated>
  
  grandChild's componentDidUpdate()
  Child's componentDidUpdate()
  Parent's componentDidUpdate()
  
  */
  class Parent extends React.Component {
    render() {
      return (
        <div>
          <Child />
        </div>
      );
    }
  }
  class Child extends React.Component {
    render() {
      return (
        <div>
          <GrandChild />
        </div>
      );
    }
  }
  class GrandChild extends React.Component {
    render() {
      return (
        <div>
          <h2>smt</h2>
        </div>
      );
    }
  }
  ```

- `Unmounting` phase happens just before the component is removed from the DOM

  - lifecycle methods: `componentWillUnmount()`

  - It is used to pefrom clean ups

    - **USECASE :** Suppose we initiated something but after changing the page OR removing the Component from the DOM, that thing should've stopped. But it didn't. So in case this `UNEXPECTED` behaviour doesn't happen we use terminate those initiated process in componentWillUnmount() which executes just before the component is un mounted from the DOM.

    - `eg:` event listeners, timers, intervals, subscriptions, AJAX calls.

    - `Expected Sequence:` grand children -> child -> parent.

## 6. Class Based vs Functional Component:

### 1. functional component doesn't follow lifecycle of class based components.

### 2. useEffect() !=== componentDidMount().

- although both are used to make API calls (bcz of the better approach to make API call i.e make them after the DOM is loaded and the refresh the DOM).

- But useEffect() DOESN'T use componentDidMount() behind the scenes.

- useEffect(cb) : executes cb after every re-render of the Component and DOM update.

- componentDidMount(// code): is executed after initial mounting of component onto the DOM.

### 3. How to achieve this functionality of cb execution after every re-render in class based ?

- since, after in every re-render i.e UDPATE : `componentDidUpdate()` is called. So we can write the code over there.

### 4. how to achieve: useEffect(cb, [var1, var2, ...]); in class based ?

- i.e how to check if state has changed or not ?
- we can access the `(prevProps as 0th arg, prevState as 1th arg)` in class based components.

```javascript
class Parent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 1,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      ...
    } else {
      ...
    }

    if (this.state.count2 !== prevState.count2) {
      ...
    } else {
      ...
    }
  }
}
```

### 5. How to achieve conditional check of state from above class based in useEffect() ?

```javascript
useEffect(cb1);

useEffect(cb2);
```

### 6. Can we use useEffect() for cleanup as we were doing via componentWillUnmount() ?

- yes, In the cb function of useEffect we can return a function which can be used for cleanup.

- React, expects the the `callback function` of useEffect() either `returns` nothing i.e undefined or a cleanup function `(which is called when DOM updates OR dependencies changes).`

```javascript

// returned fn is called: when component is UN MOUNTED and we need to do cleanup OR when the dependencies changes.

useEffect(() => {
  const id = setInterval(cb, 1000);

  return () => {
    clearInterval(id);
  }
}, [dep1, dep2, ...])

```

### 7. callback of useEffect() cannot be async fn :

- bcz React expects the cb to return either nothing / a clean up function.

- BUT, async fn always retun a promise. even if we return a fn, it'll be wrapped in a promise and then returned.

- React cannot handle the promise returned bcz it expects a fn/ undefined.
