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
      <div>
        <h1>About</h1>
        <h2>This is Namaste React Web series</h2>
        <UserClass name={"Himadri Das"} location={"Dhanbad (class)"} />
      </div>
    );
  }
}

export default About;
