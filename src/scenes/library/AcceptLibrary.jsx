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
import { Link, hashHistory } from 'react-router';
import ValidateUser from '../../services/authentication/ValidateUser';
import LibraryRequest from '../../services/database/LibraryRequest';
import StringValidations from '../../services/validations/StringValidations';
import LibraryProcess from '../../services/bpmn/LibraryProcess';
import Alert from '../common/Alert';

/**
 * @class RequestRepository
 * @extends {Component}
 * @description Sample React component
 */
class AcceptLibrary extends Component {
    /**
    * @class RequestRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.state = {
            libraryTypes: [],
            libraryCategories: [],
            libraryId: props.location.query.libRequestId,// eslint-disable-line
            libraryRequestDetails: [],
            libraryRequestSponsored: false,
            buttonState: false,
            displayFieldset: 'block',
            displayLoader: 'none',
            displaySuceessBox: 'none',
            displayErrorBox: 'none',
            displayIds: 'none',
            displayAlrearyAccept: 'none',
            displayAlrearyMessage: '',
            validateLibrary: '',
            userDetails: [],
        };
        this.acceptRequest = this.acceptRequest.bind(this);
    }
    /**
    * @class RequestRepository
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        /* eslint-disable max-len */
        ValidateUser.getUserDetails().then((response) => {
            this.setState(() => {
                return {
                    userDetails: response,
                };
            });
        });
        Promise.all([ValidateUser.getUserDetails(), LibraryRequest.selectLibraryRequestFromId(this.state.libraryId)]).then((response) => {
            let i = 0;
            for (i = 0; i < response[0].libraryUserDetails.length; i++) {
                if (response[0].libraryUserDetails[i].roleLibType === response[1].LIBCATEGORY_NAME && response[0].libraryUserDetails[i].rolePermission === 'ADMIN') {
                    this.setState(() => {
                        return {
                            displayFieldset: 'block',
                            displayLoader: 'none',
                            displaySuceessBox: 'none',
                            displayErrorBox: 'none',
                        };
                    });
                    return;
                }
            }
            hashHistory.push('/errorPage');
        });
        LibraryRequest.selectLibraryRequestFromId(this.state.libraryId).then((response) => {
            if (response.LIBREQUEST_ACCEPTED === 'ACCEPT') {
                this.setState(() => {
                    return {
                        displayAlrearyAccept: 'block',
                        displayAlrearyMessage: 'This request is already accepted by ' + response.LIBREQUEST_ACCEPT_OR_REJECT_BY,
                        displayFieldset: 'none',
                        displayLoader: 'none',
                        displaySuceessBox: 'none',
                        displayErrorBox: 'none',
                    };
                });
                return;
            } else if (response.LIBREQUEST_ACCEPTED === 'REJECT') {
                this.setState(() => {
                    return {
                        displayAlrearyAccept: 'block',
                        displayAlrearyMessage: 'This request is rejected accepted by ' + response.LIBREQUEST_ACCEPT_OR_REJECT_BY + ' because ' + response.LIBREQUEST_REJECT_REASON,
                        displayFieldset: 'none',
                        displayLoader: 'none',
                        displaySuceessBox: 'none',
                        displayErrorBox: 'none',
                    };
                });
                return;
            }
            this.setState(() => {
                return {
                    libraryRequestDetails: response,
                    libraryRequestSponsored: response.LIBREQUEST_SPONSORED,
                };
            });
            if (response.LIBCATEGORY_NAME === 'Java') {
                this.setState(() => {
                    return {
                        displayIds: 'block',
                    };
                });
                this.inputGroupId.value = response.LIBREQUEST_GROUP_ID;
                this.inputArtifactId.value = response.LIBREQUEST_ARTIFACT_ID;
            } else {
                this.setState(() => {
                    return {
                        displayIds: 'none',
                    };
                });
                this.inputGroupId.value = response.LIBREQUEST_GROUP_ID;
                this.inputArtifactId.value = response.LIBREQUEST_ARTIFACT_ID;
            }
            this.inputLibraryName.value = response.LIBREQUEST_NAME;
            this.selectLibraryType.value = response.LIBTYPE_NAME;
            this.selectLibraryCategory.value = response.LIBCATEGORY_NAME;
            this.inputVersionWeUse.value = response.LIBREQUEST_USE_VERSION;
            this.inputLibraryFileName.value = response.LIBREQUEST_FILE_NAME;
            this.inputLatestVersion.value = response.LIBREQUEST_LATEST_VERSION;
            this.inputCompany.value = response.LIBREQUEST_COMPANY;
            this.textPurpose.value = StringValidations.setStringToShow(response.LIBREQUEST_PURPOSE);
            this.textDescription.value = StringValidations.setStringToShow(response.LIBREQUEST_DESCRIPTION);
            this.textAlternatives.value = StringValidations.setStringToShow(response.LIBREQUEST_ALTERNATIVES);
        });
    }
    /**
    * @param {any} e event
    * go back to request
    */
    goBackToRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState(() => {
            return {
                displayFieldset: 'block',
                displayErrorBox: 'none',
                displaySuceessBox: 'none',
            };
        });
    }
    /**
    * reload page
    */
    reloadPage() {
        window.location.reload();
    }
    /**
    * @param {any} e event
    * go back to request
    * @returns {Promise} promise
    */
    acceptRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (confirm("Are you sure to request it?") === false ) {// eslint-disable-line
            return false;
        }
        this.setState(() => {
            return {
                displayFieldset: 'none',
                displayLoader: 'block',
            };
        });
        LibraryProcess.acceptRequest(this.state.libraryId).then((response) => {
            console.log(response);//eslint-disable-line
            if (response.data.responseType === 'Done') {
                this.setState(() => {
                    return {
                        displayFieldset: 'none',
                        displayLoader: 'none',
                        displaySuceessBox: 'block',
                        displayErrorBox: 'none',
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        displayFieldset: 'none',
                        displayLoader: 'none',
                        displaySuceessBox: 'none',
                        displayErrorBox: 'block',
                    };
                });
            }
        });

        return false;
    }
    /**
    * @class RequestRepository
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.acceptRequest}>
                {/* eslint-disable max-len */}
                <h2 className="text-center">3rd Party Library Request</h2>
                <fieldset style={{ display: this.state.displayFieldset }}>
                    {/* eslint-disable max-len */}
                    <br />
                    <div className="form-group">
                        <label htmlFor="inputLibraryName" className="col-lg-2 control-label">
                            Library Name
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLibraryName = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLibraryType" className="col-lg-2 control-label">
                            Library Type
                        </label>
                        <div className="col-lg-10" >
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.selectLibraryType = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLibraryCategory" className="col-lg-2 control-label">
                            Library Category
                        </label>
                        <div className="col-lg-10" >
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.selectLibraryCategory = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div
                        className="form-group"
                        style={{ display: this.state.displayIds }}
                    >
                        <label htmlFor="inputGroupId" className="col-lg-2 control-label">
                            Group ID
                        </label>
                        <div className="col-lg-10" >
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputGroupId = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div
                        className="form-group"
                        style={{ display: this.state.displayIds }}
                    >
                        <label htmlFor="inputArtifactId" className="col-lg-2 control-label">
                            Artifact ID
                        </label>
                        <div className="col-lg-10" >
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputArtifactId = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputVersionWeUse" className="col-lg-2 control-label">
                            Version we use
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputVersionWeUse = c; }}
                                readOnly="true"
                            />
                            <span className="validate">
                                {this.state.validateLibrary}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLibraryFileName" className="col-lg-2 control-label">
                            Library File Name
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLibraryFileName = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLatestVersion" className="col-lg-2 control-label">
                            Latest Version
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLatestVersion = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputCompany" className="col-lg-2 control-label">
                            Company
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputCompany = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <label htmlFor="checkSponsored" className="col-lg-2 control-label"> Sponsor by the Company </label>
                        <div className="col-lg-10" ref={(c) => { this.checkSponsored = c; }}>
                            {/* eslint-disable */}
                            <input type="radio" name="sponsored" value="Yes" checked={(this.state.libraryRequestSponsored) ? true : false}/> Yes <br />
                            <input type="radio" name="sponsored" value="No" checked={(this.state.libraryRequestSponsored) ? false : true}/> No <br />
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textPurpose" className="col-lg-2 control-label">
                            Purpose
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.textPurpose = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textDescription" className="col-lg-2 control-label">
                            Description
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.textDescription = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textAlternatives" className="col-lg-2 control-label">
                            Alternatives
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.testAlternatives = c; }}
                                readOnly="true"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <div className="col-lg-10 col-lg-offset-2">
                            <Link
                                to={'/app/rejectLibrary?libRequestId=' + this.state.libraryId}
                            >
                                <button className="btn btn-danger">Reject</button>
                            </Link>
                            &nbsp;
                            <button
                                type="submit"
                                id="submitButton"
                                className="btn btn-info"
                                data-loading-text="Loading ..."
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </fieldset>
                <div className="container-fluid" style={{ display: this.state.displayLoader }}>
                    <br /><br /><br />
                    <div className="row">
                        <div className="col-lg-5" />
                        <div className="col-lg-4">
                            <div className="loader" />
                        </div>
                        <div className="col-lg-3" />
                    </div>
                </div>

                <div className="modal" style={{ display: this.state.displaySuceessBox }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                />
                                <h4 className="modal-title">Succesfull</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span><i className="fa fa-check" aria-hidden="true" /></span>
                                    &nbsp;Request successfully submitted for approval via e-mail
                                </p>
                            </div>
                            <div className="modal-footer">
                                <Link to={'/'} >
                                    <button type="button" className="btn btn-default" data-dismiss="modal">
                                        Back to main page
                                    </button>
                                </Link>&nbsp;&nbsp;
                                <button
                                    onClick={this.reloadPage}
                                    type="button"
                                    className="btn btn-success"
                                >Another Request</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" style={{ display: this.state.displayErrorBox }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                />
                                <h4 className="modal-title">Failed</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span><i className="fa fa-times" aria-hidden="true" /></span>
                                    &nbsp;Request sending fail
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={this.goBackToRequest}
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    name="Back"
                                />
                                &nbsp;&nbsp;
                                <Link to={'/app/requestLibrary'} >
                                    <button type="button" className="btn btn-success">
                                        New Request
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Alert message={this.state.displayAlrearyMessage} display={this.state.displayAlrearyAccept} />
            </form>
        );
    }
}

export default AcceptLibrary;
