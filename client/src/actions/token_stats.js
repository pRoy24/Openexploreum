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
export const FETCH_TOKEN_DETAILS = 'FETCH_TOKEN_DETAILS';
export const FETCH_TOKEN_DETAILS_SUCCESS = 'FETCH_TOKEN_DETAILS_SUCCESS';
export const FETCH_TOKEN_DETAILS_FAILURE = 'FETCH_TOKEN_DETAILS_FAILURE';

export const FETCH_TOKEN_INTRO = 'FETCH_TOKEN_INTRO';
export const FETCH_TOKEN_INTRO_SUCCESS = 'FETCH_TOKEN_INTRO_SUCCESS';
export const FETCH_TOKEN_INTRO_FAILURE = 'FETCH_TOKEN_INTRO_FAILURE';

export const QUERY_TOKEN_DAILY_TRANSACTIONS = 'QUERY_TOKEN_DAILY_TRANSACTIONS';
export const STOP_QUERY_TOKEN_DAILY_TRANSACTIONS = 'STOP_QUERY_TOKEN_DAILY_TRANSACTIONS';

export function fetchTokenDetails(token) {
  const request = axios.get(`/api/token_details?token=${token}`);
  return {
    type: FETCH_TOKEN_DETAILS,
    payload: request
  }
}

export function fetchTokenDetailsSuccess(response) {
  return {
    type: FETCH_TOKEN_DETAILS_SUCCESS,
    payload: response
  }
}

export function fetchTokenDetailsFailure(error) {
  return {
    type: FETCH_TOKEN_DETAILS_FAILURE,
    payload: error
  }
}

export function fetchTokenIntro(token) {
  const request = axios.get(`/api/token_intro?token=${token}`)
  return {
    type: FETCH_TOKEN_INTRO,
    payload: request
  }
}

export function fetchTokenIntroSuccess(response) {
  return {
    type: FETCH_TOKEN_INTRO_SUCCESS,
    payload: response
  }
}

export function fetchTokenIntroFailure(err) {
  return {
    type: FETCH_TOKEN_INTRO_FAILURE,
    payload: err
  }
}

export function getTokenCurrentTransactions() {
  return {
    
  }
}

export function getTokenCurrentTransactionsSuccess() {
  return {
    
  }
}

export function getTokenCurrentTransactionsFailure() {
  return {
    
  }
}

export function queryTokenDailyTransactions(token) {
  const request = axios.get(`/api/query_token_daily_transactions?search=${token}`);
  return {
    type: QUERY_TOKEN_DAILY_TRANSACTIONS,
    payload: request
  }
}

export function stopQueryTokenDailyTransactions(token) {
  const request = axios.get(`/api/stop_query_token_daily_transactions?search=${token}`);
  return {
    type: QUERY_TOKEN_DAILY_TRANSACTIONS,
    payload: request
  }
}