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

import { FETCH_TOKEN_DETAILS, FETCH_TOKEN_DETAILS_FAILURE, FETCH_TOKEN_DETAILS_SUCCESS, FETCH_TOKEN_INTRO,
         FETCH_TOKEN_INTRO_SUCCESS, FETCH_TOKEN_INTRO_FAILURE} from '../actions/token_stats';

const initialState = {
  tokenDetails: {},
  tokenIntro: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function etherStatsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TOKEN_DETAILS:
      return {
        ...state,
        tokenDetails: {},
        isFetching: true
      }
    case FETCH_TOKEN_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        tokenDetails: action.payload.data
      }
    case FETCH_TOKEN_DETAILS_FAILURE:
      return {
        ...state,
        tokenDetails: {},
        isFetching: false,
        error: true
      }
    case FETCH_TOKEN_INTRO:
      return {...state, tokenIntro: {}}
    case FETCH_TOKEN_INTRO_SUCCESS:
      return {...state, tokenIntro: action.payload.data}
    case FETCH_TOKEN_INTRO_FAILURE:
      return {...state, tokenIntro: {}}
    default:
      return state
  }
}