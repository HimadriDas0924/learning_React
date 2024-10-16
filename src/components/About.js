// component: js fn that returns some jsx.
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <h2>This is Namaste React Web series</h2>
      {/* passing props to both fn and class based components -> same way i.e all the props are wrapped inside an object and pass to Component*/}
      {/* <User name={"Himadri Das (function)"} /> */}
      <UserClass name={"Himadri Das (class)"} location={"Dhanbad (class)"} />
    </div>
  );
};

export default About;
