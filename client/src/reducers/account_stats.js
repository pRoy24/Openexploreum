import { GET_ACCOUNT_DETAILS, GET_ACCOUNT_DETAILS_SUCCESS, GET_ACCOUNT_DETAILS_FAILURE,
  GET_ACCOUNT_CURRENT_TRANSACTIONS, GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS, GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE,
  CLEAR_ACCOUNT_DETAILS
} from '../actions/account_stats';

const initialState = {
  accountDetails: [],
  accountCurrentTransactions: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function accountStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNT_DETAILS:
      return {
        ...state,
        accountDetails: [],
        isFetching: true
      }
    case GET_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        accountDetails: action.payload.data
      }
    case GET_ACCOUNT_DETAILS_FAILURE:
      return {
        ...state,
        accountDetails: [],
        isFetching: false,
        error: true
      }
    case GET_ACCOUNT_CURRENT_TRANSACTIONS:
      return {...state, accountCurrentTransactions: {}}
    case GET_ACCOUNT_CURRENT_TRANSACTIONS_SUCCESS:
      return {...state,accountCurrentTransactions: action.payload.data}
    case GET_ACCOUNT_CURRENT_TRANSACTIONS_FAILURE:
      return {...state}
    case CLEAR_ACCOUNT_DETAILS:
      return {...state, accountDetails: initialState.accountDetails, accountCurrentTransactions: initialState.accountCurrentTransactions}
    default:
      return state
  }
}