import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadProductsAndCompNames
* @extends {Component}
* @description Get ProductsAndCompNames
*/
class LoadProductsAndCompNames extends Component {
    /**
    * Load names of the components and Products
    */
    selectNamesfortheDropdown() {
        const url = Config.productCompNames;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading names...' + error);
        });
    }
}

export default (new LoadProductsAndCompNames());
