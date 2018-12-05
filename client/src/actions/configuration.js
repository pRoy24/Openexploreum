const axios = require('axios');

export const GET_CONFIGURATION = 'GET_CONFIGURATION';
export const GET_CONFIGURATION_SUCCESS = 'GET_CONFIGURATION_SUCCESS';
export const GET_CONFIGURATION_FAILURE = 'GET_CONFIGURATION_FAILURE';

export const POST_CONFIGURATION = 'POST_CONFIGURATION';
export const POST_CONFIGURATION_SUCCESS = 'POST_CONFIGURATION_SUCCESS';
export const POST_CONFIGURATION_FAILURE = 'POST_CONFIGURATION_FAILURE';

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

export const CHANGE_PROVIDER_VALUE = 'CHANGE_PROVIDER_VALUE';

export function getConfiguration() {
    const request = axios.get(`/api/configuration`);
    return {
      type: GET_CONFIGURATION,
      payload: request
    }
}

export function getConfigurationSuccess(response) {
    return {
      type: GET_CONFIGURATION_SUCCESS,
      payload: response
    }
}

export function getConfigurationFailure(error) {
    return {
      type: GET_CONFIGURATION_FAILURE,
      payload: error
    }
}

export function postConfiguration(payload) {
    console.log(payload);
    const reqPayload = {"provider": payload};
    const request = axios.post('/api/configuration', reqPayload);
    return {
      type: POST_CONFIGURATION,
      payload: request
    }
}

export function postConfigurationSuccess(response) {
  return {
    type: POST_CONFIGURATION_SUCCESS,
    payload: response
  }
}

export function postConfigurationFailure(error) {
  return {
    type: POST_CONFIGURATION_FAILURE,
    payload: error
  }
}

export function changeProviderValue(val) {
  return {
    type: CHANGE_PROVIDER_VALUE,
    payload:val
  }
}