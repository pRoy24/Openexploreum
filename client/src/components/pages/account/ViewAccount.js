import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {isNonEmptyArray, isNonEmptyObject, isEmptyArray} from '../../../utils/ObjectUtils';
import {Link} from 'react-router-dom';

export default class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {"transactionView": "latest"}
  }
  componentWillMount() {
    const {match: {params}} = this.props;
    const account = params[0];

    this.props.getAccountDetails(account);
    this.props.getAccountCurrentTransactions(account);
    /**
     * Account transactions are not indexed on web3 and requires deep queries on ~6000 blocks 
     * hence current implementation not suitable for a single thread server
     */
    //this.props.queryAccountDayTransactions(account);
    //this.props.getAccountDayTransactions(account);
  }
  
  componentWillReceiveProps(nextProps) {
    const {match: {params}} = nextProps;
    const account = params[0];
    if (account !== this.props.match.params[0] && account !== null) {
      this.props.getAccountDetails(account);
      this.props.getAccountCurrentTransactions(account);
    }
  }
  
  componentWillUnmount() {
    this.props.clearAccountDetails();
  }
  
  render() {
    const {accountStats: {accountDetails, accountCurrentTransactions}} = this.props;

    let accountBalances = <i className="fa fa-spinner fa-spin loading-indicator"/>;
    if (isNonEmptyArray(accountDetails)) {
      accountBalances = accountDetails.filter(function(item){
        return item.balance && Number(item.balance) > 0
      }).map(function(balanceItem){
        return <Col lg={4} className="display-card-block">
        <div>
          <span className="display-card-label">
            Name:&nbsp; 
          </span>
          <span className="display-card-value">
            <Link to={`/token/${balanceItem.token.symbol}`}>{balanceItem.token.name}</Link>
          </span></div>
        <div>
          <span className="display-card-label">
          Symbol:&nbsp;  </span>
          <span className="display-card-value">
          <Link to={`/token/${balanceItem.token.symbol}`}>{balanceItem.token.symbol}</Link></span></div>
        <div>
          <span className="display-card-label">Amount:&nbsp;  </span>
          <span className="display-card-value">{balanceItem.balance}</span>
        </div>
        </Col>
      })
    }
    let currentTransactionView = <i className="fa fa-spinner fa-spin loading-indicator"/>;
    if (this.state.transactionView === "latest" && isNonEmptyObject(accountCurrentTransactions)) {
      currentTransactionView = <LatestTransactionView accountCurrentTransactions={accountCurrentTransactions}/>
    } else {
      
    }
    return (
      <Grid>
          <Row>
            <div className="display-row-header">Account Balances</div>
          </Row>
          <Row className="display-card-row top-row-card block-page-top-card">
            {accountBalances}
          </Row>
          <Row>
            <div className="display-row-header">Transactions</div>
          </Row>
          <Row className="display-card-row top-row-card block-page-bottom-card">
            {currentTransactionView}
          </Row>
      </Grid>
      )
  }
}

class LatestTransactionView extends Component {
  render() {
    const {accountCurrentTransactions: {latest, pending}, accountCurrentTransactions} = this.props;
    let pendingTxList = <span/>;
    let latestTxList = <span/>;

    if (isEmptyArray(latest)){
      latestTxList = <div className="empty-block-label">No transactions for account in current block.</div>
    } else {
      latestTxList = latest.map(function(item){
        return <AccountTransaction item={item}/>
      })
    }
    if (isEmptyArray(pending)) {
      pendingTxList = <div className="empty-block-label">No pending transactions for account.</div>
    } else {
      pendingTxList = pending.map(function(item){
        return <AccountTransaction item={item}/>
      })      
    }
    return (
      <div>
        <div className="account-transaction-block">
        <div className="account-transactions-subhead">Pending Transactions</div>
        {pendingTxList}
        </div>
        <div className="account-transaction-block">
        <div className="account-transactions-subhead">Latest Confirmed Transactions</div>
        {latestTxList}
        </div>
      </div>
      )
  }
}

class AccountTransaction extends Component {
  render() {
    const {item} = this.props;
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
                    <span className="address-card-label">Value: </span>
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
  }
}