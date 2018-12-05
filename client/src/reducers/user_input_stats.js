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

import { GET_USER_INPUT_STATS, GET_USER_INPUT_STATS_SUCCESS, GET_USER_INPUT_STATS_FAILURE, GET_SEARCH_STRING_TYPE,
         GET_SEARCH_STRING_TYPE_SUCCESS, GET_SEARCH_STRING_TYPE_FAILURE} from '../actions/user_input_stats';

const initialState = {
  searchStringType: "",
  userInputData: {"top": "", "latestBlock": {}, "latestBlockTransactions": {}, "pendingBlockTransactions": {}},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function userInputStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USER_INPUT_STATS:
      return {
        ...state,
        isFetching: true
      }
    case GET_USER_INPUT_STATS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        userInputData: action.payload.data
      }
    case GET_USER_INPUT_STATS_FAILURE:
      return {
        ...state,
        userInputData: initialState.blockStats,
        isFetching: false,
        error: true
      }
    case GET_SEARCH_STRING_TYPE:
      return {...state, searchStringType: ""}
    case GET_SEARCH_STRING_TYPE_SUCCESS:
      return {...state, searchStringType: action.payload.data}
    default:
      return state
  }
}