import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from 'react';
import Home from '../page/Home/index'
import ViewPage from '../page/ViewPage/index'
import SummaryPage from '../page/Summary/index'

function Routers() {
  return (
    <Router>
        <Switch>
            <Route exact path="/manga/:alias/chapter/:index" component={ViewPage}/>
            <Route exact path="/manga/:alias" component={SummaryPage}/>
            <Route exact path="/" component={Home}/>
        </Switch>
    </Router>
  );
}

export default Routers;
