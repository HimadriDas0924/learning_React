// component: js fn that returns some jsx.
import { Component } from "react";
import UserClass from "./UserClass";

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="m-4 shadow-lg">
        <h1 className="text-center text-xl font-semibold py-2 ">About</h1>
        <UserClass name={"Himadri Das"} location={"Dhanbad (class)"} />
      </div>
    );
  }
}

export default About;
