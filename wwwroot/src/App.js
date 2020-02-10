import React from 'react';
import './App.css';
import NotFound from './components/NotFound';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';


function App() {
  return (    
    <BrowserRouter>
      <>         
        <Switch>
          <Route path="/komandir">
            <MiniDrawer/>            
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
