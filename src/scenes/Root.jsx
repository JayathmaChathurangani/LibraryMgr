import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from '../components/layouts/AppHeader';
import AdminHeader from '../components/layouts/AdminHeader';
import LeftNav from '../components/navs/LeftNav';
import AdminLeftNav from '../components/navs/AdminLeftNav';
import ValidateUser from '../services/authentication/ValidateUser';

/**
* @class UsRooter
* @extends {Component}
* @description Get user details
*/
class Root extends Component {
    /**
    * constructor
    * @param {any} props props
    */
    constructor(props) {
        super(props);
        this.state = {
            isAdminUser: null,
            isRepositoryAdmin: null,
            isLibraryAdmin: null,
            isValid: null,
            displayChildren: 'block',
            displayNav: 'block',
            displayHeader: 'block',
            userDetails: [{ isValid: false, userDetails: null }],
        };
    }
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        const adminPages = ['/app/acceptRepository', '/app/waitingRequests'];
        const adminPagesLibrary = ['/app/acceptLibrary'];
        const props = this.props;
        let i = 0;
        console.log("page ",props.location);//eslint-disable-line
        ValidateUser.isValidUser().then((response) => {
            if (response.isValid) {
                this.setState(() => {
                    return {
                        isValidUser: response.isValid,
                        isRepositoryAdmin: response.isRepositoryAdmin,
                        userDetails: response,
                    };
                });
            } else {
                hashHistory.push('/errorPage');
            }
            if (response.isRepositoryAdmin) {
                this.setState(() => {
                    return {
                        isAdminUser: true,
                    };
                });
            }
            console.log('user details', this.state.userDetails.libraryUserDetails);//eslint-disable-line
            for (i = 0; i < this.state.userDetails.libraryUserDetails.length; i++) {
                if (this.state.userDetails.libraryUserDetails[i].rolePermission === 'ADMIN') {
                    this.setState(() => {
                        return {
                            isAdminUser: true,
                            isLibraryAdmin: true,
                        };
                    });
                    break;
                }
            }
            console.log(props.location.pathname);//eslint-disable-line
            if (adminPages.indexOf(props.location.pathname) !== -1 && !this.state.isRepositoryAdmin) {
                hashHistory.push('/errorPage');
            } else if (adminPages.indexOf(props.location.pathname) !== -1 && this.state.isRepositoryAdmin) {
                this.setState(() => {
                    return {
                        displayChildren: 'block',
                        displayNav: 'block',
                        displayHeader: 'block',
                    };
                });
            }
            if (adminPagesLibrary.indexOf(props.location.pathname) !== -1 && !this.state.isLibraryAdmin) {
                hashHistory.push('/errorPage');
            } else if (adminPagesLibrary.indexOf(props.location.pathname) !== -1 && this.state.isLibraryAdmin) {
                this.setState(() => {
                    return {
                        displayChildren: 'block',
                        displayNav: 'block',
                        displayHeader: 'block',
                    };
                });
            }
        });
    }
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        const props = this.props;
        return (
            <MuiThemeProvider>
                <div className="container-fluid">
                    <div className="row" id="header">
                        <div className="col-md-12" style={{ display: this.state.displayHeader }} >
                            {/* eslint-disable max-len */}
                            {(this.state.isAdminUser === true) ? <AdminHeader userDetails={this.state.userDetails} /> : <AppHeader userDetails={this.state.userDetails} /> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2" id="leftNav" style={{ display: this.state.displayNav, paddingLeft: '0px' }}>
                            {(this.state.isAdminUser === true) ? <AdminLeftNav /> : <LeftNav /> }
                        </div>
                        <div className="col-md-10" style={{ display: this.state.displayChildren, height: '90vh', overflowY: 'auto', overflowX: 'hidden' }} >
                            {props.children}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Root;
