import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadProductsUsingLibrary
* @extends {Component}
* @description Get Products Using given Library
*/
class LoadProductsUsingLibrary extends Component {
    /**
    * Load products using given library
    */
    getProductsAndComponentsUsingLibrary(lName, lVersion) {
        const url = Config.productsComponentsUsingLibrary + lName;
        return axios.get(url, {
            params: {
                libraryVersion: lVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Products for given Library...' + error);
        });
    }
}

export default (new LoadProductsUsingLibrary());
