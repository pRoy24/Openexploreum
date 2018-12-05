// Copyright 2018 Tokenplex LLC. https://tokenplex.io. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

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
import Policy from './components/privacy/Policy';
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
            <Route path="/privacy" component={Policy}/>
            <BottomNavBar/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
