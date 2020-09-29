import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from "@chakra-ui/core";

import './App.css';
import Contratos from './scenes/contract/index';
import RegisterContract from './scenes/register-contract/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/contratos'>
          <Contratos />
        </Route>
        <Route path='/register'>
          <RegisterContract />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
