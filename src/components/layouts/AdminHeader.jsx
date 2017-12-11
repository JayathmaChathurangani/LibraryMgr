import React, { Component } from 'react';
import { Link } from 'react-router';
import Repository from '../../services/database/Repository';
import ValidateUser from '../../services/authentication/ValidateUser';
import logo from '../../assets/images/logo-inverse.svg';

/**
* @class AppHeader
* @extends {Component}
* @description Get user details
*/
class AdminHeader extends Component {
    /**
    * constructor
    */
    constructor() {
        super();
        this.state = {
            waitingRequests: 0,
            userDetails: [],
        };
    }
    /**
    * @class AppHeader
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        ValidateUser.isValidUser().then((response) => {
            this.setState(() => {
                return {
                    userDetails: response,
                };
            });
            this.setPendingRequests(response.userEmail);
        });
    }
    /**
    * setPendingRequests
    */
    setPendingRequests() {
        Repository.selectWaitingRequests().then((response) => {
            this.setState(() => {
                return {
                    waitingRequests: response.length,
                };
            });
        });
    }
    /**
    * @class AppHeader
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <nav className="navbar navbar-default">
                {/* eslint-disable max-len */}
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img id="logo" src={logo} alt="wso2" /><strong style={{ color: 'white', fontSize: '25px', marginTop: '2px' }}>License and Repository Manager</strong>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav" />
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to={'/app/waitingRequests'} id="pendingRequests">{(this.state.waitingRequests === 0) ? null : 'Waiting Requests'} &nbsp;<span className="badge">{(this.state.waitingRequests === 0) ? null : this.state.waitingRequests }</span></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default AdminHeader;
