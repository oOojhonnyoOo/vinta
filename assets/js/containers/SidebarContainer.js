import React from 'react';
import {connect} from 'react-redux';
import {
  Link
} from 'react-router-dom';
import * as repositoryAPI from '../api/RepositoryAPI';
import PropTypes from 'prop-types';


class SidebarContainer extends React.Component {

  componentDidMount() {
    repositoryAPI.getRepositories();
  }

  render() {
    const {repositories} = this.props;

    return (
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <Link to="/">
            Github Monitor
          </Link>
        </li>
        {repositories && repositories.length !== 0 && repositories.map((repository, index) => (
          <li key={index}>
            <Link to={'/commits?field=repository&value=' + repository.name}>
              {repository.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

SidebarContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  repositories: store.repositoryState.repositories
});

export default connect(mapStateToProps)(SidebarContainer);
