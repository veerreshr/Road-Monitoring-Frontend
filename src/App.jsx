import React from 'react';
import './App.css';
import AppBarComponent from './Components/AppBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ParameterTest from './Components/ParameterTest';
import TestResult from './Components/TestResult';
const App = () => {

  return (
    <Router>
      <AppBarComponent/>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/upload" component={HomeScreen} exact />
      <Route path="/ptest" component={ParameterTest} exact/>
      <Route path="/presult" component={TestResult} exact/>
    </Router>
  );
};

export default App;
