import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
  successMessage: false,
  errorMessage: false,
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload),
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, successMessage: action.payload.successMessage};
    }
    case types.CREATE_REPOSITORY_ERROR: {
      return {...state, errorMessage: action.payload.errorMessage};
    }
    default:
      return state;
  }
};

export default repositoryReducer;
