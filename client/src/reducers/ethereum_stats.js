import { FETCH_ETHEREUM_DATA, FETCH_ETHEREUM_DATA_SUCCESS, FETCH_ETHEREUM_DATA_FAILURE, GET_HOURLY_TRANSACTION_STATS,
GET_HOURLY_TRANSACTION_STATS_SUCCESS, GET_HOURLY_TRANSACTION_STATS_FAILURE, CLEAR_ETHEREUM_DATA} from '../actions/ethereum_stats';

const initialState = {
  blockData: {"top": "", "latestBlock": {}, "latestBlockTransactions": {}, "pendingBlockTransactions": {}},
  dailyTransactionStats: [],
  hourlyTransactionStats: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function etherStatsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ETHEREUM_DATA:
      return {
        ...state,

        isFetching: true
      }
    case FETCH_ETHEREUM_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        blockData: action.payload.data
      }
    case FETCH_ETHEREUM_DATA_FAILURE:
      return {
        ...state,
        blockData: initialState.blockStats,
        isFetching: false,
        error: true
      }
    case GET_HOURLY_TRANSACTION_STATS:
      return {...state}
      
    case GET_HOURLY_TRANSACTION_STATS_SUCCESS:
      return {...state, hourlyTransactionStats: action.payload.data};
      
    case GET_HOURLY_TRANSACTION_STATS_FAILURE:
      return {...state, dailyTransactionStats: action.payload.error}
    
    case CLEAR_ETHEREUM_DATA:
      return {...state, blockData: initialState.blockData, dailyTransactionStats: initialState.dailyTransactionStats,
        hourlyTransactionStats: initialState.hourlyTransactionStats
      }
      
    default:
      return state
  }
}