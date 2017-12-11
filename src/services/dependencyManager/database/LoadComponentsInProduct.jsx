import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadCompopnentsInProduct
* @extends {Component}
* @description Get Components in Product
*/
class LoadComponentsInProduct extends Component {
    /**
    * Load components of product
    */
    getProductComponents(pdName, pdVersion) {
        const url = Config.productComponent + pdName;
        return axios.get(url, {
            params: {
                productVersion: pdVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Product Components...' + error);
        });
    }
}

export default (new LoadComponentsInProduct());
