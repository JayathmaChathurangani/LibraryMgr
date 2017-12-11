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
import { Link } from 'react-router';
import License from '../../services/database/License';
import RepositoryType from '../../services/database/RepositoryType';
import Organization from '../../services/database/Organization';
import Team from '../../services/github/Team';
import Repository from '../../services/database/Repository';
import Common from '../../services/github/Common';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import StringValidations from '../../services/validations/StringValidations';
import ValidateUser from '../../services/authentication/ValidateUser';

/**
* @class AcceptRepository
* @extends {Component}
* @description Sample React component
*/
class AcceptRepository extends Component {
    /**
    * @class AcceptRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.repo = null;
        this.state = {
            languages: ['Java', 'Go'],
            licenseNames: [],
            repositoryTypes: [],
            organizations: [],
            teams: [],
            validateRepository: '',
            buttonState: false,
            repositoryId: props.location.query.repositoryId,// eslint-disable-line
            repositoryDetails: null,
            repositoryIsAcceptOrReject: null,
            groupIdInputRequired: false,
            groupIdInputSpan: '',
            displayFieldset: 'block',
            displayAlrearyAccept: 'none',
            displayErrorBox: 'none',
            displaySuceessBox: 'none',
            isAdminUser: null,
        };
        this.validateInputRepositoryName = this.validateInputRepositoryName.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.makeGroupIdRequired = this.makeGroupIdRequired.bind(this);
    }
    /**
    * @class RequestRepository
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        Organization.getAllOrganizations().then((response) => {
            console.log(response);// eslint-disable-line
            this.setState(() => {
                return {
                    organizations: response,
                };
            });
            this.setTeams();
        });
        RepositoryType.getAllRepositoryTypes().then((response) => {
            this.setState(() => {
                return {
                    repositoryTypes: response,
                };
            });
        });
        Common.getAllLanguages().then((response) => {
            this.setState(() => {
                return {
                    languages: response,
                };
            });
        });
        License.getAllLicenseNames().then((response) => {
            this.setState(() => {
                return {
                    licenseNames: response,
                };
            });
        });
        Repository.selectDataFromId(this.state.repositoryId).then((response) => {
            this.setState(() => {
                if ((response[0].REPOSITORY_ACCEPTED_BY === null) && (response[0].REPOSITORY_DEACTIVATED_BY === null)) {
                    return {
                        repositoryIsAcceptOrReject: false,
                        repositoryDetails: response[0],
                        groupIdInputRequired: response[0].REPOSITORY_NEXUS,
                        groupIdInputSpan: ((response[0].REPOSITORY_NEXUS) ? <span className="required">*</span> : ''),
                    };
                } else {
                    return {
                        repositoryIsAcceptOrReject: true,
                        displayFieldset: 'none',
                        displayAlrearyAccept: 'block',
                        repositoryDetails: response[0],
                    };
                }
            });
            this.inputRepositoryName.value = response[0].REPOSITORY_NAME;
            this.inputGroupId.value = response[0].REPOSITORY_GROUPID;
            this.inputBuildable.value = response[0].REPOSITORY_BUILDABLE;
            this.inputPrivate.value = response[0].REPOSITORY_PRIVATE;
            this.textDescription.value = StringValidations.setStringToShow(response[0].REPOSITORY_DESCRIPTION);
        });
        ValidateUser.getUserDetails().then((response) => {
            this.setState(() => {
                return {
                    userDetails: response,
                };
            });
        });
    }
    /**
    * set teams after selecting organization
    */
    setTeams() {
        const options = this.selectOrganization.options;
        const selectOrganization = options[options.selectedIndex].text;
        Team.getAllTeams(selectOrganization).then((response) => {
            this.setState(() => {
                return {
                    teams: response,
                };
            });
        });
    }
    /**
    * validation function for input repository name
    * @param {e} e e
    */
    validateInputRepositoryName(e) {
        const inputRepositoryName = e.target.value;
        Repository.selectDataFromName(inputRepositoryName).then((response) => {
            if (response.length > 0) {
                this.setState(() => {
                    return {
                        validateRepository: 'Sorry! This repository name already exists!',
                        buttonState: true,
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        validateRepository: ' ',
                        buttonState: false,
                    };
                });
            }
        });
    }
    /**
    * make group id required
    */
    makeGroupIdRequired() {
        const checkedValue = this.inputNexus.checked;
        if (checkedValue === true) {
            this.setState(() => {
                return {
                    groupIdInputRequired: true,
                    groupIdInputSpan: <span className="required">*</span>,
                };
            });
        } else {
            this.setState(() => {
                return {
                    groupIdInputRequired: false,
                    groupIdInputSpan: ' ',
                };
            });
        }
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
    * showErrorBox
    */
    showErrorBox() {
        this.setState(() => {
            return {
                showErrorBox: 'block',
            };
        });
    }
    /**
    * @param {any} e event
    * accept
    * @returns {Promise} promise
    */
    acceptRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (confirm('Are you sure to accept this repository request') === false) {// eslint-disable-line
            return false;
        }
        this.setState(() => {
            return {
                displayFieldset: 'none',
                displayLoader: 'block',
            };
        });
        const repoId = this.state.repositoryDetails.REPOSITORY_ID;
        const taskId = this.state.repositoryDetails.REPOSITORY_BPMN_TASK_ID;
        const repositoryName = StringValidations.escapeCharacters(this.inputRepositoryName.value.toString());
        const repositoryType = this.selectRepositoryType.value;
        const organization = this.selectOrganization.value;
        const team = this.selectTeam.value;
        const license = this.selectLicense.value;
        const language = StringValidations.escapeCharacters(this.selectLanguage.value);
        const groupId = StringValidations.escapeCharacters(this.inputGroupId.value.toString());
        const buildable = this.inputBuildable.checked;
        const nexus = this.inputNexus.checked;
        const isPrivate = this.inputPrivate.checked;
        const description = StringValidations.escapeCharacters(this.textDescription.value.toString());
        const accept = true;
        const acceptBy = StringValidations.escapeCharacters(this.state.userDetails.userEmail);

        const data = [
            repositoryName,
            language,
            buildable,
            nexus,
            isPrivate,
            description,
            groupId,
            license,
            team,
            organization,
            repositoryType,
            accept,
            acceptBy,
        ];
        try {
            GitHubRepositoryCreation.acceptRequest(data, repoId, taskId).then((response) => {
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
        } catch (err) {
            this.setState(() => {
                return {
                    displaySuceessBox: 'none',
                    displayFieldset: 'none',
                    displayErrorBox: 'block',
                };
            });
        }
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
                <h2 className="text-center">GitHub Repository Request</h2>
                <fieldset style={{ display: this.state.displayFieldset }}>
                    {/* eslint-disable max-len */}
                    <br />
                    <div className="form-group">
                        <label htmlFor="inputRepositoryName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Name</label>
                        <div className="col-lg-10">
                            <input
                                onChange={this.validateInputRepositoryName}
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputRepositoryName = c; }}
                                id="inputRepositoryName"
                                placeholder="carbon-identity-framework"
                            />
                            <span className="validate" id="validateInputRepositoryName">
                                {this.state.validateRepository}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectRepositoryType" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Type</label>
                        <div className="col-lg-10">
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectRepositoryType = c; }} >
                                {this.state.repositoryTypes.map(repositoryType =>
                                    ((this.state.repositoryDetails !== null) && (repositoryType.REPOSITORYTYPE_ID === this.state.repositoryDetails.REPOSITORY_TYPE)) ?
                                        <option key={repositoryType.REPOSITORYTYPE_ID} selected value={repositoryType.REPOSITORYTYPE_ID}>{repositoryType.REPOSITORYTYPE_NAME}</option> :
                                        <option key={repositoryType.REPOSITORYTYPE_ID} value={repositoryType.REPOSITORYTYPE_ID}>{repositoryType.REPOSITORYTYPE_NAME}</option>
                                )}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="selectOrganization"
                            className="col-lg-2 control-label"
                        >
                            <span className="required">*</span>
                            &nbsp;Organization
                        </label>
                        <div className="col-lg-10" onChange={this.setTeams}>
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectOrganization = c; }} >
                                {this.state.organizations.map(organization =>
                                    ((this.state.repositoryDetails !== null) && (organization.ORGANIZATION_ID === this.state.repositoryDetails.REPOSITORY_ORGANIZATION)) ?
                                        <option key={organization.ORGANIZATION_ID} selected value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option> :
                                        <option key={organization.ORGANIZATION_ID} value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option>)}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="selectTeam"
                            className="col-lg-2 control-label"
                        >
                            <span className="required">*</span>
                            &nbsp;Team Name
                        </label>
                        <div className="col-lg-10">
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectTeam = c; }} >
                                {this.state.teams.map(team =>
                                    ((this.state.repositoryDetails !== null) && (team.id === this.state.repositoryDetails.REPOSITORY_TEAM)) ?
                                        <option key={team.name} selected value={team.id} >{team.name}</option> :
                                        <option key={team.name} value={team.id} >{team.name}</option>)}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLicense" className="col-lg-2 control-label">&nbsp;License</label>
                        <div className="col-lg-10">
                            <select className="form-control" ref={(c) => { this.selectLicense = c; }}>
                                {/* eslint-disable */}
                                {this.state.licenseNames.map(license =>
                                    ((this.state.repositoryDetails !== null) && (license.LICENSE_ID === this.state.repositoryDetails.REPOSITORY_LICENSE)) ?
                                        <option key={license.LICENSE_ID} selected value={license.LICENSE_ID}>{license.LICENSE_NAME}</option> :
                                        <option key={license.LICENSE_ID} value={license.LICENSE_ID}>{license.LICENSE_NAME}</option>)}
                                {/* eslint-enable */}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLanguage" className="col-lg-2 control-label">Language</label>
                        <div className="col-lg-10">
                            <select className="form-control" ref={(c) => { this.selectLanguage = c; }} >
                                {/* eslint-disable */}
                                {this.state.languages.map((language, i) =>
                                    ((this.state.repositoryDetails !== null) && (language === this.state.repositoryDetails.REPOSITORY_LANGUAGE)) ?
                                        <option key={i} selected value={language}>{language}</option>:
                                        <option key={i}  value={language}>{language}</option>)}
                                {/* eslint-enable */}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <label htmlFor="inputLanguage" className="col-lg-2 control-label">Configurations</label>
                        <div className="col-lg-10">
                            <div className="checkbox">
                                <label htmlFor="checkBuildable">
                                    {((this.state.repositoryDetails !== null)) ? <input type="checkbox" ref={(c) => { this.inputBuildable = c; }} defaultChecked={this.state.repositoryDetails.REPOSITORY_BUILDABLE} /> : ' '}
                                    Component Buildable
                                </label>
                                <br /><br />
                                <label htmlFor="checkPrivate">
                                    {((this.state.repositoryDetails !== null)) ? <input type="checkbox" ref={(c) => { this.inputPrivate = c; }} defaultChecked={this.state.repositoryDetails.REPOSITORY_PRIVATE} /> : <input type="checkbox" ref={(c) => { this.inputPrivate = c; }} /> }
                                    Make Private Repository
                                </label>
                                <br /><br />
                                <label htmlFor="checkNexus">
                                    {((this.state.repositoryDetails !== null)) ? <input onChange={this.makeGroupIdRequired} type="checkbox" ref={(c) => { this.inputNexus = c; }} defaultChecked={this.state.repositoryDetails.REPOSITORY_NEXUS} /> : ' '}
                                    Create Nexus Repository
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputGroupId" className="col-lg-2 control-label">{this.state.groupIdInputSpan}&nbsp;Group ID</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputGroupId = c; }}
                                placeholder="org.wso2.example"
                                required={this.state.groupIdInputRequired}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textDescription" className="col-lg-2 control-label">Description</label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Description for README"
                                ref={(c) => { this.textDescription = c; }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <Link to={'/app/rejectRepository?repositoryId=' + this.state.repositoryId}><button className="btn btn-danger">Reject</button></Link>
                            &nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn btn-info" id="form-horizontal" disabled={this.state.buttonState} >Accept</button>
                        </div>
                    </div>
                </fieldset>

                <div className="alert alert-dismissible alert-warning" style={{ display: this.state.displayAlrearyAccept }}>
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {/* eslint-disable */}
                    <strong>This repository request already {
                            (this.state.repositoryIsAcceptOrReject === true)?
                            ((this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY !== null)?
                            (" accepted by "+this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY):
                            (" rejected by "+this.state.repositoryDetails.REPOSITORY_DEACTIVATED_BY+" because of " +this.state.repositoryDetails.REPOSITORY_DEACTIVATED_REASON)):
                            this.showErrorBox.bind(this)
                        }
                    </strong> 
                    {/* eslint-enable */}
                </div>

                <div className="modal" style={{ display: this.state.displaySuceessBox }}>
                    {/* eslint-disable max-len */}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Succesfull</h4>
                            </div>
                            <div className="modal-body">
                                <p><span><i className="fa fa-check" aria-hidden="true" /></span>&nbsp;Request successfully accepted</p>
                            </div>
                            <div className="modal-footer">
                                <Link to={'/'}><button type="button" className="btn btn-default" data-dismiss="modal">Back to main page</button>&nbsp;&nbsp;</Link>
                                <Link to={'/app/waitingRequests'}><button type="button" className="btn btn-primary" data-dismiss="modal">Waiting Requests</button>&nbsp;&nbsp;</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" style={{ display: this.state.displayErrorBox }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Failed</h4>
                            </div>
                            <div className="modal-body">
                                <p><span><i className="fa fa-times" aria-hidden="true" /></span>&nbsp;Request acceptance fail</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.goBackToRequest} type="button" className="btn btn-default" data-dismiss="modal">Back</button>&nbsp;&nbsp;
                                <button onClick={this.acceptRequest}type="button" className="btn btn-success">Try again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default AcceptRepository;
