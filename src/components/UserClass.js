import React from "react";
import UserContext from "../utils/UserContext";

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

    // console.log(json);
  }

  // render method returns JSX
  render() {
    const { name, location, twitter_username, avatar_url } =
      this?.state?.userInfo;

    return (
      <div className="user-card flex justify-between">
        <div className="user-text-info m-4 text-xl font-medium">
          <h3 className="py-2">
            <span className="font-semibold">Name: </span>
            {name}
          </h3>
          <h3 className="py-2">
            <span className="font-semibold">Location:</span> {location}
          </h3>
          <h3 className="py-2">
            <span className="font-semibold">twitter:</span> {twitter_username}
          </h3>
          <div>
            {/* Consuming the nested ancestor provider */}

            {/* Method 1 : */}

            {/* <UserContext.Consumer
              children={({ loggedInUser }) => (
                <div className="text-green-600 font-semibold">
                  {loggedInUser}
                </div>
              )}
            /> */}

            {/* Method 2 : useContext(contextName) returns the context object from the nearest Provder and then we use it's data in a Component */}

            {/* Method 3 : */}
            <UserContext.Consumer>
              {({ loggedInUser }) => (
                <div className="text-red-500 font-semibold">{loggedInUser}</div>
              )}
            </UserContext.Consumer>
          </div>
        </div>
        <div className="user-avatar w-[250px] m-4">
          <img src={avatar_url} />
        </div>
      </div>
    );
  }
}

export default UserClass;
