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
            <Route path="/manga/:id/chapter/:chapterId">
              <ViewPage />
            </Route>
            <Route exact path="/manga/:id" component={SummaryPage}/>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routers;
