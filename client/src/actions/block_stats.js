import axios from 'axios';

export const GET_BLOCK_INTRO = 'GET_BLOCK_INTRO';
export const GET_BLOCK_INTRO_SUCCESS = 'GET_BLOCK_INTRO_SUCCESS';
export const GET_BLOCK_INTRO_FAILURE = 'GET_BLOCK_INTRO_FAILURE';

export const GET_BLOCK_DETAILS = 'GET_BLOCK_DETAILS';
export const GET_BLOCK_DETAILS_SUCCESS = 'GET_BLOCK_DETAILS_SUCCESS';
export const GET_BLOCK_DETAILS_FAILURE = 'GET_BLOCK_DETAILS_FAILURE';

export function getBlockIntro(blockNumber) {
  const request = axios.get(`/api/block_intro?search=${blockNumber}`);
  return {
    type: GET_BLOCK_INTRO,
    payload: request
  }
}

export function getBlockIntroSuccess(response) {
  return {
    type: GET_BLOCK_INTRO_SUCCESS,
    payload: response
  }
}

export function getBlockIntroFailure(error) {
  return {
    type: GET_BLOCK_INTRO_FAILURE,
    payload: error
  }
}

export function getBlockDetails(blockNumber) {
  const request = axios.get(`/api/block_details?search=${blockNumber}`);
  return {
    type: GET_BLOCK_DETAILS,
    payload: request
  }
}

export function getBlockDetailsSuccess(response) {
  return {
    type: GET_BLOCK_DETAILS_SUCCESS,
    payload: response
  }
}

export function getBlockDetailsFailure(error) {
  return {
    type: GET_BLOCK_DETAILS_FAILURE,
    payload: error
  }
}