import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, createRepositoryError, getRepositoriesSuccess
} from '../actions/RepositoryActions';

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    let message = error.response.data[0]
    store.dispatch(createRepositoryError(message, true));
    formDispatch(reset('repoCreate'));
  });

export const getRepositories = () => axios.get('/api/repositories/')
  .then((response) => {
    store.dispatch(getRepositoriesSuccess(response.data, true));
  })