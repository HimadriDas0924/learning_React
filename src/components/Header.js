// named import: we can also rename it using 'as'
import { useState, useEffect } from "react";
import { LOGO_URL as header_logo_url } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = ({ toggleTheme, curTheme }) => {
  const [btnName, setBtnName] = useState("Login");
  // console.log("Header Component");

  // 1) if no dependency array => useEffect is called on every render of component.
  // 2) if dependency array is empty i.e [] => useEffect is called only on initial render i.e just once
  // 3) if dependency array is [btnName] => useEffect called on initial render + called everytime 'btnName' changes.

  // useEffect(() => {
  //   console.log("cb of useEffect called");
  // }, [btnName]);

  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex mx-2 justify-between bg-pink-100 shadow-lg dark:bg-gray-800 dark:text-white ">
      <div className="logo-container">
        <img className="w-24 " src={header_logo_url} />
      </div>
      <div>
        <ul className="flex m-4 p-4 justify-between items-center">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <button
            className="px-4 border border-slate-700 border-solid rounded-md bg-slate-100 dark: text-black"
            onClick={toggleTheme}
          >
            {curTheme === "dark" ? "light ☀️" : "dark ⚫"}
          </button>
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
          <li className="px-4 hover:underline">Cart</li>
          <button
            className="px-4 hover:underline"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header; // global export
