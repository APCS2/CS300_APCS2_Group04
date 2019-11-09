import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from 'react';
import Home from '../page/Home/index'

function Routers() {
  return (
    <Router>
        <Switch>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routers;
