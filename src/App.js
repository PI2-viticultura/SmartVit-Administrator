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
import RegisterSystem from "./scenes/system-register/index";
import ListSystems from "./scenes/system-list/index";
import EditSystem from "./scenes/system-edit/index";
import RegisterSensor from "./scenes/sensor-register/index";
import ListSensors from "./scenes/sensor-list/index";
import EditSensor from "./scenes/sensor-edit/index";

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
        <Route path="/system-edit">
          <EditSystem />
        </Route>
        <Route path="/sensor">
          <ListSensors />
        </Route>
        <Route path="/sensor-register">
          <RegisterSensor />
        </Route>
        <Route path="/sensor-edit">
          <EditSensor />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
