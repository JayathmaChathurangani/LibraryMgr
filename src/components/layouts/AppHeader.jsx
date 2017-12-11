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
class AppHeader extends Component {
    /**
    * constructor
    */
    constructor() {
        super();
        this.state = {
            pendingRequests: 0,
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
    * @param {String} requestBy requestBy
    */
    setPendingRequests(requestBy) {
        Repository.selectDataFromRequestBy(requestBy).then((response) => {
            this.setState(() => {
                return {
                    pendingRequests: response.length,
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
                            <li className="active"><Link to={'/app/pendingRequests'} id="pendingRequests">{(this.state.pendingRequests === 0) ? null : 'Pending Requests'} &nbsp;<span className="badge">{(this.state.pendingRequests === 0) ? null : this.state.pendingRequests }</span></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default AppHeader;
