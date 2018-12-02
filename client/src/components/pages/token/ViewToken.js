import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {isEmptyObject, isNonEmptyArray, isNonEmptyObject} from '../../../utils/ObjectUtils';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory';
import {Link} from 'react-router-dom';
import '../pages.scss';
import moment from 'moment';

export default class ViewToken extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }
  
  tick() {
    const {match: {params}, tokenStats :{tokenDetails}} = this.props;
    const token = params[0];
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
    console.log(tokenDetails);
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

      contractTxnList = tokenDetails.payload.sort(function(a, b){
        return b.block.number - a.block.number;
      }).map(function(item, idx){
        let itemStatus = <span/>;
        if (item.receipt.status) {
          itemStatus = <i className="fa fa-check"/>
        } else {
          itemStatus = <i className="fa fa-times"/>
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
                    <span className="address-card-labe">Block: </span>
                    <span className="address-card-value">
                      <Link to={`/block/${item.block.number}`}>{item.block.number}</Link>
                    </span>
                  </Col>
                  <Col lg={2}>
                    <span className="address-card-labe">Status: </span>
                    <span className="address-card-value">{itemStatus}</span>
                  </Col>
                  
                </Col>
                <Col lg={12} className="block-cell-subcol">
                <Col lg={5}>
                    <div>
                      <span className="address-card-label">Sender: </span>
                      <span className="address-card-value">
                        <Link to={`/account/${item.transaction.from}`}>
                          {item.transaction.from}
                        </Link>
                      </span>
                    </div>
                </Col>
                <Col lg={5}>
                    <div>
                    <span className="address-card-label">Receiver: </span>
                    <span className="address-card-value">
                        <Link to={`/account/${item.transaction.to}`}>
                          {item.transaction.to}
                        </Link>
                    </span>
                    </div>
                </Col>
                <Col lg={2}>
                
                </Col>
                </Col>
                <Col lg={12} className="block-cell-subcol">
                    <Col lg={2}>
                    <span className="address-card-label">Value: </span>
                    <span className="address-card-value">{item.transaction.value}</span>
                    </Col>
                    <Col lg={3}>
                      <span className="address-card-label">Gas Specified: </span>
                      <span className="address-card-value">{item.transaction.gas}</span>
                    </Col>
                    <Col lg={3}>
                      <span className="address-card-label">Timestap: </span>
                      <span className="address-card-value">{moment.unix(item.block.timestamp).format("hh:mm:ss a MM/DD/YY")}</span>
                    </Col>
                </Col>
            </Row>
          )
      })
      
    }
    return (
      <Grid>
          <Row>
            <Col lg={5} xs={12}><div className="display-row-header">Token Details</div></Col>
            <Col lg={3} xs={3}><div className="display-row-header">Stats (24h)</div></Col>
            <Col lg={4} xs={8}><div className="display-row-header">Transactions (24h)</div></Col>
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
              <div className="display-card-value">
                <Link to={`/contract/${tokenIntro.contract}`}>{tokenIntro.contract}</Link>
              </div>
            </div>
        </Col>
   
      </div>
      )
  }
}