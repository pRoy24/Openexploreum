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
export const GET_TRANSACTION_DETAILS = 'GET_TRANSACTION_DETAIL';
export const GET_TRANSACTION_DETAILS_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS';
export const GET_TRANSACTION_DETAILS_FAILURE = 'GET_TRANSACTION_DETAIL_FAILURE';

export const RESET_TRANSACTION_DETAILS = 'RESET_TRANSACTION_DETAILS';

export function getTransactionDetails(txHash) {
  const request = axios.get(`/api/transaction_details?search=${txHash}`);
  return {
      type: GET_TRANSACTION_DETAILS,
      payload: request
  }
}

export function getTransactionDetailsSuccess(response) {
  return {
    type: GET_TRANSACTION_DETAILS_SUCCESS,
    payload: response
  }
}

export function getTransactionDetailsFailure(error) {
  return {
    type: GET_TRANSACTION_DETAILS_FAILURE,
    payload: error
  }
}

export function resetTransactionDetails() {
  return {
    type: RESET_TRANSACTION_DETAILS
  }
}