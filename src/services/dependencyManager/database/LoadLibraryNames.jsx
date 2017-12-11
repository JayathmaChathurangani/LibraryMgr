import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LibraryNames
* @extends {Component}
* @description Get LibraryNames
*/
class LoadLibraryNames extends Component {
    /**
    * Load names of the libraries
    */
    selectLibraryNamesfortheDropdown() {
        const url = Config.libraryNameDropDown;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Library names...' + error);
        });
    }
}

export default (new LoadLibraryNames());
