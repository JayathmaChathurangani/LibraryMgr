import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class GitHubRepositoryTask
* @extends {Component}
* @description GitHubRepositoryTask
*/
class LibraryProcess extends Component {
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
    /**
    * escape charachters
    * @param {String} requestData requestData
    * @returns {String} str
    */
    startProcess(requestData) {
        const url = MainData.ballerinaURL + 'bpmn/library/request';
        return axios.post(url, requestData).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * escape charachters
    * @param {int} libRequestId libraryrequest id
    * @returns {String} str
    */
    acceptRequest(libRequestId) {
        const url = MainData.ballerinaURL + 'bpmn/library/accept';
        const data = {
            libraryRequestId: libRequestId,
        };
        return axios.post(url, data).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * escape charachters
    * @param {int} libRequestId libraryrequest id
    * @param {string} reason reason fro rejection
    * @returns {String} str
    */
    rejectRequest(libRequestId, reason) {
        const url = MainData.ballerinaURL + 'bpmn/library/reject';
        const data = {
            libraryRequestId: libRequestId,
            libraryRejectReason: reason,
        };
        return axios.post(url, data).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new LibraryProcess());
