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
import ListWinerys from "./scenes/list-winery/index";
import Winery from "./scenes/winery/index";
import ListOrders from "./scenes/orders/index";
import Users from "./scenes/user-list/index";
import RegisterUser from "./scenes/user-register/index";
import EditUser from "./scenes/user-edit/index";
import RegisterSystem from "./scenes/system-register/index"
import ListSystems from "./scenes/system-list/index";

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
        <Route path="/winerys">
          <ListWinerys />
        </Route>
        <Route path="/orders">
          <ListOrders/>
        </Route>
        <Route path="/winery">
          <Winery />
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
        <Route path="/system-register">
          <RegisterSystem />
        </Route>
        <Route path="/systems">
          <ListSystems />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
