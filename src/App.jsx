import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBarComponent from './Components/AppBar';
import TabsComponent from './Components/TabsComponent';
import BottomActionButtons from './Components/BottomActionButtons';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <AppBarComponent/>
      <TabsComponent/>
      <BottomActionButtons/>
    </div>
  );
};

export default App;
