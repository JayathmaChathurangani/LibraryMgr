import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import LibraryProcess from '../../services/bpmn/LibraryProcess';
import LibraryRequest from '../../services/database/LibraryRequest';
import ValidateUser from '../../services/authentication/ValidateUser';
import StringValidations from '../../services/validations/StringValidations';
import Alert from '../common/Alert';

/**
 * @class RejectRepository
 * @extends {Component}
 * @description Sample React component
 */
class RejectLibrary extends Component {
    /**
    * @class RejectRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.state = {
            libraryId: props.location.query.libRequestId,// eslint-disable-line
            libraryRequestDetails: null,
            displayFieldset: 'block',
            displayAlrearyAccept: 'none',
            displayAlrearyAcceptMessage: '',
            displayErrorBox: 'none',
            displaySuceessBox: 'none',
        };
        this.rejectRequest = this.rejectRequest.bind(this);
    }
    /**
    * @class RejectRepository
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
            }
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
        const reasonForRejecting = StringValidations.escapeCharacters(this.textReasonForRejecting.value.toString());
        LibraryProcess.rejectRequest(this.state.libraryId, reasonForRejecting).then((response) => {
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
            <form className="form-horizontal" onSubmit={this.rejectRequest} >
                <h2 className="text-center">Reject Library Request</h2>
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

                <Alert message={this.state.displayAlrearyMessage} display={this.state.displayAlrearyAccept} />

            </form>
        );
    }
}

export default RejectLibrary;
