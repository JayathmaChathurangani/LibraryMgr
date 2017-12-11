

import { Component } from 'react';

/**
 * @class MainData
 * @extends {Component}
 * @description Sample React component
 */
class MainData extends Component {
    /**
    * @class MainData
    * @extends {Component}
    * @description Sample React component
    */
    constructor() {
        super();
        this.ballerinaDatabaseURL = 'https://localhost:9090/databaseService/';
        this.ballerinaGitHubURL = 'https://localhost:9090/';
        this.ballerinaURL = 'https://localhost:9090/';
        this.bpmnStartURL = 'https://admin:admin@localhost:9445/bpmn/runtime/process-instances/';
        this.bpmnImgURL = 'https://localhost:9445/bpmn/runtime/process-instances/';
        this.bpmnTaskUrl = 'https://admin:admin@localhost:9445/bpmn/runtime/tasks/';
    }
}

export default (new MainData());
