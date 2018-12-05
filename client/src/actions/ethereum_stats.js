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

const API_ENDPOINT = 'http://localhost:3000/api';

export const FETCH_ETHEREUM_DATA = 'FETCH_ETHEREUM_DATA';
export const FETCH_ETHEREUM_DATA_SUCCESS = 'FETCH_ETHEREUM_DATA_SUCCESS';
export const FETCH_ETHEREUM_DATA_FAILURE = 'FETCH_ETHEREUM_DATA_FAILURE';


export const FETCH_DAILY_TRANSACION_STATS = 'FETCH_DAILY_TRANSACION_STATS';
export const FETCH_DAILY_TRANSACION_STATS_SUCCESS = 'FETCH_DAILY_TRANSACION_STATS_SUCCESS';
export const FETCH_DAILY_TRANSACION_STATS_FAILURE = 'FETCH_DAILY_TRANSACION_STATS_FAILURE';

export const GET_HOURLY_TRANSACTION_STATS = 'GET_HOURLY_TRANSACTION_STATS';
export const GET_HOURLY_TRANSACTION_STATS_SUCCESS = 'GET_HOURLY_TRANSACTION_STATS_SUCCESS';
export const GET_HOURLY_TRANSACTION_STATS_FAILURE = 'GET_HOURLY_TRANSACTION_STATS_FAILURE';

export const CLEAR_ETHEREUM_DATA = 'CLEAR_ETHEREUM_DATA';

export const START_QUERY_ETHEREUM_STATS = 'START_QUERY_ETHEREUM_STATS';
export const STOP_QUERY_ETHEREUM_STATS = 'STOP_QUERY_ETHEREUM_STATS';

export function fetchEtherumData() {
    const request = axios.get(`/api/ethereum_stats`);
    return {
        type: FETCH_ETHEREUM_DATA,
        payload: request
    }    
}

export function fetchEtherumDataSuccess(response) {
    return {
        type: FETCH_ETHEREUM_DATA_SUCCESS,
        payload: response
    }
}

export function fetchEthereumDataFailure(error) {
    return {
        type: FETCH_ETHEREUM_DATA_FAILURE,
        payload: error
    }
}

export function getHourlyTransactionStats() {
    const request = axios.get('/api/hourly_transaction_stats');
    return {
        type: GET_HOURLY_TRANSACTION_STATS,
        payload: request
    }
}

export function getHourlyTransactionStatsSuccess(response) {
    return {
        type: GET_HOURLY_TRANSACTION_STATS_SUCCESS,
        payload: response
    }
}

export function getHourlyTransactionStatsFailure(error) {
    return {
        type: GET_HOURLY_TRANSACTION_STATS_FAILURE,
        payload: error
    }
}

export function clearEthereumData() {
    return {
        type: CLEAR_ETHEREUM_DATA
    }
}

export function startQueryEthereumStats() {
    const request = axios.get(`/api/start_query_ethereum_stats`);
    return {
       type: START_QUERY_ETHEREUM_STATS,
       payload: request
    }
}

export function stopQueryEthereumStats() {
    const request = axios.get(`/api/stop_query_ethereum_stats`);
    return {
       type: STOP_QUERY_ETHEREUM_STATS,
       payload: request
    }    
}

