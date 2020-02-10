import React from 'react';
import './App.css';
import LeftPane from './components/LeftPane';
import CenterPane from './components/CenterPane';
import NotFound from './components/NotFound';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div class="layout">         
        <Switch>
          <Route path="/about">
            <LeftPane/>
            <CenterPane />
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
