import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class Library
* @extends {Component}
* @description Get license details
*/
class LibraryRequest extends Component {
    /**
    * selectTypes
    * @param {int} id library id
    * @returns {Promise} promise
    */
    selectLibraryRequestFromId(id) {
        const url = MainData.ballerinaDatabaseURL + 'libraryRequest/selectFromId?id=' + id;
        return axios.get(url).then((response) => {
            return (response.data[0]);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new LibraryRequest());
