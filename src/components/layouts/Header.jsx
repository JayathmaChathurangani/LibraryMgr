import React, { Component } from 'react';
import ValidateUser from '../../services/authentication/ValidateUser';
import logo from '../../assets/images/logo-inverse.svg';

/**
* @class AppHeader
* @extends {Component}
* @description Get user details
*/
class Header extends Component {
    /**
    * constructor
    */
    constructor() {
        super();
        this.state = {
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
                </div>
            </nav>
        );
    }
}

export default Header;
