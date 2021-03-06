import React, { Component } from 'react';

/**
* @class ErrorPage
* @extends {Component}
* @description Get user details
*/
class ErrorPage extends Component {
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <div className="row">
                <div className="col-md-10" >
                    <br />
                    <div className="alert alert-dismissible alert-danger">
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login Error</h3>
                            </div>
                            <div className="panel-body" style={{ color: 'black' }}>
                                Invalid Login
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ErrorPage;
