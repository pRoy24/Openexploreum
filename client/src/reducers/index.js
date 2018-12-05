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

import { combineReducers } from 'redux';

import etherStatsReducer from './ethereum_stats';
import userInputStatsReducer from './user_input_stats';
import blockStatsReducer from './block_stats';
import tokenStatsReducer from './token_stats';
import transactionStatsReducer from './transaction_stats';
import accountStatsReducer from './account_stats';
import configurationReducer from './configuration';

const rootReducer = combineReducers({
    etherStats: etherStatsReducer,
    blockStats: blockStatsReducer,
    tokenStats: tokenStatsReducer,
    userInputStats: userInputStatsReducer,
    transactionStats: transactionStatsReducer,
    accountStats: accountStatsReducer,
    configuration: configurationReducer
})

export default rootReducer