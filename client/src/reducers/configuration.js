// Copyright 2018 Tokenplex LLC. https://tokenplex.io. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

import { GET_CONFIGURATION, GET_CONFIGURATION_SUCCESS, GET_CONFIGURATION_FAILURE, POST_CONFIGURATION,
  POST_CONFIGURATION_SUCCESS, POST_CONFIGURATION_FAILURE
} from '../actions/configuration';

const initialState = {
  configData: {},
  postConfig: {},
  error: false
}

export default function configurationReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CONFIGURATION:
      return {
        ...state, configData  :{}
      }
    case GET_CONFIGURATION_SUCCESS:
      return {
        ...state, configData: action.payload.data
      }
    case GET_CONFIGURATION_FAILURE:
      return {
        ...state, configData: {}, error: true
      }
    case POST_CONFIGURATION:
      return {...state, postConfig: {}}
    case POST_CONFIGURATION_SUCCESS:
      return {...state, postConfig: action.payload.data}
    case POST_CONFIGURATION_FAILURE:
      return {...state, postConfig: {}}
    default:
      return state
  }
}