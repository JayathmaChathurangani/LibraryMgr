import React, { Component } from 'react';
import { Link } from 'react-router';

/**
* @class UsRooter
* @extends {Component}
* @description Get user details
*/
class LeftNav extends Component {
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                {/* eslint-disable max-len */}
                <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
                        <span><i className="fa fa-files-o" /></span>
                          &nbsp;&nbsp;Repository&nbsp;&nbsp;
                        <span className="caret" />
                        <br />
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={'/app/requestRepository'} ><span><i className="fa fa-plus-square-o" aria-hidden="true" /></span>&nbsp;&nbsp;Request</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
                        <span><i className="fa fa-book" /></span>
                          &nbsp;&nbsp;License&nbsp;&nbsp;
                        <span className="caret" />
                        <br />
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={'/app/requestLibrary'} ><span><i className="fa fa-plus-square-o" aria-hidden="true" /></span>&nbsp;&nbsp;Request</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
                        <span><i className="fa fa-book" /></span>
                          &nbsp;&nbsp;Dependency&nbsp;&nbsp;
                        <span className="caret" />
                        <br />
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={'/app/ViewByProduct'} ><span><i className="fa fa-plus-square-o" aria-hidden="true" /></span>&nbsp;&nbsp;View By Product</Link></li>
                        <li><Link to={'/app/ViewByLibrary'} ><span><i className="fa fa-plus-square-o" aria-hidden="true" /></span>&nbsp;&nbsp;View By Library</Link></li>
                    </ul>
                </li>
            </ul>
        );
    }
}

export default LeftNav;
