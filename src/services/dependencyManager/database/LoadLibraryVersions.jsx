import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadLibraryVersion
* @extends {Component}
* @description Get LibraryVersions
*/
class LoadLibraryVersions extends Component {
    /**
    * Load versions of the libraries
    */
    libraryVersionsDropdown(libraryName) {
        const url = Config.libraryVersion + libraryName;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Library Versions...' + error);
        });
    }
}

export default (new LoadLibraryVersions());
