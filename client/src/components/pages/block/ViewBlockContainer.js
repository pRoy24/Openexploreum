import ViewBlock from './ViewBlock';

import {getBlockDetails, getBlockDetailsSuccess, getBlockDetailsFailure, 
        getBlockIntro, getBlockIntroSuccess, getBlockIntroFailure
       } from '../../../actions/block_stats';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    blockStats: state.blockStats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlockIntro: (blockNumber) => {
      dispatch(getBlockIntro(blockNumber)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getBlockIntroSuccess(response.payload.data));
          // Fetch Block Details
          dispatch(getBlockDetails(blockNumber)).then(function(response){
            if (response.payload.status === 200) {
              console.log(response.payload.data);
              dispatch(getBlockDetailsSuccess(response.payload.data));
            } else {
              dispatch(getBlockDetailsFailure(response.payload.error))
            }
          });
        } else {
          dispatch(getBlockIntroFailure(response.payload.error));
        }
      });
    },
    getBlockDetails: (blockNumber) => {
      dispatch(getBlockDetails(blockNumber)).then(function(response){
        if (response.payload.status === 200) {
          console.log(response.payload.data);
          dispatch(getBlockDetailsSuccess(response.payload.data));
        } else {
          dispatch(getBlockDetailsFailure(response.payload.error))
        }
      });
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBlock);
