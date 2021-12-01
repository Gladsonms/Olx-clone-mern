import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../Constants/api";
import { useHistory } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginData = { email, password };

    try {
      await axios.post(`${URL}/users/login`, loginData).then((res) => {
        localStorage.setItem("toke", res.data.token);
        history.push("/");
      });
      //history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
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
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
