import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import "./App.css";
import Contratos from "./scenes/contract/index";
import RegisterContract from "./scenes/register-contract/index";
import Users from "./scenes/user-list/index";
import RegisterUser from "./scenes/user-register/index";
import EditUser from "./scenes/user-edit/index";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/contracts">
          <Contratos />
        </Route>
        <Route path="/register">
          <RegisterContract />
        </Route>
        <Route path="/user">
          <Users />
        </Route>
        <Route path="/user-register">
          <RegisterUser />
        </Route>
        <Route path="/user-edit">
          <EditUser />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
