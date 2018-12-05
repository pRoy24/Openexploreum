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
import {Grid, Row, Col, Navbar, Nav, Button, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {isNonEmptyString, isNonEmptyObject, isEmptyObject} from '../../utils/ObjectUtils';
import './navbar.scss';
import {withRouter} from 'react-router-dom';
import {Modal, FormGroup} from 'react-bootstrap';

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchVal: "", setupConfig: false};
        this.submitUserSearchTerm = this.submitUserSearchTerm.bind(this);
        this.searchTermChanged = this.searchTermChanged.bind(this);
        this.hideSetupConfig = this.hideSetupConfig.bind(this);
        this.showConfigDialog = this.showConfigDialog.bind(this);
    }
    
    componentWillMount() {
        this.props.getConfiguration();
    }
    
    showConfigDialog() {
        this.setState({setupConfig: true});
    }
    
    searchTermChanged(e) {
        this.setState({searchVal: e.target.value})
    }
    
    hideSetupConfig() {
        this.setState({setupConfig: false});      
    }
    
    submitUserSearchTerm(e) {
        e.preventDefault();
        this.props.getSearchStringType(this.state.searchVal);
    }
    
    componentWillReceiveProps(nextProps) {
        const {userInputStats: {searchStringType}, history, configuration, configuration: {configData}} = nextProps;
        const {searchVal} = this.state;
        if (isNonEmptyString(searchStringType) && searchStringType !== "invalid" && 
            searchStringType !== this.props.userInputStats.searchStringType) {
            history.push(`/${searchStringType}/${searchVal}`);
        }
        if (isNonEmptyObject(configuration.configData) && isEmptyObject(this.props.configuration.configData)) {
            if (configData.configCreated === "false") {
                this.setState({setupConfig: true});
            }
        }        
    }
    
    render() {
        const {handleSubmit, submitProviderValue, configuration: {configData}} = this.props;
        let currentConfig = <span/>;

        if (configData.provider) {
            currentConfig = <div className="config-container">
                <div className="current-config-text" onClick={this.showConfigDialog}>
                    <div>Current Provider: </div>
                    <div className="config-text-value">{configData.provider}</div>
                </div>
                </div>
        }
        let configModal = <span/>;
        if (configData.provider) {
            configModal =  <ConfigModal setupConfig={this.state.setupConfig} submitProviderValue={submitProviderValue}
              hideSetupConfig={this.hideSetupConfig} provider={configData.provider}/>;
        }
        return (
            <Grid fluid className="landing-container">
              <Navbar className="tp-top-nav" collapseOnSelect>
                  <Row>
                  <Col lg={3}>
                    <Navbar.Header>
                        <Navbar.Brand className="top-img-header">
                            <img src={"logo.png"} className="logo-img-container"/>
                            <Link to="/" className="label-container">OpenExploreum</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    </Col>
                    <Col lg={7}>
                    <div>
                        <form name="UserSearchForm" onSubmit={this.submitUserSearchTerm}>
                          <FormControl name="userSearch"  placeHolder="Enter Wallet Address,  Contract Address, Txn #, Block or Symbol"
                            value={this.state.searchVal} onChange={this.searchTermChanged} className="seach-txn-input"/>
                            <i className="fas fa-search search-txn-icon" onClick={this.submitUserSearchTerm}/>
                        </form>
                    </div>
                    </Col>
                    <Col lg={2}>
                      {currentConfig}
                    </Col>
                    </Row>
              </Navbar>
              {configModal}

            </Grid>
            )
    }
}

class ConfigModal extends Component {
    constructor(props) {
        super(props);
        this.changeProviderValue = this.changeProviderValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.state = {"providerValue": this.props.provider};
    }
    
    changeProviderValue(e) {
        this.setState({"providerValue": e.target.value});
    }
    
    hideForm() {
       this.props.hideSetupConfig();        
    }
    
    submitForm() { 
       const {providerValue} = this.state;
       this.props.submitProviderValue(providerValue);
       this.props.hideSetupConfig();
    }
    
    
    render() {
        const {setupConfig} = this.props;
        return (
            <Modal show={this.props.setupConfig}>
                <Modal.Header>
                  <Modal.Title>Choose your provider</Modal.Title>
                  <div>Enter localhost IP or private IP if using local ethereum node.</div>
                </Modal.Header>
                <Modal.Body>
                  <FormGroup>
                    <FormControl type="text" value={this.state.providerValue} onChange={this.changeProviderValue}/>
                  </FormGroup>
                  <FormGroup>
                    <FormControl readOnly type="text" value={"Num CPUs: 2"}/>
                  </FormGroup>    
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.hideForm}>Close</Button>
                  <Button bsStyle="primary" onClick={this.submitForm}>Submit</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

export default withRouter(TopNavBar);