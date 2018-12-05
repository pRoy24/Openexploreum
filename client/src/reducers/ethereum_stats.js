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

import { FETCH_ETHEREUM_DATA, FETCH_ETHEREUM_DATA_SUCCESS, FETCH_ETHEREUM_DATA_FAILURE, GET_HOURLY_TRANSACTION_STATS,
GET_HOURLY_TRANSACTION_STATS_SUCCESS, GET_HOURLY_TRANSACTION_STATS_FAILURE, CLEAR_ETHEREUM_DATA} from '../actions/ethereum_stats';

const initialState = {
  blockData: {"top": "", "latestBlock": {}, "latestBlockTransactions": {}, "pendingBlockTransactions": {}},
  dailyTransactionStats: [],
  hourlyTransactionStats: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function etherStatsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ETHEREUM_DATA:
      return {
        ...state,

        isFetching: true
      }
    case FETCH_ETHEREUM_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        blockData: action.payload.data
      }
    case FETCH_ETHEREUM_DATA_FAILURE:
      return {
        ...state,
        blockData: initialState.blockStats,
        isFetching: false,
        error: true
      }
    case GET_HOURLY_TRANSACTION_STATS:
      return {...state}
      
    case GET_HOURLY_TRANSACTION_STATS_SUCCESS:
      return {...state, hourlyTransactionStats: action.payload.data};
      
    case GET_HOURLY_TRANSACTION_STATS_FAILURE:
      return {...state, dailyTransactionStats: action.payload.error}
    
    case CLEAR_ETHEREUM_DATA:
      return {...state, blockData: initialState.blockData, dailyTransactionStats: initialState.dailyTransactionStats,
        hourlyTransactionStats: initialState.hourlyTransactionStats
      }
      
    default:
      return state
  }
}