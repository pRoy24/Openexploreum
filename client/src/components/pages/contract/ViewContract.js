import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {isEmptyObject, isNonEmptyArray, isNonEmptyObject} from '../../../utils/ObjectUtils';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory';

import '../pages.scss';

export default class ViewContract extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }
  
  tick() {
    const {match: {params}, tokenStats :{tokenDetails}} = this.props;
    const token = params[0];
    console.log(params);
    if (isEmptyObject(tokenDetails)) {
      this.props.getTokenDetails(token);
    }
  }
    
  componentWillMount() {
    const {match: {params}} = this.props;
    const token = params[0];
    this.props.getTokenIntro(token);
    this.props.queryTokenDailyTransactions(token);
    this.props.getTokenDetails(token);
    this.timer = setInterval(this.tick, 5000);
  }
  componentWillUnmount() {
    const {match: {params}} = this.props;
    const token = params[0];
    clearInterval(this.timer);
    this.props.stopQueryTokenDailyTransactions(token);
  }
  
  componentWillReceiveProps(nextProps) {
    const {match: {params}, tokenStats :{tokenIntro, tokenDetails}} = nextProps;
    const nextToken = params[0];

    if (isNonEmptyObject(tokenDetails)) {
      clearInterval(this.timer);
      this.timer = 0;
    }
    if (nextToken !== this.props.match.params[0]) {
      this.props.getTokenIntro(nextToken);
      this.props.queryTokenDailyTransactions(nextToken);
      this.props.getTokenDetails(nextToken);
      console.log(this.timer);
      console.log(this.tick);
      if (this.timer === 0) {
        this.timer = setInterval(this.tick, 5000);
      }
    }
  }
  
  
  
  render() {
    const {tokenStats :{tokenIntro, tokenDetails}} = this.props;
    let tokenIntroBlock = <span/>;
    let tokenHistoryData= [];
    if (tokenDetails && tokenDetails.txPerHour && isNonEmptyArray(tokenDetails.txPerHour.transactions)) {
          tokenHistoryData = tokenDetails.txPerHour.transactions.map(function(item){
            return {"x": item.date, "y": item.transactions}
        })
    }
    if (isNonEmptyObject(tokenIntro)) {
      tokenIntroBlock = <TokenIntro tokenIntro={tokenIntro} tokenDetails={tokenDetails}/>
    }
    let contractTxnList = <span/>;

    let detailsBlock = <span/>;
    if (isNonEmptyObject(tokenDetails)) {
      detailsBlock = (
        <div>
                <Col lg={6} xs={6}>
            <div className="display-card-block">
               <div className="display-card-value">{tokenDetails.totalTransactions}</div>
               <div className="display-card-label">Num Txns (24h):  </div>
            </div>
            <div className="display-card-block">
               <div className="display-card-value">{tokenDetails.verifiedTransactions}</div>
               <div className="display-card-label">Confirmed Txns (24h):</div>
            </div>
        </Col>
        <Col lg={6} xs={6}>
            <div className="display-card-block">
               <div className="display-card-value">{tokenDetails.totalGasUsed}</div>
               <div className="display-card-label">Gas Used (24h): </div>
            </div>
            <div className="display-card-block">
               <div className="display-card-value">{tokenDetails.totalLogs}</div>
               <div className="display-card-label">Logs Generated (24h):</div>
            </div>
        </Col>   
        </div>
        )
    }
    
    if (isNonEmptyObject(tokenDetails)) {

      contractTxnList = tokenDetails.payload.map(function(item, idx){
        return (
            <Row className="block-cell-subrow">
                <Col lg={12} className="block-cell-subcol">
                  <Col lg={6}>
                  Tx #{item.transaction.hash}</Col>
                  <Col lg={3}>Block {item.block.number}</Col>
                  <Col lg={3}>
                    Status {item.receipt.status}
                  </Col>
                  
                </Col>
                <Col lg={12} className="block-cell-subcol">
                <Col lg={5}>
                    <div> Sender: {item.transaction.from}</div>
                </Col>
                <Col lg={5}>
                    <div>Receiver: {item.transaction.to}</div>
                </Col>
                <Col lg={2}>
                
                </Col>
                </Col>
                <Col lg={12} className="block-cell-subcol">
                    <Col lg={2}>Value: {item.transaction.value}</Col>
                    <Col lg={3}>Gas Specified: {item.transaction.gas}</Col>
                    <Col lg={3}>Timestap: {item.timestamp}</Col>
                </Col>
                </Row>
          
          )
      })
      
    }
    return (
      <Grid>
          <Row>
            <div className="display-row-header">Token Details</div>
          </Row>
          <Row >
              <Col lg={5} xs={12} className="display-card-row top-row-card">
                {tokenIntroBlock}             
              </Col>
              <Col lg={3} className="display-card-row top-row-card">
                {detailsBlock} 
              </Col>

              
              <Col lg={4} className="display-card-row top-row-card">
                  <VictoryChart minDomain={{ y: 1000 }} padding={{ top: 20, bottom: 60 }}
                                  width={600} height={300}>
                      <VictoryLine
                        style={{
                          data: { stroke: "#FFFC19" },

                    
                        }}
                        data={tokenHistoryData}
                      />
                      <VictoryAxis
                      label="Time (hr)"
 
                        style={{
                            axis: {stroke: "#FFFC19"},
                          }}
                    />
                    <VictoryAxis dependentAxis
                            style={{
                            axis: {stroke: " #FFFC19"}
                          }}/>
                    </VictoryChart>
              </Col>
          </Row>
          <Row>
            <div className="display-row-header">Transaction History (24h)</div>
          </Row>
          <Row className="display-card-row">
            <Col lg={12} className="txn-list-container block-page-txn-list-container">
              {contractTxnList}
            </Col>
          </Row>
      </Grid>
      )
  }
}

class TokenIntro extends Component {
  render() {
    const {tokenIntro, tokenDetails} = this.props;

    return (
      <div>
        <Col lg={8} xs={8}>
            <div className="display-card-block">
               <div className="display-card-value">{tokenIntro.name}</div>
               <div className="display-card-label">Name</div>                  
            </div>

        </Col>
        <Col lg={4} xs={4}>
            <div className="display-card-block">
               <div className="display-card-value">{tokenIntro.symbol}</div>
               <div className="display-card-label">Symbol</div>                  
            </div>

        </Col>
        <Col lg={12}>
            <div className="display-card-block">
               <div className="display-card-label">Total Supply: </div>            
               <div className="display-card-value">{tokenIntro.totalSupply}</div>
            </div>
        </Col>
        <Col lg={12}>
            <div className="display-card-block">
               <div className="display-card-label">Contract Address: </div>
               <div className="display-card-value">{tokenIntro.contract}</div>
            </div>
        </Col>
   
      </div>
      )
  }
}