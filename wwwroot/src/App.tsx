import React from "react";
//import MiniDrawer from './components/MiniDrawer';
import ContentType from "./components/ContentType";
import ContentTypes from "./components/ContentTypes";
import NotFound from "./components/NotFound";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      {/* <MiniDrawer/> */}
      <Switch>
        <Route path="/komandir/contentTypes/:ID" component={ContentType} />
        <Route path="/komandir/contentTypes" component={ContentTypes} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
