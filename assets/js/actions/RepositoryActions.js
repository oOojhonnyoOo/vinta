import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const createRepositoryError = (errorMessage) => ({
  type: types.CREATE_REPOSITORY_ERROR,
  payload: {errorMessage},
});

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});
