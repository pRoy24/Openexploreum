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
