import Landing from './Landing';
import {fetchEtherumData, fetchEtherumDataSuccess, fetchEthereumDataFailure, getHourlyTransactionStats, getHourlyTransactionStatsSuccess,
  getHourlyTransactionStatsFailure, clearEthereumData, startQueryEthereumStats, stopQueryEthereumStats
} from '../../actions/ethereum_stats.js';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    etherStats: state.etherStats,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEthereumNetStats: () => {
      dispatch(fetchEtherumData()).then(function(response){
        if (response.payload.status === 200) {
          dispatch(fetchEtherumDataSuccess(response.payload.data));
        } else {
          dispatch(fetchEthereumDataFailure(response.payload.error))
        }
      });
    },
    getHourlyTransactionStats: () => {
      dispatch(getHourlyTransactionStats()).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getHourlyTransactionStatsSuccess(response.payload.data));
        } else {
          dispatch(getHourlyTransactionStatsFailure(response.payload.error));
        }
      });
    },
    clearEthereumData: () => {
      dispatch(clearEthereumData());
    },
    startQueryEthereumStats: () => {
      dispatch(startQueryEthereumStats());
    },
    stopQueryEthereumStats: () => {
      dispatch(stopQueryEthereumStats());
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);
