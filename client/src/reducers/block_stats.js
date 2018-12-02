import { GET_BLOCK_INTRO, GET_BLOCK_INTRO_SUCCESS, GET_BLOCK_INTRO_FAILURE, GET_BLOCK_DETAILS,
  GET_BLOCK_DETAILS_SUCCESS, GET_BLOCK_DETAILS_FAILURE
} from '../actions/block_stats';

const initialState = {
  blockIntro: {},
  blockDetails: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  success: false,
}

export default function blockStatsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_BLOCK_INTRO:
      return {...state, blockIntro: {}}
    case GET_BLOCK_INTRO_SUCCESS:
      return {...state, blockIntro: action.payload.data}
    case GET_BLOCK_INTRO_FAILURE:
      return {...state, blockIntro: {}}
    case GET_BLOCK_DETAILS:
      return {
        ...state,
        blockDetails: {},
        isFetching: true
      }
    case GET_BLOCK_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        blockDetails: action.payload.data
      }
    case GET_BLOCK_DETAILS_FAILURE:
      return {
        ...state,
        blockDetails: {},
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}