// Copyright 2018 Tokenplex LLC. https://tokenplex.io. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

import { GET_ACCOUNT_DETAILS, GET_ACCOUNT_DETAILS_SUCCESS, GET_ACCOUNT_DETAILS_FAILURE,
  GET_ACCOUNT_CURRENT_TRANSACTIONS, GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS, GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE,
  CLEAR_ACCOUNT_DETAILS
} from '../actions/account_stats';

const initialState = {
  accountDetails: [],
  accountCurrentTransactions: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function accountStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNT_DETAILS:
      return {
        ...state,
        accountDetails: [],
        isFetching: true
      }
    case GET_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        accountDetails: action.payload.data
      }
    case GET_ACCOUNT_DETAILS_FAILURE:
      return {
        ...state,
        accountDetails: [],
        isFetching: false,
        error: true
      }
    case GET_ACCOUNT_CURRENT_TRANSACTIONS:
      return {...state, accountCurrentTransactions: {}}
    case GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS:
      return {...state,accountCurrentTransactions: action.payload.data}
    case GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE:
      return {...state}
    case CLEAR_ACCOUNT_DETAILS:
      return {...state, accountDetails: initialState.accountDetails, accountCurrentTransactions: initialState.accountCurrentTransactions}
    default:
      return state
  }
}