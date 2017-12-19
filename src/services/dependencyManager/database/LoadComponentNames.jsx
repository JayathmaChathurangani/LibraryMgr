import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class ComponentNames
* @extends {Component}
* @description Get ComponentNames
*/
class LoadComponentNames extends Component {
    /**
    * Load names of the Components
    */
    selectComponentNamesfortheDropdown() {
        const url = Config.componentNameDropDown;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Component names...' + error);
        });
    }
}

export default (new LoadComponentNames());
