import { Component } from 'react';
import axios from 'axios';
import Config from 'config';
/**
* @class RouterService
* @extends {Component}
* @description Get Latest Version or Dependency Heirarchy according to the request
*/
class RouterServiceVersion extends Component {
    /**
    * Get Get Latest Version according to the request
    */
    callRouterServiceForLatestVersion(rqGID, rqAID, libType, vsnReq) {
        let rqType;
        if (libType.search('jar') || libType.search('bundle')) {
            rqType = 'java';
        }
        const url = Config.routerService + rqType + '?VersionReq=' + vsnReq + '&GroupID=' + rqGID;
        const data = {
            groupID: rqGID,
            artifactID: rqAID,
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

export default (new RouterServiceVersion());
