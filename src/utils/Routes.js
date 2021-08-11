import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Genres from "../components/Genres";
import Authors from "../components/Authors";
import Books from "../components/Books";
import NotFound from "../components/NotFound";

// import loader from "./loading.svg";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/genres" />
      </Route>
      <Route path="/genres" component={Genres}></Route>
      <Route path="/authors" component={Authors}></Route>
      <Route path="/books" component={Books}></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
