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
import SearchPage from '../page/SearchPage/index'
import NotFound from '../page/PageNotFound/index'

const regexp = "?"
console.log(`/search${regexp}query=:text`)

function Routers() {
  return (
    <Router>
        <Switch>
            <Route exact path="/manga/:alias/chapter/:index" component={ViewPage}/>
            <Route exact path="/manga/:alias" component={SummaryPage}/>
            <Route exact path="/" component={Home}/>
            <Route path={{pathname: "/search", search: "query=:text"}} component={SearchPage} />
            <Route component={NotFound}/>
        </Switch>
    </Router>
  );
}

export default Routers;
