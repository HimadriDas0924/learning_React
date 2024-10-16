/* 
- Loading a Class Based Component in the webpage: means that we're creating a instance of the class.

- Whenever an instance of the class is created, it's constructor is called: 
    - And constructor is the best place to receive props.
    - And constructor is the best place to create state variables.

    - Earlier, there were NO HOOKS: so there was a different way to create stateVariables. i.e using this.state : {stateVariable: value}
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
            // NEVER UPDATE STATE VARIABLES DIRECTLY i.e this.state.count = this.state.count + 1;

            // bcz this could create inconsistency && it will update the variable BUT won't automatically re-render the component on update.

            // React provides a funtion i.e this.setState() to update the state variables. we can access this.setState() anywhere in the Class Component.

            // this.setState() takes an object, key: stateVarName : value to update it with

            // we can also batch, updation of multiple stateVariables together && in this.state = {}, only those stateVariables are getting updated which we're updating using this.setState().
            // writing multiple this.setState(obj) to update the stateVariable is a bad practice, rather we can batch multiple updated together.
            this.setState({
              count: this.state.count + 1, // when the state variable updates, react will re-render the component -> virtual DOM comparison -> only update a specific portion of the UI.
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
