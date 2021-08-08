import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Genres from "../components/Genres";
import Authors from "../components/Authors";
import Books from "../components/Books";
import useFetch from "./useFetch";

import loader from "./loading.svg";

function Routes(props) {
  const location = useLocation();
  const { data, isPending } = useFetch(
    `http://localhost:8000${location.pathname}`
  );

  // useEffect(() => {
  //   console.log("*", location.pathname);
  //   props.setPathname(location.pathname);
  // }, [location]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/genres" />
        </Route>
        <Route path="/genres">
          {isPending && <img src={loader} alt="Loading..." />}
          {!isPending && (
            <Genres
              genres={location.pathname === "/genres" && data ? data : []}
            />
          )}
        </Route>
        <Route path="/authors">
          <Authors
            authors={location.pathname === "/authors" && data ? data : []}
          />
        </Route>
        <Route path="/books">
          <Books books={location.pathname === "/books" && data ? data : []} />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
