import React, { Component } from 'react';
import { Link } from 'react-router';
import Repository from '../../services/database/Repository';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import ValidateUser from '../../services/authentication/ValidateUser';

/**
 * @class RejectRepository
 * @extends {Component}
 * @description Sample React component
 */
class RejectRepository extends Component {
    /**
    * @class RejectRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.state = {
            repositoryId: props.location.query.repositoryId,// eslint-disable-line
            repositoryDetails: null,
            displayFieldset: 'block',
            displayAlrearyAccept: 'none',
            displayErrorBox: 'none',
            displaySuceessBox: 'none',
            userDetails: [],
        };
        this.rejectRequest = this.rejectRequest.bind(this);
    }
    /**
    * @class RejectRepository
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        Repository.selectDataFromId(this.state.repositoryId).then((response) => {
            this.setState(() => {
                if ((response[0].REPOSITORY_ACCEPTED_BY === null) && (response[0].REPOSITORY_DEACTIVATED_BY === null)) {
                    return {
                        displayFieldset: 'block',
                        displayAlrearyAccept: 'none',
                        displayErrorBox: 'none',
                        displaySuceessBox: 'none',
                        repositoryDetails: response[0],
                    };
                } else {
                    return {
                        displayFieldset: 'none',
                        displayAlrearyAccept: 'block',
                        displayErrorBox: 'none',
                        displaySuceessBox: 'none',
                        repositoryDetails: response[0],
                    };
                }
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
    * @param {any} e event
    * accept
    * @returns {Promise} promise
    */
    rejectRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (confirm("Are you sure to reject repository request?") === false ) {// eslint-disable-line
            return false;
        }
        this.setState(() => {
            return {
                displayFieldset: 'none',
                displayLoader: 'block',
            };
        });
        const reasonForRejecting = this.textReasonForRejecting.value.toString();
        const taskId = this.state.repositoryDetails.REPOSITORY_BPMN_TASK_ID;
        const repoId = this.state.repositoryDetails.REPOSITORY_ID;
        try {
            GitHubRepositoryCreation.rejectRequest(reasonForRejecting, repoId, taskId).then((response) => {
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
                    displayAlrearyAccept: 'none',
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
            <form className="form-horizontal" onSubmit={this.rejectRequest} >
                <h2 className="text-center">Request GitHub Repository Here</h2>
                <fieldset style={{ display: this.state.displayFieldset }} >
                    <br />
                    <div className="form-group">
                        <label
                            htmlFor="textReasonForRejecting"
                            className="col-lg-2 control-label"
                        >
                            Reason for rejecting :
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.textReasonForRejecting = c; }}
                                placeholder="Description for README"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="reset" className="btn btn-default">Cancel</button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn btn-danger">Reject</button>
                        </div>
                    </div>
                </fieldset>

                <div
                    className="alert alert-dismissible alert-warning"
                    style={{ display: this.state.displayAlrearyAccept }}
                >
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {/* eslint-disable */}
                    <strong>This repository request already {((this.state.repositoryDetails !== null))? ((this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY === null)?(' deactivated by ' + this.state.repositoryDetails.REPOSITORY_DEACTIVATED_BY + ' because of ' + this.state.repositoryDetails.REPOSITORY_DEACTIVATED_REASON):(' accepted by ' + this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY)):' '}</strong>
                    {/* eslint-enable */}
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
                                >
                                    &times;
                                </button>
                                <h4 className="modal-title">Succesfull</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span>
                                        <i className="fa fa-check" aria-hidden="true" />
                                    </span>
                                    &nbsp;Request successfully rejected
                                </p>
                            </div>
                            <div className="modal-footer">
                                <Link to={'/'}>
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        data-dismiss="modal"
                                    >
                                        Back to main page
                                    </button>
                                    &nbsp;&nbsp;
                                </Link>
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
                                >
                                    &times;
                                </button>
                                <h4 className="modal-title">Failed</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span>
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </span>
                                    &nbsp;Request acceptance fail
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Back
                                </button>&nbsp;&nbsp;
                                <button type="button" className="btn btn-success">Try again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default RejectRepository;
