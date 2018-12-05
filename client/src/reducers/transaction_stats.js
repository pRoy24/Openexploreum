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

import { GET_TRANSACTION_DETAILS, GET_TRANSACTION_DETAILS_SUCCESS, GET_TRANSACTION_DETAILS_FAILURE,
  RESET_TRANSACTION_DETAILS
} from '../actions/transaction_stats';

const initialState = {
  transactionDetails: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function transactionStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_DETAILS:
      return {
        ...state,
        transactionDetails: {},
        isFetching: true
      }
    case GET_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        transactionDetails: action.payload.data
      }
    case GET_TRANSACTION_DETAILS_FAILURE:
      return {
        ...state,
        transactionDetails: {},
        isFetching: false,
        error: true
      }
    case RESET_TRANSACTION_DETAILS:
      return {...state, transactionDetails: {}}
    default:
      return state
  }
}