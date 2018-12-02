import axios from 'axios';

export const GET_ACCOUNT_DETAILS = 'GET_ACCOUNT_DETAILS';
export const GET_ACCOUNT_DETAILS_SUCCESS = 'GET_ACCOUNT_DETAILS_SUCCESS';
export const GET_ACCOUNT_DETAILS_FAILURE = 'GET_ACCOUNT_DETAILS_FAILURE';

export const GET_ACCOUNT_CURRENT_TRANSACTIONS = 'GET_ACCOUNT_CURRENT_TRANSACTIONS';
export const GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS = 'GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS';
export const GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE = 'GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE';

export const GET_ACCOUNT_DAY_TRANSACTIONS = 'GET_ACCOUNT_DAY_TRANSACTIONS';
export const GET_ACCOUNT_DAY_TRANSACTIONS_SUCCESS = 'GET_ACCOUNT_DAY_TRANSACTIONS_SUCCESS';
export const GET_ACCOUNT_DAY_TRANSACTIONS_FAILURE = 'GET_ACCOUNT_DAY_TRANSACTIONS_FAILURE';

export const QUERY_ACCOUNT_DAY_TRANSACTIONS = 'QUERY_ACCOUNT_DAY_TRANSACTIONS';

export const CLEAR_ACCOUNT_DETAILS = 'CLEAR_ACCOUNT_DETAILS';

export function getAccountDetails(address) {

  const request = axios.get(`/api/account_details?search=${address}`);
  return {
    type: GET_ACCOUNT_DETAILS,
    payload: request
  }
}

export function getAccountDetailsSuccess(response) {
  return {
    type: GET_ACCOUNT_DETAILS_SUCCESS,
    payload: response
  }
}

export function getAccountDetailsFailure(error) {
  return {
    type: GET_ACCOUNT_DETAILS_FAILURE,
    payload: error
  }
}

export function getAccountCurrentTransactions(address) {
  const request = axios.get(`/api/account_current_transactions?search=${address}`);
  return {
    type: GET_ACCOUNT_CURRENT_TRANSACTIONS,
    payload: request
  }
}

export function getAccountCurrentTransactionsSuccess(response) {
  return {
    type: GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS,
    payload: response
  }
}

export function getAccountCurrentTransactionsFailure(error){
  return {
    type: GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE,
    payload: error
  }
}

export function getAccountDayTransactions(address) {
  const request = axios.get(`/api/account_daily_transactions?search=${address}`);
  return {
    type: GET_ACCOUNT_DAY_TRANSACTIONS,
    payload: request
  }
}

export function getAccountDayTransactionsSuccess(response) {
  return {
    type: GET_ACCOUNT_DAY_TRANSACTIONS_SUCCESS,
    payload: response
  }  
}

export function getAccountDayTransactionsFailure(error) {
  return {
    type: GET_ACCOUNT_DAY_TRANSACTIONS_FAILURE,
    payload: error
  }
}

export function queryAccountDayTransactions(address) {
  const request = axios.get(`/api/query_account_day_transactions?search=${address}`)
  return {
    type: QUERY_ACCOUNT_DAY_TRANSACTIONS,
    payload: request
  }
}

export function clearAccountDetails() {
  return {
    type: CLEAR_ACCOUNT_DETAILS
  }
}