import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class ProductNames
* @extends {Component}
* @description Get ProductNames
*/
class LoadProductNames extends Component {
    /**
    * Load names of the Products
    */
    selectProductNamesfortheDropdown() {
        const url = Config.productNameDropDown;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Product names...' + error);
        });
    }
}

export default (new LoadProductNames());
