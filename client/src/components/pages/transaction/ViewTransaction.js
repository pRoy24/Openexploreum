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
import {isNonEmptyObject, isNonEmptyArray} from '../../../utils/ObjectUtils';
import {Link} from 'react-router-dom';

export default class ViewTransaction extends Component {
  componentWillMount() {
    const {match: {params}} = this.props;
    const transaction = params[0];
    this.props.getTransactionDetails(transaction);    
  }
  
  componentWillUnmount() {

    this.props.resetTransactionDetails();
  }
  render() {
    const {transactionStats: {transactionDetails}} = this.props;
    let transactionDetail = <i className="fa fa-spinner fa-spin loading-indicator"/>;
    if (isNonEmptyObject(transactionDetails)) {
      transactionDetail = <TransactionDetail transactionDetails={transactionDetails}/>
    }

    return (
      <Grid>
        <div className="tx-container">
          <Row>
            <div className="display-row-header">Transaction Details </div>
          </Row>
          <Row >
            <Col lg={12} xs={12} className="display-card-row top-row-card trasaction-container-card">
              {transactionDetail}
            </Col>
          </Row>
          </div>
      </Grid>
      )
  }
}

class TransactionDetail extends Component {
  render() {
    const {transactionDetails} = this.props;
    let isTxonfirmed = <span/>;
    if (transactionDetails.receipt.status) {
      isTxonfirmed = <i className="fa fa-check"/>;
    } else {
      isTxonfirmed = <i className="fa fa-times"/>;
    }
    let transactionLogs = <span/>;
    let isContractCreation = "";
    
    if (transactionDetails.receipt.contractAddress) {
      isContractCreation = `Yes ${transactionDetails.receipt.contractAddress}`
    } else {
      isContractCreation = 'No';
    }
    if (isNonEmptyArray(transactionDetails.receipt.logs)) {
      transactionLogs = transactionDetails.receipt.logs.map(function(item){
        return (
          <div>
          Data: {item.data}
          <div>
          <div className="logs-head">Topics:</div> 
          {item.topics.map(function(t){
            return <div>{t}</div>
          })}
          </div>
          </div>
          )
      })
    }
    
    return (
      <div>
        <Col lg={12}>
          <div className="display-card-block">
            <span className="display-card-label">Tx Hash: </span>
            <span className="display-card-value">
              <Link to={`/transaction/${transactionDetails.transaction.hash}`}>{transactionDetails.transaction.hash}</Link>
            </span>
          </div>    
        </Col>
        
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">From: </span>
            <span className="display-card-value">
              <Link to={`/account/${transactionDetails.transaction.from}`}>{transactionDetails.transaction.from}</Link>
            </span>
          </div>                
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">To: </span>
            <span className="display-card-value">
              <Link to={`/account/${transactionDetails.transaction.to}`}>{transactionDetails.transaction.to}</Link>
            </span>
          </div>                   
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Block: </span>
            <span className="display-card-value">{transactionDetails.transaction.blockNumber}</span>
          </div>                  
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Index: </span>
            <span className="display-card-value">{transactionDetails.receipt.transactionIndex}</span>
          </div>                  
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Confirmed: </span>
            <span className="display-card-value">{isTxonfirmed}</span>
          </div>                  
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Number of Confirmations: </span>
            <span className="display-card-value">{transactionDetails.numConfirmations}</span>
          </div>                 
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Gas Used: </span>
            <span className="display-card-value">{transactionDetails.receipt.gasUsed}</span>
          </div>                  
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Cumulative Gas Used: </span>
            <span className="display-card-value">{transactionDetails.receipt.cumulativeGasUsed}</span>
          </div>                    
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Gas Specified: </span>
            <span className="display-card-value">{transactionDetails.transaction.gas}</span>
          </div>                  
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Gas Price: </span>
            <span className="display-card-value">{transactionDetails.transaction.gasPrice}</span>
          </div>                   
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Is Contraction creation event? </span>
            <span className="display-card-value">{isContractCreation}</span>
          </div>                   
        </Col>
        <Col lg={6}>
          <div className="display-card-block">
            <span className="display-card-label">Value (Ether) </span>
            <span className="display-card-value">{transactionDetails.transaction.value}</span>
          </div>                 
        </Col>
        <Col lg={12} className="tx-logs-container">
          <div className="logs-head">Logs</div>
          {transactionLogs}
        </Col>
        </div>
      )
  }
}