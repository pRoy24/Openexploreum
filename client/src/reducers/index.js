
import { combineReducers } from 'redux';

import etherStatsReducer from './ethereum_stats';
import userInputStatsReducer from './user_input_stats';
import blockStatsReducer from './block_stats';
import tokenStatsReducer from './token_stats';
import transactionStatsReducer from './transaction_stats';
import accountStatsReducer from './account_stats';

const rootReducer = combineReducers({
    etherStats: etherStatsReducer,
    blockStats: blockStatsReducer,
    tokenStats: tokenStatsReducer,
    userInputStats: userInputStatsReducer,
    transactionStats: transactionStatsReducer,
    accountStats: accountStatsReducer
})

export default rootReducer