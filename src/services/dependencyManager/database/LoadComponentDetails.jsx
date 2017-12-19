import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadComponentDetails
* @extends {Component}
* @description Get Details of given Component
*/
class LoadComponentDetails extends Component {
    /**
    * Load Details of Component
    */
    getDetailsOfComponent(cName, cVersion) {
        const url = Config.compDetails + cName;
        return axios.get(url, {
            params: {
                compVersion: cVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Details for given Component...' + error);
        });
    }
}

export default (new LoadComponentDetails());
