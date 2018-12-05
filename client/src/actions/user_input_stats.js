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

import axios from 'axios';

export const GET_USER_INPUT_STATS = 'GET_USER_INPUT_STATS';
export const GET_USER_INPUT_STATS_SUCCESS = 'GET_USER_INPUT_STATS_SUCCESS';
export const GET_USER_INPUT_STATS_FAILURE = 'GET_USER_INPUT_STATS_FAILURE';

export const GET_SEARCH_STRING_TYPE = 'GET_SEARCH_STRING_TYPE';
export const GET_SEARCH_STRING_TYPE_SUCCESS = 'GET_SEARCH_STRING_TYPE_SUCCESS';
export const GET_SEARCH_STRING_TYPE_FAILURE = 'GET_SEARCH_STRING_TYPE_FAILURE';



export function getUserInputStats(searchString) {
  const request = axios.get(`/api/user_input_stats?search=${searchString}`);
  return {
    type: GET_USER_INPUT_STATS,
    payload: request
  }
}

export function getUserInputStatsSuccess(response) {
  return {
    type: GET_USER_INPUT_STATS_SUCCESS,
    payload: response
  }
}

export function getUserInputStatsFailure(err) {
  return {
    type: GET_USER_INPUT_STATS_FAILURE,
    payload: err
  }
}

export function getSearchStringType(searchString) {
  const request = axios.get(`/api/search_string_type?search=${searchString}`);
  return {
    type: GET_SEARCH_STRING_TYPE,
    payload: request
  }
}

export function getSearchStringTypeSuccess(response) {
  return {
    type: GET_SEARCH_STRING_TYPE_SUCCESS,
    payload: response
  }
}

export function getSearchStringTypeFailure(error) {
  return {
    type: GET_SEARCH_STRING_TYPE_FAILURE,
    payload: error
  }
}