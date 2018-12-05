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
import {isEmptyObject, isNonEmptyArray, isNonEmptyObject} from '../../../utils/ObjectUtils';
import '../pages.scss';
import moment from 'moment';
import {Link} from 'react-router-dom';

export default class ViewBlock extends Component {
  componentWillMount() {
    const {match: {params}} = this.props;
    const block = params[0];
    this.props.getBlockIntro(block);
   // this.props.getDailyTransactionStats();
   // this.props.getBlockInfo(block);
  }
  render() {
    const {blockStats: {blockIntro, blockDetails}} = this.props;
    let blockInfo = <i className="fa fa-spinner fa-spin loading-indicator"/>;
    if (isNonEmptyObject(blockIntro)) {
      blockInfo = (
        <BlockInfo blockIntro={blockIntro}/>
        )
    }
    let blockTxnList = 
    <Col lg={12}>
      <i className="fa fa-spinner fa-spin loading-indicator"/>
    </Col>
    ;
    if (isNonEmptyArray(blockDetails.transactionDetails)) {
      blockTxnList = blockDetails.transactionDetails.map(function(item, idx){
        let txStatus = <span/>;
        if (item.receipt && item.receipt.status) {
          txStatus = <i className="fa fa-check"/>;
        } else {
          txStatus = <i className="fa fa-times"/>;
        }
        return (
              <Row className="block-cell-subrow">
                <Col lg={12} className="block-cell-subcol">
                  <Col lg={7}>
                    <span className="address-card-label">Tx Hash: </span> 
                    <span className="address-card-value">
                      <Link to={`/transaction/${item.transaction.hash}`}>{item.transaction.hash}</Link>
                    </span>
                  </Col>
                  <Col lg={3}>
                    <span className="address-card-label">Value (Ether): </span>
                    <span className="display-card-value">{item.transaction.value}</span>
                  </Col>
                  <Col lg={2}>
                    <span className="address-card-label">Status: </span>
                    <span className="address-card-value">{txStatus}</span>
                  </Col>
                  
                </Col>
                <Col lg={12} className="block-cell-subcol">
                <Col lg={5}>
                  <div className="display-card-block">
                    <span className="address-card-label">Sender: </span>
                    <span className="address-card-value">
                      <Link to={`/account/${item.transaction.from}`}>{item.transaction.from}</Link>
                    </span>
                  </div>  
                </Col>
                <Col lg={5}>
                  <div className="display-card-block">
                    <span className="address-card-label">Receiver: </span>
                    <span className="address-card-value">
                      <Link to={`/account/${item.transaction.to}`}>{item.transaction.to}</Link>
                    </span>
                  </div> 
                </Col>
                <Col lg={2}>
                
                </Col>
                </Col>
                <Col lg={12} className="block-cell-subcol">
                    <Col lg={2}>
                      <span className="display-card-label">Gas Limit: </span>
                      <span className="address-card-value">{item.transaction.gas}</span>
                    </Col>
                    <Col lg={3}>
                      <span className="display-card-label">Gas Price: </span>
                      <span className="address-card-value">{item.transaction.gasPrice}</span>
                    </Col>
                    <Col lg={3}>
                      <span className="display-card-label">Gas Used: </span>
                      <span className="address-card-value">{item.receipt? item.receipt.gasUsed : ""}</span>
                    </Col>
                    <Col lg={3}>
                      <span className="display-card-label">Cumulative Gas Used: </span>
                      <span className="address-card-value">{item.receipt ? item.receipt.cumulativeGasUsed : ""}</span>
                    </Col>
                </Col>
                </Row>
                )
      })
    }
    return (
      <Grid>
          <Row>
            <div className="display-row-header">Block Number {blockIntro.blockNumber}</div>
          </Row>
          <Row className="display-card-row top-row-card block-page-top-card">
            {blockInfo}
          </Row>
          <Row>
            <div className="display-row-header">Transactions Included ({blockIntro.numTxns})</div>
          </Row>
          <Row className="display-card-row">
              <Col lg={12} className="txn-list-container block-page-txn-list-container">
                {blockTxnList}
              </Col>
          </Row>
      </Grid>
      )
  }
}

class BlockInfo extends Component {
  render() {
    const {blockIntro} = this.props;
    return (
      <div>
        <Col lg={6} xs={12}>
          <div className="display-card-block">
            <span className="display-card-label">Gas Used </span><span className="display-card-value">{blockIntro.gasUsed}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Gas Limit </span><span className="display-card-value"> {blockIntro.gasLimit}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Confirmed At </span><span className="display-card-value"> 
            {moment.unix(blockIntro.timestamp).format("hh:mm:ss a MM/DD/YY")}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Number of Txns </span><span className="display-card-value"> {blockIntro.numTxns}</span>
          </div>
          <div className="display-card-block">
            <div className="display-card-label">Miner Address </div><div className="display-card-value">
              <Link to={`/account/${blockIntro.miner}`}>{blockIntro.miner}</Link>
            </div>
          </div>          
        </Col>
        <Col lg={6} xs={12}>
          <div className="display-card-block">
            <span className="display-card-label">Block Nonce </span><span className="display-card-value">{blockIntro.nonce}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Miner Details </span><span className="display-card-value">{blockIntro.extraData}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Uncles Mined </span><span className="display-card-value">{blockIntro.unclesMined}</span>
          </div>
          <div className="display-card-block">
            <span className="display-card-label">Block Size </span><span className="display-card-value">{blockIntro.size}</span>
          </div>
          <div className="display-card-block">
            <div className="display-card-label">Parent Hash </div>
            <div className="display-card-value">
              {blockIntro.parentHash}
            </div>
          </div>
        </Col>
      </div>
      
      )
  }
}