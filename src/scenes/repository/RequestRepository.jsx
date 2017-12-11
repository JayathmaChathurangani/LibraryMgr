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
import ValidateUser from '../../services/authentication/ValidateUser';
import Repository from '../../services/database/Repository';
import Organization from '../../services/database/Organization';
import User from '../../services/database/User';
import RepositoryType from '../../services/database/RepositoryType';
import License from '../../services/database/License';
import Team from '../../services/github/Team';
import Common from '../../services/github/Common';
import StringValidations from '../../services/validations/StringValidations';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';

/**
 * @class RequestRepository
 * @extends {Component}
 * @description Sample React component
 */
class RequestRepository extends Component {
    /**
    * @class RequestRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.state = {
            mainUsers: [],
            languages: ['Java'],
            licenseNames: [],
            repositoryTypes: [],
            organizations: [],
            teams: [],
            validateRepository: ' ',
            buttonState: false,
            displayFieldset: 'block',
            displayLoader: 'none',
            displaySuceessBox: 'none',
            displayErrorBox: 'none',
            groupIdInputRequired: false,
            groupIdInputSpan: ' ',
            userDetails: [],
        };
        this.validateInputRepositoryName = this.validateInputRepositoryName.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
        this.makeGroupIdRequired = this.makeGroupIdRequired.bind(this);
        this.goBackToRequest = this.goBackToRequest.bind(this);
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
        User.getRepositoryMainUsers().then((response) => {
            this.setState(() => {
                return {
                    mainUsers: response,
                };
            });
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
        console.log('call');//eslint-disable-line
        this.setState(() => {
            return {
                displayFieldset: 'block',
                displayErrorBox: 'none',
                displaySuceessBox: 'none',
            };
        });
        console.log('call2');//eslint-disable-line
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
    submitRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (confirm("Are you sure to request it?") === false ) {// eslint-disable-line
            return false;
        }
        const repositoryTypeOptions = this.selectRepositoryType.options;
        const organizationOptions = this.selectOrganization.options;
        const teamOptions = this.selectTeam.options;
        const licenseOptions = this.selectLicense.options;
        const languageOptions = this.selectLanguage.options;
        const repositoryTypeText = repositoryTypeOptions[repositoryTypeOptions.selectedIndex].text;
        const organizationText = organizationOptions[organizationOptions.selectedIndex].text;
        const teamText = teamOptions[teamOptions.selectedIndex].text;
        const licenseText = licenseOptions[licenseOptions.selectedIndex].text;
        const languageText = languageOptions[languageOptions.selectedIndex].text;
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
        const requestedBy = StringValidations.escapeCharacters(this.state.userDetails.userEmail);

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
            requestedBy,
        ];
        const mailData = [
            repositoryName,
            languageText,
            buildable,
            nexus,
            isPrivate,
            description,
            groupId,
            licenseText,
            teamText,
            organizationText,
            repositoryTypeText,
            requestedBy,
        ];
        console.log(mailData);// eslint-disable-line
        console.log(data);// eslint-disable-line
        this.setState(() => {
            return {
                displayFieldset: 'none',
                displayLoader: 'block',
            };
        });
        GitHubRepositoryCreation.startProcess(data, mailData).then((response) => {
            console.log("response");//eslint-disable-line
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
            <form className="form-horizontal" onSubmit={this.submitRequest}>
                {/* eslint-disable max-len */}
                <h2 className="text-center">Request GitHub Repository Here</h2>
                <fieldset style={{ display: this.state.displayFieldset }}>
                    {/* eslint-disable max-len */}
                    <br />
                    <div className="form-group">
                        <label htmlFor="inputRepositoryName" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Repository Name
                        </label>
                        <div className="col-lg-10">
                            <input
                                onChange={this.validateInputRepositoryName}
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputRepositoryName = c; }}
                                placeholder="carbon-identity-framework"
                            />
                            <span className="validate" id="validateInputRepositoryName">
                                {this.state.validateRepository}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectRepositoryType" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Repository Type
                        </label>
                        <div className="col-lg-10" >
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectRepositoryType = c; }} >
                                {this.state.repositoryTypes.map(repositoryType =>
                                    (<option key={repositoryType.REPOSITORYTYPE_ID} value={repositoryType.REPOSITORYTYPE_ID}>
                                        {repositoryType.REPOSITORYTYPE_NAME}
                                    </option>))}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectOrganization" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Organization
                        </label>
                        <div className="col-lg-10" onChange={this.setTeams}>
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectOrganization = c; }} >
                                {this.state.organizations.map((organization)=>
                                <option key={organization.ORGANIZATION_ID}
                                value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}
                                </option>)}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectTeam" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Team Name
                        </label>
                        <div className="col-lg-10">
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectTeam = c; }} >
                                {this.state.teams.map((team,i)=> <option key={team.id} value={team.id} >{team.name}</option>)}
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
                                    <option key={license.LICENSE_ID} value={license.LICENSE_ID} data={license.LICENSE_NAME}>
                                    {license.LICENSE_NAME}
                                </option>)}
                                {/* eslint-enable */}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLanguage" className="col-lg-2 control-label">Language</label>
                        <div className="col-lg-10">
                            <select className="form-control" ref={(c) => { this.selectLanguage = c; }}>
                                {/* eslint-disable */}
                                {this.state.languages.map((language, i) => (language === 'Java')?<option key={i} selected value={language}>{language}</option> :<option key={i} value={language}>{language}</option>)}
                                {/* eslint-enable */}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <label htmlFor="inputLanguage" className="col-lg-2 control-label">Configurations</label>
                        <div className="col-lg-10">
                            <div className="checkbox">
                                <label htmlFor="inputBuildable">
                                    <input type="checkbox" ref={(c) => { this.inputBuildable = c; }} /> Component Buildable
                                </label>
                                <br /><br />
                                <label htmlFor="inputPrivate">
                                    <input type="checkbox" ref={(c) => { this.inputPrivate = c; }} /> Make Private Repository
                                </label>
                                <br /><br />
                                <label htmlFor="inputNexus">
                                    <input
                                        onChange={this.makeGroupIdRequired}
                                        type="checkbox"
                                        ref={(c) => { this.inputNexus = c; }}
                                    />Create Nexus Repository
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputGroupId" className="col-lg-2 control-label">
                            {this.state.groupIdInputSpan}&nbsp;Group ID
                        </label>
                        <div className="col-lg-10" >
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
                                ref={(c) => { this.textDescription = c; }}
                                placeholder="Description for README"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="reset" className="btn btn-default">Cancel</button>
                            &nbsp;
                            <button type="submit" id="submitButton" className="btn btn-info" data-loading-text="Loading ..." disabled={this.state.buttonState} >
                                Request
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
                                >
                                    Back
                                </button>
                                &nbsp;&nbsp;
                                <Link to={'/app/requestRepository'} >
                                    <button type="button" className="btn btn-success">
                                        New Request
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default RequestRepository;
