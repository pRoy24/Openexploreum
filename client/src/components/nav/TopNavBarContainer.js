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

import TopNavBar from './TopNavBar';

import {getUserInputStats, getUserInputStatsSuccess, getUserInputStatsFailure, getSearchStringType, 
  getSearchStringTypeSuccess, getSearchStringTypeFailure
} from '../../actions/user_input_stats.js';
import {getConfiguration, getConfigurationSuccess,getConfigurationFailure, postConfiguration, 
  postConfigurationSuccess, postConfigurationFailure
} from '../../actions/configuration.js';

import {connect} from 'react-redux';


const mapStateToProps = state => {
  return {
    etherStats: state.etherStats,
    userInputStats: state.userInputStats,
    configuration: state.configuration
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchStringType: (searchString) => {
      dispatch(getSearchStringType(searchString)).then(function(res){
        if (res.payload.status === 200) {
          dispatch(getSearchStringTypeSuccess(res.payload.data));
        } else {
          dispatch(getSearchStringTypeFailure(res.payload.error));
        }
      })
    },
    getUsetInputStats: (searchString) => {
       dispatch(getUserInputStats(searchString)).then(function(res){
         if (res.payload.status === 200) {
           dispatch(getUserInputStatsSuccess(res.payload.data));
         } else {
           dispatch(getUserInputStatsFailure(res.payload.error));
         }
       })
    },
    submitProviderValue: (value) =>{
      dispatch(postConfiguration(value)).then(function(response){
        if (response.payload.status === 200) {
          dispatch(postConfigurationSuccess(response.payload.data));
        } else {
          dispatch(postConfigurationFailure(response.payload.error));
        }
      })
    },
    getConfiguration: () => {
      dispatch(getConfiguration()).then(function(response){
        if (response.payload.status === 200) {
          dispatch(getConfigurationSuccess(response.payload.data));
        } else {
          dispatch(getConfigurationFailure(response.payload.error));
        }
      })
    }    
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavBar);