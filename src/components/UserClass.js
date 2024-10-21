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
