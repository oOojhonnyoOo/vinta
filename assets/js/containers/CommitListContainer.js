import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';


class CommitListContainer extends React.Component {

  componentDidMount(current_page = 1) {  
    const field = this.getQueryParam('field');
    const value = this.getQueryParam('value');
    const filter = {field, value}

    commitAPI.getCommits(current_page, filter);
  }

  nextPage() {
    const {current_page} = this.props;
    this.componentDidMount(current_page+1);
  }

  previousPage() {
    const {current_page} = this.props;
    this.componentDidMount(current_page-1);
  }

  getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  render() {
    const {commits, next, previous, count, current_page} = this.props;
    return (
      <div>
        <CommitList commits={commits} />

        <div className="row">
          <div className="col-6">
            <p className="text-monospace">total commits: {count} </p>
          </div>
          <div className="col-6">
            <nav>
              <ul className="pagination justify-content-end">
                <li className={'page-item ' + (previous == null ? ' disabled' : '')} onClick={this.previousPage.bind(this)}>
                  <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className={'page-item ' + (current_page-1 == 0 ? ' disabled' : '')}><a className="page-link" href="#">{current_page-1}</a></li>
                <li className="page-item"><a className="page-link" href="#">{current_page}</a></li>
                <li className={'page-item ' + (next == null ? 'disabled' : '')}><a className="page-link" href="#">{current_page+1}</a></li>
                <li className={'page-item ' + (next == null ? 'disabled' : '')} onClick={this.nextPage.bind(this)}>
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  next: store.commitState.next,
  previous: store.commitState.previous,
  count: store.commitState.count,
  current_page: store.commitState.current_page,
});

export default connect(mapStateToProps)(CommitListContainer);
