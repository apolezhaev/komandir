import React from "react";
//import MiniDrawer from './components/MiniDrawer';
import ContentType from "./components/ContentType";
import ContentTypes from "./components/ContentTypes";
import NotFound from "./components/NotFound";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <MiniDrawer/> */}
      <Switch>
        <Route path="/komandir/contentTypes/new">
          <ContentType />
        </Route>
        <Route path="/komandir/contentTypes">
          <ContentTypes />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
