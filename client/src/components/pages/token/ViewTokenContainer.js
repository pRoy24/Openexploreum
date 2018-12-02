import ViewToken from './ViewToken';
import {fetchTokenDetails, fetchTokenDetailsSuccess, fetchTokenDetailsFailure, fetchTokenIntro,
  fetchTokenIntroSuccess, fetchTokenIntroFailure, queryTokenDailyTransactions,  stopQueryTokenDailyTransactions,
} from '../../../actions/token_stats';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    tokenStats: state.tokenStats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getTokenIntro: (token) => {
      dispatch(fetchTokenIntro(token)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(fetchTokenIntroSuccess(response.payload.data));
        } else {
          dispatch(fetchTokenIntroFailure(response.payload.error))
        }
      });
    },
    
    getTokenDetails: (token) => {
      dispatch(fetchTokenDetails(token)).then(function(tokenDetailResponse){
        if (tokenDetailResponse.payload.status === 200) {
          dispatch(fetchTokenDetailsSuccess(tokenDetailResponse.payload.data));
        } else {
          dispatch(fetchTokenDetailsFailure(tokenDetailResponse.payload.error))
        }
      });
    },
    queryTokenDailyTransactions: (token) => {
      dispatch(queryTokenDailyTransactions(token));
    },
    stopQueryTokenDailyTransactions: (token) => {
      dispatch(stopQueryTokenDailyTransactions(token));
    }
    
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewToken);
