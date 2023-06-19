import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  next: null,
  previous: null,
  count: 0,
  current_page: 1,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.results),
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };
    case types.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.current_page
      };
    default:
      return state;
  }
};

export default commitReducer;
