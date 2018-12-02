import ViewTransaction from './ViewTransaction.js';

import {getTransactionDetails, getTransactionDetailsSuccess, getTransactionDetailsFailure,
        resetTransactionDetails
} from '../../../actions/transaction_stats';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    transactionStats: state.transactionStats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getTransactionDetails: (blockNumber) => {
      dispatch(getTransactionDetails(blockNumber)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getTransactionDetailsSuccess(response.payload.data));
        } else {
          dispatch(getTransactionDetailsFailure(response.payload.error))
        }
      });
    },
    resetTransactionDetails: () => {
      dispatch(resetTransactionDetails());
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewTransaction);
