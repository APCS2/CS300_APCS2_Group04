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
            <Route path="/manga/:id">
              <SummaryPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routers;
