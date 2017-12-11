import React, { Component } from 'react';
import { Link } from 'react-router';
import Repository from '../../services/database/Repository';

/**
* @class WaitingRequests
* @extends {Component}
* @description Get user details
*/
class WaitingRequests extends Component {
    /**
    * @class WaitingRequests
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor() {
        super();
        this.state = {
            waitingRequests: [],
        };
    }
    /**
    * @class WaitingRequests
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        Repository.selectWaitingRequests().then((response) => {
            this.setState(() => {
                return {
                    waitingRequests: response,
                };
            });
        });
    }
    /**
    * @class WaitingRequests
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <div className="container-fluid">
                <br />
                {/* eslint-disable */}
                {this.state.waitingRequests.map(request =>
                    <Link to={'/root/acceptRepository?repositoryId=' + request.REPOSITORY_ID} key={(request.REPOSITORY_ID)}>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="panel panel-info" >
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{(request.REPOSITORY_NAME)}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <p>
                                            <strong>Repository Type :&nbsp;</strong>{ (request.REPOSITORYTYPE_NAME) }<br />
                                            <strong>Organization :&nbsp;</strong>{(request.ORGANIZATION_NAME)}<br />
                                            <strong>License :&nbsp;</strong>{(request.LICENSE_NAME)}<br />
                                            <strong>Nexus :&nbsp;</strong>{(request.REPOSITORY_NEXUS) ? 'Yes' : 'No'}<br />
                                            <strong>Jenkins :&nbsp;</strong>{(request.REPOSITORY_BUILDABLE) ? 'Yes' : 'No'}<br />
                                            <strong>Requested By :&nbsp;</strong>{(request.REPOSITORY_REQUEST_BY)}<br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
                {/* eslint-enable */}
            </div>
        );
    }
}

export default WaitingRequests;
