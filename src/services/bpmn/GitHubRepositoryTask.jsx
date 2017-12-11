import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class GitHubRepositoryTask
* @extends {Component}
* @description GitHubRepositoryTask
*/
class GitHubRepositoryTask extends Component {
    /**
    * get task
    * @returns {Promise} promise
    */
    getTasks() {
        const url = MainData.bpmnTaskUrl;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        };
        return axios.get(url, headers).then((response) => {
            console.log(response);// eslint-disable-line
            return response.data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}


export default (new GitHubRepositoryTask());
