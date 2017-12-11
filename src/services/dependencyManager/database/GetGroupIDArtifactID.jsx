import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class GetGroupIDArtifactID
* @extends {Component}
* @description Get Group and Atifact ID
*/
class GetGroupIDArtifactID extends Component {
    /**
    * get Group ID and Artifact ID
    */
    getGroupArtifactID(rqName, rqVersion) {
        const url = Config.libraryGroupIDArtifactID + rqName;
        return axios.get(url, {
            params: {
                reqVersion: rqVersion,
            },
        }).then((response) => {
            return (response.data);
        }).catch((error) => {
            console.log('Error in loading Library Versions...' + error);
        });
    }
}

export default (new GetGroupIDArtifactID());
