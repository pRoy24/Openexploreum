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
