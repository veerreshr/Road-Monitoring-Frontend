import React from 'react';
import './App.css';
import AppBarComponent from './Components/AppBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ParameterTest from './Components/ParameterTest';
const App = () => {

  return (
    <Router>
      <AppBarComponent/>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/test" component={HomeScreen} exact />
      <Route path="/ptest" component={ParameterTest} exact/>
    </Router>
  );
};

export default App;
