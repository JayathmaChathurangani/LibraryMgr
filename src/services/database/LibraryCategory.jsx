import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class Library
* @extends {Component}
* @description Get license details
*/
class LibraryCategory extends Component {
    /**
    * selectTypes
    * @returns {Promise} promise
    */
    selectAll() {
        const url = MainData.ballerinaDatabaseURL + 'libCategory/selectAll';
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new LibraryCategory());
