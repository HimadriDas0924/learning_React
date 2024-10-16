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

## 4.
