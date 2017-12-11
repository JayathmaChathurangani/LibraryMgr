import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadCompopnentsInProduct
* @extends {Component}
* @description Get Components in Product
*/
class LoadLibrariesInProduct extends Component {
    /**
    * Load Libraries of product
    */
    getProductLibraries(pdName, pdVersion) {
        const url = Config.productLibrary + pdName;
        return axios.get(url, {
            params: {
                productVersion: pdVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Libraries in product...' + error);
        });
    }
}

export default (new LoadLibrariesInProduct());
