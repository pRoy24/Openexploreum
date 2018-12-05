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

import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class Policy extends Component {
  render() {
    return (
      <Grid>
      <div style={{"textAlign": "left", "height": "100vh"}}>
      <div className="h2">Openexploreum Privacy Policy</div>
      <p>Tokenplex LLC ("us", "we", or "our") holds the original usage rights to Openexploreum product.</p>
      <h2>Information Collection And Use</h2>
      <p>We do not collect any personal information from you. The app by design does not transmit any information to us or any third
      party.</p>
      <div>
        The app can be downloaded and connected to a local Web3 provider and used in a completely offline mode without transmitting
        any data over the public internet.
      </div>
      <h2>Privacy Focused</h2>
      <div>
        The app is privacy focused by design. This means that it can be used in conjunction with a local web3 provider without transmitting
        any data over the public internet.
      </div>
      <h2>Decentralized</h2>
      <div>
        The app can be downloaded and customized for each instance of the app and extended to create custom views. This approach is 
        different from centralized SAAS models where each view is defined by the service provider.
      </div>
      <h2>Open Source</h2>
      <div>
        The app client and backend is open-source to encourage collaboration and extensions.
      </div>
      <div>
        Additionally any usage of the app is governed under the terms of the license template defined by GPLv3.
      </div>
      <div>
        
      </div>
      </div>
      </Grid>

      )
  }
}