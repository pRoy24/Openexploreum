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