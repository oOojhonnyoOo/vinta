import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess, updateCurrentPage
} from '../actions/CommitActions';

export const getCommits = function (page, filter) { 
  let url = `/api/commits/?page=${page}`;

  if (filter.field && filter.value) {
    url += `&${filter.field}=${filter.value}`;
  }

  axios.get(url).then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
    store.dispatch(updateCurrentPage(page));
  });
}
