import React, {Component} from 'react';
import {Grid, Row, Col, Navbar, Nav, Button, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {isNonEmptyString} from '../../utils/ObjectUtils';
import './navbar.scss';
import {withRouter} from 'react-router-dom';

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchVal: ""}
        this.submitUserSearchTerm = this.submitUserSearchTerm.bind(this);
        this.searchTermChanged = this.searchTermChanged.bind(this);
    }
    
    searchTermChanged(e) {
        this.setState({searchVal: e.target.value})
    }
    submitUserSearchTerm(e) {
        e.preventDefault();
        this.props.getSearchStringType(this.state.searchVal);
    }
    
    componentWillReceiveProps(nextProps) {
        const {userInputStats: {searchStringType}, history} = nextProps;
        const {searchVal} = this.state;
        if (isNonEmptyString(searchStringType) && searchStringType !== "invalid" && 
            searchStringType !== this.props.userInputStats.searchStringType) {
            history.push(`/${searchStringType}/${searchVal}`);
        }
    }
    
    render() {
        const {handleSubmit} = this.props;
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
                    <Col lg={8}>
                    <div>
                        <form name="UserSearchForm" onSubmit={this.submitUserSearchTerm}>
                          <FormControl name="userSearch"  placeHolder="Enter Wallet Address,  Contract Address, Txn #, Block or Symbol"
                            value={this.state.searchVal} onChange={this.searchTermChanged} className="seach-txn-input"/>
                            <i className="fas fa-search search-txn-icon" onClick={this.submitUserSearchTerm}/>
                        </form>
                    </div>
                    </Col>
                    </Row>
         

              </Navbar>
            </Grid>
            )
    }
}

export default withRouter(TopNavBar);