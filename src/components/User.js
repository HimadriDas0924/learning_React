import { useState } from "react";

// receiving props
const User = ({ name }) => {
  // creating state variable inside fn component
  // Behind the scenes: React stores all the state variables for a component inside a big object only.
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);

  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <h1>Count2: {count2}</h1>
      <h3>Name: {name}</h3>
      <h3>Location: Dhanbad</h3>
      <h3>Contact: @himadriDas</h3>
    </div>
  );
};

export default User;
