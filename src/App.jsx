import React from 'react';
import './App.css';
import AppBarComponent from './Components/AppBar'
import { BrowserRouter as Router,HashRouter, Route } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ParameterTest from './Components/ParameterTest';
import TestResult from './Components/TestResult';
import DeviceData from './Components/DeviceData';
import UploadScreen from './Screens/UploadScreen';
import { StoreProvider } from 'easy-peasy';
import store from './store';
const App = () => {

  return (
    <StoreProvider store={store}>
    <Router>
      <AppBarComponent/>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/upload" component={UploadScreen} exact />
      <Route path="/ptest" component={ParameterTest} exact/>
      <Route path="/presult" component={TestResult} exact/>
      <Route path="/devicedata" component={DeviceData} exact/>

    </Router>
    </StoreProvider>
  );
};

export default App;
