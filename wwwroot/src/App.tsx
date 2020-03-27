import React from "react";
import Content from "./components/Content";
import ContentType from "./components/ContentType";
import ContentTypes from "./components/ContentTypes";
import NotFound from "./components/NotFound";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
//import MiniDrawer from "./components/MiniDrawer";

function App() {
  return (
    <>
      <Routes>
        <Switch>
          <Route
            exact={true}
            path="/komandir/contentTypes/:contentTypeID"
            component={ContentType}
          />
          <Route
            exact={true}
            path="/komandir/contentTypes"
            component={ContentTypes}
          />
          <Route
            exact={false}
            path="/komandir/content/:contentTypeID?/:contentID?"
            component={Content}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Routes>
    </>
  );
}

export default App;
