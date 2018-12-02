import React, {Component} from 'react';
import './landing.scss';
import {Grid, Row, Col} from 'react-bootstrap';
import {isNonEmptyArray, isEmptyObject} from '../../utils/ObjectUtils';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel} from 'victory';

import {Link} from 'react-router-dom';
import moment from 'moment';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.state = {"blockState": {latestBlock: {}}};
    }
    componentWillMount() {
        this.props.startQueryEthereumStats()
        this.props.getEthereumNetStats();
        this.props.getHourlyTransactionStats();    
        this.timer = setInterval(this.tick, 3000);
        const {etherStats:{blockData}} = this.props;
        if (blockData && blockData.top) {
            this.setState({blockState: blockData});
        }
    }
    
    componentWillUnmount(){
        this.props.stopQueryEthereumStats();
        clearInterval(this.timer);
        this.props.clearEthereumData();
    }
    
    tick() {
        this.props.getEthereumNetStats(); 
    }
    
    componentWillReceiveProps(nextProps) {
        const {etherStats:{blockData}} = nextProps;
        if (blockData && blockData.top !== this.props.etherStats.blockData.top) {
            this.setState({blockState: blockData});
        }
    }
    
    render() {
        const {etherStats, etherStats: {hourlyTransactionStats, blockData}} = this.props;
        const {blockState: {latestBlock, latestBlockTransactions, pendingBlockTransactions, top}, blockState} = this.state;
        let latestTxnsList = <i className="fa fa-spin fa-spinner loading-indicator"/>;
        let pendingTxnsList = <i className="fa fa-spin fa-spinner loading-indicator"/>;
        let  latestBlockStats = <i className="fa fa-spin fa-spinner loading-indicator"/>;
        if (!isEmptyObject(latestBlock)) {
            latestBlockStats = <LatestBlockStats latestBlock={latestBlock} blockData={blockData}/>
        }   

        let graphData = [];
        let etherTransactionChart = <i className="fa fa-spin fa-spinner loading-indicator"/>;;
        
        if (isNonEmptyArray(hourlyTransactionStats)) {
          graphData = hourlyTransactionStats.map(function(item){
            return {"x": item.index, "y": item.transactions}
          });
          etherTransactionChart = <EtherTransactionGraph graphData={graphData}/>
        }
        if (isNonEmptyArray(latestBlockTransactions)) {
            latestTxnsList = latestBlockTransactions.map(function(item){
            
                return ( 
                <Row className="block-cell-subrow">
                <Col lg={12}>
                    <div className="transaction-address-block">
                        <span className="address-card-label">Transaction Hash: </span>
                        <span className="address-card-value"><Link to={`/transaction/${item.hash}`}>{item.hash}</Link></span>
                    </div>   
                </Col>
                <Col lg={12}>
                <Col lg={5}>
                    <div className="transaction-address-block">
                        <span className="address-card-label">Sender: </span>
                        <span className="address-card-value"><Link to={`/account/${item.from}`}>{item.from}</Link></span>
                    </div>                
                </Col>
                <Col lg={5}>
                    <div className="transaction-address-block">
                        <span className="address-card-label">Receiver: </span>
                        <span className="address-card-value"><Link to={`/account/${item.from}`}>{item.to}</Link></span>
                    </div>
                </Col>
                <Col lg={2}>
                
                </Col>
                </Col>
                <Col lg={12}>
                    <Col lg={2}>
                        <div className="display-card-block">
                            <span className="display-card-label">Gas Limit: </span>
                            <span className="display-card-value"> {item.gas}</span>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="display-card-block">
                            <span className="display-card-label">Gas Price: </span>
                            <span className="display-card-value">{item.gasPrice}</span>
                        </div>                    
                    </Col>
                    <Col lg={3}>
                        <div className="display-card-block">
                            <span className="display-card-label">Value: </span>
                            <span className="display-card-value">{item.value}</span>
                        </div>  
                    </Col>
                </Col>
                </Row>)
            })
        }
        if (isNonEmptyArray(pendingBlockTransactions)) {
            pendingTxnsList = pendingBlockTransactions.map(function(item){
                return ( 
                <Row className="block-cell-subrow">
                <Col lg={12}>
                <Col lg={5}>
                    <div className="transaction-address-block">
                        <span className="address-card-label">Sender: </span>
                        <span className="address-card-value"><Link to={`/account/${item.from}`}>{item.from}</Link></span>
                    </div>
                </Col>
                <Col lg={5}>
                    <div className="transaction-address-block">
                        <span className="address-card-label">Receiver: </span>
                        <span className="address-card-value"><Link to={`/account/${item.from}`}>{item.to}</Link></span>
                    </div>
                </Col>
                <Col lg={2}>
                
                </Col>
                </Col>
                <Col lg={12}>
                    <Col lg={2}>
                        <div className="display-card-block">
                            <span className="display-card-label">Gas Limit: </span>
                            <span className="display-card-value"> {item.gas}</span>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="display-card-block">
                            <span className="display-card-label">Gas Price: </span>
                            <span className="display-card-value">{item.gasPrice}</span>
                        </div>  
                    </Col>
                    <Col lg={4}>
                        <div className="display-card-block">
                            <span className="display-card-label">Value: </span>
                            <span className="display-card-value">{item.value}</span>
                        </div>  
                    </Col>
                </Col>
                </Row>)
            })
        }
        return (
            <Grid>
                <Row>
                    <Col lg={8}>
                    <div className="display-row-header">Current Default Block</div>
                    </Col>

                    <Col lg={4}>
                    <div className="display-row-header">Txns/hr (24 hrs)</div>
                    </Col>
                </Row>
                <Row className="">
                    <Col lg={8} className="display-card-row top-row-card">
                        {latestBlockStats}
                    </Col>

                    <Col lg={4} className="display-card-row top-row-card">
                        {etherTransactionChart}
                    </Col>
                </Row>
                <Row>
                 <Col lg={12}>
                    <div className="display-row-header">Transactions in Current Block {top}</div>
                </Col>
                </Row>
                <Row className="display-card-row">
                    <Col lg={12} className="txn-list-container">
                        {latestTxnsList}
                    </Col>
                </Row>
                <Row>
                 <Col lg={12}>
                    <div className="display-row-header">Pending Transactions {top ? (top + 1) : ""}</div>
                </Col>
                </Row>
                <Row className="display-card-row">
                    <Col lg={12} className="txn-list-container">
                        {pendingTxnsList}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

class LatestBlockStats extends Component {
    render() {
        const {latestBlock, blockData} = this.props;
        return (
            <div>
                <Col lg={3} xs={6}>
                    <div className="display-card-block">
                        <div className="display-card-value">
                            <Link to={`/block/${latestBlock.blockNumber}`}>{latestBlock.blockNumber}</Link>
                        </div>
                        <div className="display-card-label">Block Number</div> 
                    </div>
                    <div className="display-card-block">
                         <div className="display-card-value">{latestBlock.gasUsed}</div>
                         <div className="display-card-label">Gas Used</div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="display-card-block">
                        <div className="display-card-value">{latestBlock.extraData ? latestBlock.extraData: ""}</div>
                        <div className="display-card-label">Extra Data </div>
                    </div>
                    <div className="display-card-block">
                        <div className="display-card-value">{latestBlock.numTxns}</div>
                       <div className="display-card-label"> Number of Txns</div> 
                    </div>

                </Col>
                <Col lg={3} xs={6}>
                    <div className="display-card-block">
                       <div className="display-card-value">{moment.unix(latestBlock.timestamp).format("HH:mm:ss")}</div>
                       <div className="display-card-label"> Confirmed At </div>
                    </div>
                    <div className="display-card-block">
                       <div className="display-card-value"> {latestBlock.size}</div>
                       <div className="display-card-label"> Block Size </div>
                    </div>
                </Col>
                <Col lg={3} xs={6}>
                    <div className="display-card-block">
                       <div className="display-card-value">{blockData.gasPrice}</div>
                       <div className="display-card-label"> Gas Price </div>
                    </div>
                    <div className="display-card-block">
                       <div className="display-card-value"> {latestBlock.unclesMined}</div>
                       <div className="display-card-label"> Uncles Mined </div>
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="display-card-block miner-address-block">
                        <span className="address-card-label">Miner Address: </span>
                        <span className="address-card-value">
                            <Link to={`/account/${latestBlock.miner}`}>{latestBlock.miner}</Link>
                        </span>
                    </div>
                </Col>            
            </div>
            
            )
    }
}

class EtherTransactionGraph extends Component {
    render() {
        const {graphData} = this.props;
        return (
            <VictoryChart minDomain={{ y: 10000 }} padding={{ top: 20, bottom: 60 }}
                          width={600} height={300}>
              <VictoryLine
                style={{
                  data: { stroke: "#FFFC19" },
    
            
                }}
                data={graphData}
                  labels={(datum) => datum.y}
                  labelComponent={<VictoryLabel renderInPortal dy={-20}/>}                        
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
            )
    }
}