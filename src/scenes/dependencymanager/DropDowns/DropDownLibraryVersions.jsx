import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LoadLibraryVersions from '../../../services/dependencyManager/database/LoadLibraryVersions';
import GetGroupIDArtifactID from '../../../services/dependencyManager/database/GetGroupIDArtifactID';
/**
* @class DropDownProductVersions
* @extends {Component}
* @description Get ProductVersions
*/
class DropDownLibraryVersions extends Component {
    /**
     * @class DropDownLibraryVersions
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '' };
        this.loadLibraryVersionsDropDown = this.loadLibraryVersionsDropDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(props) {
        if(props.loadDropDown){//eslint-disable-line
            this.loadLibraryVersionsDropDown(props.libraryName);//eslint-disable-line
        }
    }
    /**
    * Get Artifact ID and Group ID of the given Library
    */
    getGroupIDArtifactIDLib(lName, lVersion) {
        const update = this.props;
        GetGroupIDArtifactID.getGroupArtifactID(lName, lVersion).then((response) => {
            if (response.length > 0) {
                update.groupIDartifactID(
                    response[0].LM_GROUP_ID,
                    response[0].LM_ARTIFACT_ID,
                    response[0].LIB_TYPE);
            } else {
                update.groupIDartifactID(
                    'NotFound',
                    'NotFound',
                    'NotFound');
            }
        });
    }
    /**
    * Add the Menu items of the Library Version dropdown
    */
    loadLibraryVersionsDropDown(lbName) {
        LoadLibraryVersions.libraryVersionsDropdown(lbName).then((response) => {
            let i = 0;
            const array = [];
            if (response.length > 0) {
                for (i; i < response.length; i++) {
                    array.push(<MenuItem value={i} key={i} primaryText={response[i].LIB_VERSION} />);
                }
            } else {
                array[0] = 'Error in loading';
            }
            this.setState({ data: array });
        });
    }
    handleChange(event, index, value) {
        const update = this.props;
        this.setState({ value });
        update.setVersion(this.state.data[value].props.primaryText);
        this.getGroupIDArtifactIDLib(update.libraryName, this.state.data[value].props.primaryText);
    }
    render() {
        if (this.props.loadDropDown) {
            return (
                <div>
                    <SelectField
                        floatingLabelText="Select Version"
                        maxHeight={300}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.state.data}
                    </SelectField>
                </div>
            );
        } else {
            return (
                <div>
                    <SelectField
                        floatingLabelText="Select Version"
                        maxHeight={300}
                        value={this.state.value}
                        onChange={this.handleChange}
                        disabled={true}//eslint-disable-line
                    >
                        <MenuItem value={0} key={0} primaryText={'-Select-'} />
                    </SelectField>
                </div>
            );
        }
    }
}

export default DropDownLibraryVersions;
