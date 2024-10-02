// named import: we can also rename it using 'as'
import { useState } from "react";
import { LOGO_URL as header_logo_url } from "../utils/constants";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("Header Component");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={header_logo_url} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
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
