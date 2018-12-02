import TopNavBar from './TopNavBar';

import {getUserInputStats, getUserInputStatsSuccess, getUserInputStatsFailure, getSearchStringType, 
  getSearchStringTypeSuccess, getSearchStringTypeFailure
} from '../../actions/user_input_stats.js';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    etherStats: state.etherStats,
    userInputStats: state.userInputStats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchStringType: (searchString) => {
      dispatch(getSearchStringType(searchString)).then(function(res){
        if (res.payload.status === 200) {
          dispatch(getSearchStringTypeSuccess(res.payload.data));
        } else {
          dispatch(getSearchStringTypeFailure(res.payload.error));
        }
      })
    },
    getUsetInputStats: (searchString) => {
       dispatch(getUserInputStats(searchString)).then(function(res){
         if (res.payload.status === 200) {
           dispatch(getUserInputStatsSuccess(res.payload.data));
         } else {
           dispatch(getUserInputStatsFailure(res.payload.error));
         }
       })
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavBar);