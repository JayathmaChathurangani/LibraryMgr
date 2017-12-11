import { Component } from 'react';
import axios from 'axios';
import Token from './Token';
import MainData from '../MainData';

/**
* @class ValidateUser
* @extends {Component}
* @description validate user details
*/
class ValidateUser extends Component {
    /**
    * get valid user details
    * @returns {Promise} promise
    */
    getUserDetails() {
        const url = MainData.ballerinaURL + 'authentication/getUserDetails';
        const headersData = {
            headers: { 'Access-Control-Allow-Origin': '*' },
        };
        return axios.get(url, headersData).then((response) => {
            return response.data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * check valid users
    * @returns {Promise} promise
    */
    isValidUser() {
        const userToken = Token.getToken();
        const url = MainData.ballerinaURL + 'authentication/isValidUser';
        const requestData = {
            token: userToken,
        };
        const headersData = { 'Access-Control-Allow-Origin': '*' };
        return axios.post(url, requestData, headersData).then((response) => {
            console.log(response);//eslint-disable-line
            return response.data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new ValidateUser());
