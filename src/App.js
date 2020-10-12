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
        <Route path="/winery">
          <Winery />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
