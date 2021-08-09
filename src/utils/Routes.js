import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Genres from "../components/Genres";
import Authors from "../components/Authors";
import Books from "../components/Books";
import { useDelete } from "./useFetch";

// import loader from "./loading.svg";

function Routes({ handleRefresh, toRefresh }) {
  const [id, setId] = useState();
  const location = useLocation();
  const { data } = useDelete(location.pathname, id);

  useEffect(() => {
    setId(null);
  }, [data]);

  const handleDelete = (id) => {
    setId(id);
    handleRefresh();
  };

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/genres" />
      </Route>
      <Route path="/genres">
        <Genres handleDelete={handleDelete} />
      </Route>
      <Route path="/authors">
        <Authors handleDelete={handleDelete} />
      </Route>
      <Route path="/books">
        <Books handleDelete={handleDelete} />
      </Route>
    </Switch>
  );
}

export default Routes;
