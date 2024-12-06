// named import: we can also rename it using 'as'
import { useContext, useState } from "react";
import { LOGO_URL as header_logo_url } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  // 1) if no dependency array => useEffect is called on every render of component.
  // 2) if dependency array is empty i.e [] => useEffect is called only on initial render i.e just once
  // 3) if dependency array is [btnName] => useEffect called on initial render + called everytime 'btnName' changes.

  const { loggedInUser, prevUser } = useContext(UserContext);
  // console.log(loggedInUser);

  const onlineStatus = useOnlineStatus();

  // subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items); // useSelector takes a cb function => where we need to mention the data from the store which we need to fetch.
  console.log(cartItems);

  return (
    <div className="flex justify-between bg-pink-100 m-2 shadow-lg ">
      <div className="logo-container">
        <img className="w-24 mix-blend-multiply" src={header_logo_url} />
      </div>
      <div>
        <ul className="flex m-4 p-4 justify-between items-center">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4 hover:underline">
            <Link to="/" className="link-comp-header">
              Home
            </Link>
          </li>
          <li className="px-4 hover:underline">
            <Link to="/about" className="link-comp-header">
              About Us
            </Link>
          </li>
          <li className="px-4 hover:underline">
            <Link to="/contact" className="link-comp-header">
              Contact Us
            </Link>
          </li>
          <li className="px-4 hover:underline">
            <Link to="/grocery" className="link-comp-header">
              Grocery
            </Link>
          </li>
          <li className="px-4 hover:underline font-semibold ">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="px-4 border border-solid border-black bg-gray-100 rounded-md"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4  font-semibold">
            {/* 2 options to access data from context */}

            <Link>{loggedInUser}</Link>

            {/* UserContext.Provider -> to update the context */}
            {/* UserContext.Consumer -> to display the context values */}
            {/* <Link>
              <UserContext.Provider value={{ loggedInUser: "user header" }}>
                <UserContext.Consumer>
                  {({ loggedInUser }) => {
                    return (
                      <div className="text-blue-500 font-semibold">
                        {loggedInUser}
                      </div>
                    );
                  }}
                </UserContext.Consumer>
              </UserContext.Provider>
            </Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header; // global export
