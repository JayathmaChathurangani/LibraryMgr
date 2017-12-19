import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadProductLibraries
* @extends {Component}
* @description Get Libraries Used by given Product
*/
class LoadProductLibraries extends Component {
    /**
    * Load Libraries Used by given Product
    */
    getLibrariesOfProduct(pName, pVersion) {
        const url = Config.librariesofProduct + pName;
        return axios.get(url, {
            params: {
                prodVersion: pVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Libraies for given Component...' + error);
        });
    }
}

export default (new LoadProductLibraries());
