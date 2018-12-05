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

import ViewAccount from './ViewAccount';

import {getAccountDetails, getAccountDetailsSuccess, getAccountDetailsFailure, getAccountCurrentTransactions, getAccountCurrentTransactionsSuccess,
getAccountCurrentTransactionsFailure, getAccountDayTransactions, getAccountDayTransactionsSuccess, getAccountDayTransactionsFailure,
queryAccountDayTransactions, clearAccountDetails
} from '../../../actions/account_stats';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    accountStats: state.accountStats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountDetails: (accountNumber) => {
      dispatch(getAccountDetails(accountNumber)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getAccountDetailsSuccess(response.payload.data));
        } else {
          dispatch(getAccountDetailsFailure(response.payload.error))
        }
      });
    },
    getAccountCurrentTransactions: (accountNumber) => {
      dispatch(getAccountCurrentTransactions(accountNumber)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getAccountCurrentTransactionsSuccess(response.payload.data));
        } else {
          dispatch(getAccountCurrentTransactionsFailure(response.payload.error));
        }
      })  
    },
    getAccountDayTransactions: (accountNumber) => {
      dispatch(getAccountDayTransactions(accountNumber)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getAccountDayTransactionsSuccess(response.payload.data));
        } else {
          dispatch(getAccountDayTransactionsFailure(response.payload.error));
        }
      })
    },
    queryAccountDayTransactions: (accountNumber) => {
      dispatch(queryAccountDayTransactions(accountNumber));
    },
    clearAccountDetails: () => {
      dispatch(clearAccountDetails());
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAccount);
