/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Root from './scenes/Root';
import Main from './scenes/Main';
import RequestRepository from './scenes/repository/RequestRepository';
import AcceptRepository from './scenes/repository/AcceptRepository';
import RejectRepository from './scenes/repository/RejectRepository';
import SearchRepository from './scenes/repository/SearchRepository';
import RequestLibrary from './scenes/library/RequestLibrary';
import AcceptLibrary from './scenes/library/AcceptLibrary';
import RejectLibrary from './scenes/library/RejectLibrary';
import PendingRequests from './scenes/common/PendingRequests';
import WaitingRequests from './scenes/common/WaitingRequests';
import ErrorPage from './scenes/common/ErrorPage';
import ViewByProduct from './scenes/dependencymanager/Views/ViewByProduct';
import ViewByLibrary from './scenes/dependencymanager/Views/ViewByLibrary';
import ViewByProductComponent from './scenes/dependencymanager/Views/ViewByProductOrComponent';
import Welcome from './scenes/dependencymanager/Views/Welcome';

/**
 * @class App
 * @extends {Component}
 * @description Sample React component
 */
class App extends Component {
    /**
     *
     * @returns {object} App view
     * @memberof App
     */
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/app'} component={Root} >
                    <IndexRoute component={RequestRepository} />
                    <Route path={'pendingRequests'} component={PendingRequests} />
                    <Route path={'waitingRequests'} component={WaitingRequests} />
                    <Route path={'acceptRepository'} component={AcceptRepository} />
                    <Route path={'rejectRepository'} component={RejectRepository} />
                    <Route path={'searchRepository'} component={SearchRepository} />
                    <Route path={'requestRepository'} component={RequestRepository} />
                    <Route path={'requestLibrary'} component={RequestLibrary} />
                    <Route path={'acceptLibrary'} component={AcceptLibrary} />
                    <Route path={'rejectLibrary'} component={RejectLibrary} />
                    <Route path={'ViewbyProduct'} component={ViewByProduct} />
                    <Route path={'ViewbyLibrary'} component={ViewByLibrary} />
                    <Route path={'ViewbyProductComponent'} component={ViewByProductComponent} />
                    <Route path={'Welcome'} component={Welcome} />
                </Route>
                <Route path={'/'} component={Main} />
                <Route path={'/errorPage'} component={ErrorPage} />
            </Router>
        );
    }
}

export default App;
