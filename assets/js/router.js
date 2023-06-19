import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import SidebarContainer from './containers/SidebarContainer';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <div id="sidebar-wrapper">
                <SidebarContainer />
            </div>

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <Switch>
                        <Route path="/" exact component={RepoCreateContainer} />
                        <Route path="/commits" exact render={() => <CommitListContainer />} />
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);
