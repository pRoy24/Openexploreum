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