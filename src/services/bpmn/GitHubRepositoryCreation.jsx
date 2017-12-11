import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class GitHubRepositoryTask
* @extends {Component}
* @description GitHubRepositoryTask
*/
class GitHubRepositoryCreation extends Component {
    /**
    * escape charachters
    * @param {String} requestData requestData
    * @param {String} mailData mailData
    * @returns {String} str
    */
    startProcess(requestData, mailData) {
        const url = MainData.ballerinaURL + 'bpmn/repository/request';
        const data = {
            repositoryData: requestData,
            repositoryMailData: mailData,
        };
        return axios.post(url, data).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * completeUserTask
    * @param {String} bpmnTaskId bpmnTaskId
    * @param {String} variablesArray variablesArray
    * @returns {Promise} promise
    */
    completeUserTask(bpmnTaskId, variablesArray) {
        const url = MainData.bpmnTaskUrl + bpmnTaskId;
        const data = {
            action: 'complete',
            variables: variablesArray,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        return axios.post(url, data, headers).then((response) => {
            return (response);
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * acceptUserTask
    * @param {JSON} updateData data
    * @param {String} repoId repositoryId
    * @param {String} taskId bpmnTaskId
    * @returns {Promise} promise
    */
    acceptRequest(updateData, repoId, taskId) {
        const url = MainData.ballerinaURL + 'bpmn/repository/accept';
        const data = {
            repositoryData: updateData,
            repositoryId: repoId,
            repositoryTaskId: taskId,
        };
        return axios.post(url, data).then((response) => {
            return (response);
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * acceptUserTask
    * @param {String} reasonForRejecting rejereasonForRejectingctBy
    * @param {String} repoId repositoryId
    * @param {String} taskId taskId
    * @returns {Promise} promise
    */
    rejectRequest(reasonForRejecting, repoId, taskId) {
        const url = MainData.ballerinaURL + 'bpmn/repository/reject';
        const data = {
            repositoryRejectReason: reasonForRejecting,
            repositoryId: repoId,
            repositoryTaskId: taskId,
        };
        return axios.post(url, data).then((response) => {
            return (response);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GitHubRepositoryCreation());
