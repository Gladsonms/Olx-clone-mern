import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { URL } from "../../Constants/api";
import { useHistory } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginData = { email, password };

    try {
      await axios.post(`${URL}/users/login`, loginData).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.existingUser.username);

        if (res) {
          getLoggedIn();
        }
        history.push("/");
      });
      //history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>
          <Link style={{ textDecoration: "none" }} to="/signup">
            Signup
          </Link>
        </a>
      </div>
    </div>
  );
}

export default Login;
