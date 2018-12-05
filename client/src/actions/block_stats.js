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