import * as types from './ActionTypes';

export const getCommitsSuccess = payload => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: payload,
});

export const updateCurrentPage = current_page => ({
  type: types.UPDATE_CURRENT_PAGE,
  current_page: current_page,
});