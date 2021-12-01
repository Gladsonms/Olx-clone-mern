import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import AuthContext from "./Context/AuthContext";

function App() {
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("loggedin-----------");
    console.log(loggedIn);
  }, [loggedIn]);

  return (
    <div>
      <Router>
        <AuthContextProvider>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">{loggedIn == true ? <Home /> : <Login />}</Route>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
