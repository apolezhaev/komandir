import React from 'react';
import './App.css';
import LeftPane from './components/LeftPane';
import CenterPane from './components/CenterPane';

function App() {
  return (
    <div class="layout">     
      <LeftPane/>
      <CenterPane/>      
    </div>
  );
}

export default App;
