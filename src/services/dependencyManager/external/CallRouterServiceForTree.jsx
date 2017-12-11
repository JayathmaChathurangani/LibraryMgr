import { Component } from 'react';
import axios from 'axios';
import Config from 'config';
/**
* @class RouterService
* @extends {Component}
* @description Get Latest Version or Dependency Heirarchy according to the request
*/
class RouterServiceTree extends Component {
    /**
    * Get Get Dependency Heirarchy according to the request
    */
    callRouterServiceForTree(rqGID, rqAID, rqVersion, libType, vsnReq) {
        let rqType;
        if (libType.includes('bundle', 0) || libType.includes('jar', 0)) {
            rqType = 'java';
        }
        const url = Config.routerService + rqType + '?VersionReq=' + vsnReq + '&GroupID=' + rqGID;
        const data = {
            groupID: rqGID,
            artifactID: rqAID,
            version: rqVersion,
        };
        return axios.post(url, data).then((response) => {
            return (response.data);
        }).catch((error) => {
            let errResponse;
            if (error.response.status === 404) {
                errResponse = {
                    ErrorMsg: 'NotFound',
                };
            } else if (error.response.status === 500) {
                errResponse = {
                    ErrorMsg: 'Error',
                };
            } else {
                errResponse = {
                    ErrorMsg: 'Error',
                };
            }
            return (errResponse);
        });
    }
}

export default (new RouterServiceTree());
