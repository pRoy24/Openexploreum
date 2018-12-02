import { GET_USER_INPUT_STATS, GET_USER_INPUT_STATS_SUCCESS, GET_USER_INPUT_STATS_FAILURE, GET_SEARCH_STRING_TYPE,
         GET_SEARCH_STRING_TYPE_SUCCESS, GET_SEARCH_STRING_TYPE_FAILURE} from '../actions/user_input_stats';

const initialState = {
  searchStringType: "",
  userInputData: {"top": "", "latestBlock": {}, "latestBlockTransactions": {}, "pendingBlockTransactions": {}},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function userInputStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USER_INPUT_STATS:
      return {
        ...state,
        isFetching: true
      }
    case GET_USER_INPUT_STATS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        userInputData: action.payload.data
      }
    case GET_USER_INPUT_STATS_FAILURE:
      return {
        ...state,
        userInputData: initialState.blockStats,
        isFetching: false,
        error: true
      }
    case GET_SEARCH_STRING_TYPE:
      return {...state, searchStringType: ""}
    case GET_SEARCH_STRING_TYPE_SUCCESS:
      return {...state, searchStringType: action.payload.data}
    default:
      return state
  }
}