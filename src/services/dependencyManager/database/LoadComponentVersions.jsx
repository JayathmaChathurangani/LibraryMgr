import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class LoadComponentVersion
* @extends {Component}
* @description Get ComponentVersions
*/
class LoadComponentVersions extends Component {
    /**
    * Load versions of the Components
    */
    componentVersionsDropdown(cmName) {
        const url = Config.componentVersion + cmName;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Component Versions...' + error);
        });
    }
}

export default (new LoadComponentVersions());
