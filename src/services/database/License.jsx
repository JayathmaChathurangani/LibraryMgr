import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class License
* @extends {Component}
* @description Get license details
*/
class License extends Component {
    /**
    * get all license names
    * @returns {Promise} promise
    */
    getAllLicenseNames() {
        const url = MainData.ballerinaDatabaseURL + 'license/selectAll';
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new License());
