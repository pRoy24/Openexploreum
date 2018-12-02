import { FETCH_TOKEN_DETAILS, FETCH_TOKEN_DETAILS_FAILURE, FETCH_TOKEN_DETAILS_SUCCESS, FETCH_TOKEN_INTRO,
         FETCH_TOKEN_INTRO_SUCCESS, FETCH_TOKEN_INTRO_FAILURE} from '../actions/token_stats';

const initialState = {
  tokenDetails: {},
  tokenIntro: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function etherStatsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TOKEN_DETAILS:
      return {
        ...state,
        tokenDetails: {},
        isFetching: true
      }
    case FETCH_TOKEN_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        tokenDetails: action.payload.data
      }
    case FETCH_TOKEN_DETAILS_FAILURE:
      return {
        ...state,
        tokenDetails: {},
        isFetching: false,
        error: true
      }
    case FETCH_TOKEN_INTRO:
      return {...state, tokenIntro: {}}
    case FETCH_TOKEN_INTRO_SUCCESS:
      return {...state, tokenIntro: action.payload.data}
    case FETCH_TOKEN_INTRO_FAILURE:
      return {...state, tokenIntro: {}}
    default:
      return state
  }
}