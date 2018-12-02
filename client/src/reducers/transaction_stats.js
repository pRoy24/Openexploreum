import { GET_TRANSACTION_DETAILS, GET_TRANSACTION_DETAILS_SUCCESS, GET_TRANSACTION_DETAILS_FAILURE,
  RESET_TRANSACTION_DETAILS
} from '../actions/transaction_stats';

const initialState = {
  transactionDetails: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function transactionStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_DETAILS:
      return {
        ...state,
        transactionDetails: {},
        isFetching: true
      }
    case GET_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        transactionDetails: action.payload.data
      }
    case GET_TRANSACTION_DETAILS_FAILURE:
      return {
        ...state,
        transactionDetails: {},
        isFetching: false,
        error: true
      }
    case RESET_TRANSACTION_DETAILS:
      return {...state, transactionDetails: {}}
    default:
      return state
  }
}