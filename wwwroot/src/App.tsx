import React from "react";
import ContentType from "./components/ContentType";
import ContentTypes from "./components/ContentTypes";
import NotFound from "./components/NotFound";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
//import MiniDrawer from "./components/MiniDrawer";

const topMenu = [
  { link: "/komandir/contentTypes", text: "Content Types" },
  { link: "/komandir/content", text: "Content" }
];

const styles = {
  topMenu: {
    color: "red",
    padding: "15px"
  },
  topMenuItem: {
    padding: "15px"
  }
};

function App() {
  return (
    <>
      <div style={styles.topMenu}>
        {topMenu.map((m, i) => (
          <a key={`menu${i}`} style={styles.topMenuItem} href={m.link}>
            {m.text}
          </a>
        ))}
      </div>
      <Routes>
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
      </Routes>
    </>
  );
}

export default App;
