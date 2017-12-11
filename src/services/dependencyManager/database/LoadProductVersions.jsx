import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadProductVersion
* @extends {Component}
* @description Get ProductVersions
*/
class LoadProductVersions extends Component {
    /**
    * Load versions of the products
    */
    productVersionsDropdown(prName) {
        const url = Config.productVersion + prName;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Product Versions...' + error);
        });
    }
}

export default (new LoadProductVersions());
