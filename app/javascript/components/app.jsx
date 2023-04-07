import React from "react";

import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
 } from "react-router-dom";

import PlacesList from "./places_list";

 export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/places">
            <PlacesList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}