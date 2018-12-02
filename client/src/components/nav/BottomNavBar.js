import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class BottomNavBar extends Component {
  render() {
    return (
      <Grid fluid className="landing-container bottom-nav-container">
        <Row className="bottom-nav-row">
          <Col lg={1}>
            Privacy Policy
          </Col>
          <Col lg={1}>
            Terms Of Use
          </Col>
          <Col lg={2}>
            Dontate
          </Col>
          <Col lg={2}>
            Github
          </Col>
          <Col lg={4}>
          
          </Col>
          <Col lg={2}>
            &copy; Tokenplex LLC
          </Col>
        </Row>
      </Grid>
      )
  }
}