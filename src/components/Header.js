// named import: we can also rename it using 'as'
import { useState, useEffect } from "react";
import { LOGO_URL as header_logo_url } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("Header Component");

  // 1) if no dependency array => useEffect is called on every render of component.
  // 2) if dependency array is empty i.e [] => useEffect is called only on initial render i.e just once
  // 3) if dependency array is [btnName] => useEffect called on initial render + called everytime 'btnName' changes.

  useEffect(() => {
    console.log("cb of useEffect called");
  }, [btnName]);

  return (
    <div className="header">
      {console.log("jsx of header")}
      <div className="logo-container">
        <img className="logo" src={header_logo_url} />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="link-comp-header">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link-comp-header">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-comp-header">
              Contact Us
            </Link>
          </li>
          <li>Cart</li>
          <button
            className="login"
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
