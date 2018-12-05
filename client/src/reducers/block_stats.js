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

import { GET_BLOCK_INTRO, GET_BLOCK_INTRO_SUCCESS, GET_BLOCK_INTRO_FAILURE, GET_BLOCK_DETAILS,
  GET_BLOCK_DETAILS_SUCCESS, GET_BLOCK_DETAILS_FAILURE
} from '../actions/block_stats';

const initialState = {
  blockIntro: {},
  blockDetails: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function blockStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_BLOCK_INTRO:
      return {...state, blockIntro: {}}
    case GET_BLOCK_INTRO_SUCCESS:
      return {...state, blockIntro: action.payload.data}
    case GET_BLOCK_INTRO_FAILURE:
      return {...state, blockIntro: {}}
    case GET_BLOCK_DETAILS:
      return {
        ...state,
        blockDetails: {},
        isFetching: true
      }
    case GET_BLOCK_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        blockDetails: action.payload.data
      }
    case GET_BLOCK_DETAILS_FAILURE:
      return {
        ...state,
        blockDetails: {},
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}