import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import englishLocaleData from 'react-intl/locale-data/en';
import LandingContainer from './components/landing/LandingContainer.js';
import TopNavBarContainer from './components/nav/TopNavBarContainer.js';
import BottomNavBar from './components/nav/BottomNavBar';

import ViewTokenContainer from './components/pages/token/ViewTokenContainer';
import ViewBlockContainer from './components/pages/block/ViewBlockContainer';
import ViewAccountContainer from './components/pages/account/ViewAccountContainer';
import ViewTransactionContainer from './components/pages/transaction/ViewTransactionContainer';
import ViewContractContainer from './components/pages/contract/ViewContractContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
            <TopNavBarContainer/>
            <Route exact path="/" component={LandingContainer}/>
            <Route  path="/token/*" component={ViewTokenContainer}/>
            <Route  path="/block/*" component={ViewBlockContainer}/>
            <Route  path="/account/*" component={ViewAccountContainer}/>
            <Route  path="/transaction/*" component={ViewTransactionContainer}/>
            <Route path="/contract/*" component={ViewContractContainer}/>
            <BottomNavBar/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
