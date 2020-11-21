import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import { ThemeProvider } from "@chakra-ui/core";

import Navbar from "./components/Navbar";
import "./App.css";
import Contratos from "./scenes/contract/index";
import EditContract from "./scenes/contract-edit/index";
import RegisterContract from "./scenes/register-contract/index";
import ListWinerys from "./scenes/list-winery/index";
import Winery from "./scenes/winery/index";
import EditWinery from "./scenes/winery-edit/index";
import ListOrders from "./scenes/orders/index";
import Users from "./scenes/user-list/index";
import RegisterUser from "./scenes/user-register/index";
import EditUser from "./scenes/user-edit/index";
import RegisterSystem from "./scenes/system-register/index";
import ListSystems from "./scenes/system-list/index";
import EditSystem from "./scenes/system-edit/index";
import RegisterSensor from "./scenes/sensor-register/index";
import ListSensors from "./scenes/sensor-list/index";
import Listsupport from "./scenes/support-list/index";
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
      <Route path="/support">
        <Navbar />
        <Listsupport />
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
      <Navbar />
      <Switch>
        <Route path="/contracts">
          <Contratos />
        </Route>
        <Route path="/contract-edit">
          <EditContract />
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
        <Route path="/winery-edit">
          <EditWinery />
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
