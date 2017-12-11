import React, { Component } from 'react';
import Repository from '../../services/database/Repository';
import MainData from '../../services/MainData';
import ValidateUser from '../../services/authentication/ValidateUser';

/**
* @class PendingRequests
* @extends {Component}
* @description Get JWT
*/
class PendingRequests extends Component {
    /**
    * @class PendingRequests
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor() {
        super();
        this.state = {
            pendingRequests: [],
            userDetails: [],
        };
    }
    /**
    * @class PendingRequests
    * @extends {Component}
    * @description Sample React component
    */
    componentDidMount() {
        ValidateUser.getUserDetails().then((response) => {
            this.setState(() => {
                return {
                    userDetails: response,
                };
            });
            this.setPendingRequests(this.state.userDetails.userEmail);
        });
    }
    /**
    * validation function for input repository name
    * @param {String} requestBy requestBye
    */
    setPendingRequests(requestBy) {
        Repository.selectWaitingRequests(requestBy).then((response) => {
            this.setState(() => {
                return {
                    pendingRequests: response,
                };
            });
        });
    }
    /**
    * @class PendingRequests
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    {/* eslint-disable */}
                    {this.state.pendingRequests.map(request =>
                        <div className="row" key={request.REPOSITORY_ID}>
                            <div className="col-md-12" >
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{( request.REPOSITORY_NAME)}</h3>
                                    </div>
                                    <div className="panel-body" id="pendingRequestsPanelBody">
                                        <img
                                            id="pendingRequestsImage"
                                            alt=""
                                            src={MainData.bpmnImgURL + request.REPOSITORY_BPMN_PROCESS_ID + '/diagram'}
                                            className="img-responsive"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    {/* eslint-enable */}
                </div>
                <div className="row" />
            </div>
        );
    }
}

export default PendingRequests;
