// Copyright 2018 Tokenplex LLC. proy24

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
import {Link} from 'react-router-dom';

export default class BottomNavBar extends Component {
  render() {
    return (
      <Grid fluid className="landing-container bottom-nav-container">
        <Row className="bottom-nav-row">
          <Col lg={2} className="bottom-nav-left">
            <span>
              <Link to="/privacy">Privacy Policy</Link>
            </span>

          </Col>
          <Col lg={6}>
            Dontate 0x5BBD077cbb260Dd08743CdD7056244c8Ad1C8a66 
          </Col>
          <Col lg={2}>
            <a href="https://github.com/tokenplex/Openexploreum">Github</a>
          </Col>

          <Col lg={2}>
            &copy; Tokenplex LLC
          </Col>
        </Row>
      </Grid>
      )
  }
}