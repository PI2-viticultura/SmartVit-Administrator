import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import { ThemeProvider } from "@chakra-ui/core";

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
import Login from "./scenes/login/index";
import Logout from "./scenes/logout/index";

const DefaultContainer = () => {
  return (
    <div>
      <Route path="/contracts">
        <Navbar />
        <Contratos />
      </Route>
      <Route path="/register">
        <Navbar />
        <RegisterContract />
      </Route>
      <Route path="/winerys">
        <Navbar />
        <ListWinerys />
      </Route>
      <Route path="/orders">
        <Navbar />
        <ListOrders />
      </Route>
      <Route path="/winery">
        <Navbar />
        <Winery />
      </Route>
      <Route path="/user">
        <Navbar />
        <Users />
      </Route>
      <Route path="/user-register">
        <Navbar />
        <RegisterUser />
      </Route>
      <Route path="/user-edit">
        <Navbar />
        <EditUser />
      </Route>
      <Route path="/system-register">
        <Navbar />
        <RegisterSystem />
      </Route>
      <Route path="/systems">
        <Navbar />
        <ListSystems />
      </Route>
      <Route path="/system-edit">
        <Navbar />
        <EditSystem />
      </Route>
      <Route path="/sensor">
        <Navbar />
        <ListSensors />
      </Route>
      <Route path="/sensor-register">
        <Navbar />
        <RegisterSensor />
      </Route>
      <Route path="/sensor-edit">
        <Navbar />
        <EditSensor />
      </Route>
      <Route path="/logout" component={Logout} />
    </div>
  );
};

const LoginContainer = () => {
  return (
    <div className="container">
      <Route path="/" component={Login} />
      {/* <Route path="/login" component={Login} /> */}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="App">
          { isAuthenticated() ? (
            <Route component={DefaultContainer} />
          ) : (
            <Route component={LoginContainer} />
          )}
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
