import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

import AuthContext from "../../Context/AuthContext";
import { URL } from "../../Constants/api";

import axios from "axios";

function Header() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  console.log("loggedin", loggedIn.status);

  const logOutUser = () => {
    console.log("___________");
    try {
      localStorage.removeItem("token");
      window.location.reload();

      // await axios.post(`${URL}/users/logout`);
      // getLoggedIn();
      // if (res.logout) {
      //   console.log(res.logout);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {!loggedIn.status && (
              <>
                <Link to="/login">Login</Link>
              </>
            )}
            {loggedIn.status && (
              <>
                <span>Account</span>
              </>
            )}
          </span>
          <hr />
        </div>

        <div>
          {loggedIn.status && (
            <span
              onClick={() => {
                logOutUser();
              }}
            >
              Logout
            </span>
          )}
        </div>

        {loggedIn.status && (
          <Link to="/create">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
