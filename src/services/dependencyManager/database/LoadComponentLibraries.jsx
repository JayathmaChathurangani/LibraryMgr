import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadComponentLibraries
* @extends {Component}
* @description Get Libraries Used by given Component
*/
class LoadComponentLibraries extends Component {
    /**
    * Load Libraries Used by given Component
    */
    getLibrariesOfComponent(cName, cVersion) {
        const url = Config.librariesofComponent + cName;
        return axios.get(url, {
            params: {
                compVersion: cVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Libraies for given Component...' + error);
        });
    }
}

export default (new LoadComponentLibraries());
