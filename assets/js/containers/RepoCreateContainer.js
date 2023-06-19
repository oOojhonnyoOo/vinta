import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as repositoryAPI from '../api/RepositoryAPI';
import Form from '../components/RepoCreateForm';
import CommitListContainer from './CommitListContainer';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const user = values.name.split('/')[0];
    const repository = values.name.split('/')[1];
    const v = {...values, user, repository};
    return repositoryAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  render() {
    const {successMessage, errorMessage} = this.props;
    return (
      <div>
        <Form
          onSubmit={this.submit} 
          successMessage={successMessage} 
          errorMessage={errorMessage} 
        />

        <CommitListContainer />
      </div>
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.repositoryState.successMessage,
  errorMessage: store.repositoryState.errorMessage,
});

export default connect(mapStateToProps)(RepoCreateContainer);
