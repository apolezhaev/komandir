import React from "react";
import ContentType from "./components/ContentType";
import ContentTypes from "./components/ContentTypes";
import NotFound from "./components/NotFound";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MiniDrawer from "./components/MiniDrawer";

function App() {
  return (
    <MiniDrawer>
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/komandir/contentTypes/:ID"
            component={ContentType}
          />
          <Route
            exact={true}
            path="/komandir/contentTypes"
            component={ContentTypes}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MiniDrawer>
  );
}

export default App;
