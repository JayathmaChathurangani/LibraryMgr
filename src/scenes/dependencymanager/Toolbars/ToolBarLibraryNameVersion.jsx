import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Redeye from 'material-ui/svg-icons/image/remove-red-eye';
import Dialog from 'material-ui/Dialog';
import SortableTree from 'react-sortable-tree';
import RouterServiceVersion from '../../../services/dependencyManager/external/CallRouterServiceForVersion';
import RouterServiceTree from '../../../services/dependencyManager/external/CallRouterServiceForTree';

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
};
/**
* @class ToolBarLibraryNameVersion
* @extends {Component}
* @description Get ProductName&Version
*/
class ToolBarLibraryNameVersion extends Component {
    /**
     * @class ToolbaLibraryNameVersion
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            open: false,
            treeData: [],
            buttonDisable: true,
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            libLatestVersion: 'Make Selections' };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getLatestVersion = this.getLatestVersion.bind(this);
        this.getDependencyHeirarchy = this.getDependencyHeirarchy.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({
            libLatestVersion: 'NotFound',
            buttonDisable: true,
            searchString: '',
            treeData: [] });
        if(props.getLatestVersion & props.libGroupID !== null){//eslint-disable-line
            this.getLatestVersion(props.libGroupID, props.libArtifactID, props.librType);//eslint-disable-line
            this.getDependencyHeirarchy(props.libGroupID, props.libArtifactID, props.versionLibrary, props.librType);//eslint-disable-line   
        }
    }
    /**
    * Get Latest Version of the given Library
    */
    getLatestVersion(lbGroupID, lbArtifactID, lbType) {
        RouterServiceVersion.callRouterServiceForLatestVersion(lbGroupID, lbArtifactID, lbType, true)
            .then((response) => {
                const res = JSON.stringify(response);
                if (res.includes('NewestVersion', 0)) {
                    this.setState({
                        libLatestVersion: response.NewestVersion });
                } else {
                    this.setState({
                        libLatestVersion: 'NotFound' });
                }
            });
    }
    /**
    * Get Dependency Heirarchy
    */
    getDependencyHeirarchy(lbGroupID, lbArtifactID, lVersion, lbType) {
        RouterServiceTree.callRouterServiceForTree(lbGroupID, lbArtifactID, lVersion, lbType, false)
            .then((response) => {
                const res = JSON.stringify(response);
                if (res.includes('ErrorMsg', 0)) {
                    this.setState({
                        treeData: 'NotFound' });
                } else {
                    this.setState({
                        buttonDisable: false,
                        treeData: [response] });
                }
            });
    }
    handleOpen() {
        this.setState({
            open: true });
    }
    handleClose() {
        this.setState({
            open: false });
    }
    render() {
        const actions = [
            <RaisedButton
                label="Close"
                primary={true}//eslint-disable-line
                onClick={this.handleClose}
            />,
        ];
        const { searchString, searchFocusIndex, searchFoundCount } = this.state;
        // Case insensitive search of `node.title`
        const customSearchMethod = ({ node, searchQuery }) =>
            searchQuery &&
            node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        const selectPrevMatch = () =>
            this.setState({
                searchFocusIndex:
                    searchFocusIndex !== null ?
                        (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
                        :
                        searchFoundCount - 1,
            });
        const selectNextMatch = () =>
            this.setState({
                searchFocusIndex:
                    searchFocusIndex !== null
                        ? (searchFocusIndex + 1) % searchFoundCount
                        : 0,
            });
        return (
            <div>
                {/* eslint-disable */}
                <Toolbar style={{ backgroundColor: '#212121' }}>
                    <ToolbarGroup firstChild={false}>
                        <ToolbarTitle text="Library Type :" />
                        <Chip backgroundColor='#FF3D00'>{this.props.librType}</Chip>
                    </ToolbarGroup>
                    {this.props.getLatestVersion ?
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text="Latest Version :" />
                            <Chip backgroundColor='#F50057'>{this.state.libLatestVersion}</Chip>
                        </ToolbarGroup>
                        :
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text="Latest Version :" />
                            <Chip backgroundColor='#F50057'>Please make Selections</Chip>
                        </ToolbarGroup>
                    }
                    
                    <ToolbarGroup firstChild={true}>
                            <RaisedButton
                                label="Dependency Heirarchy"
                                primary={true}//eslint-disable-line
                                labelPosition="before"
                                icon={<Redeye />}
                                onClick={this.handleOpen}
                                disabled={this.state.buttonDisable}
                            />
                            <Dialog
                                  title="Dependency Heirarchy"
                                  actions={actions}
                                  modal={true}
                                  open={this.state.open}
                                  onRequestClose={this.handleClose}
                                  contentStyle={customContentStyle}
                                  autoScrollBodyContent={true}
                            >
                                Click (+) to View Transitive Dependencies if available
                                <div style={{ width: '100%', height: 2000, backgroundColor: '#FFFF8D', color: '#212121' }}>
                                    <div className="text-center" style={{ backgroundColor: '#CE93D8', color: '#212121' }}>
                                        <h4>Search Name/Version/Scope of a library</h4>
                                        <form
                                        style={{ display: 'inline-block' }}
                                        onSubmit={event => {
                                            event.preventDefault();
                                        }}
                                        >
                                            <input
                                                id="find-box"
                                                type="text"
                                                placeholder="Search..."
                                                style={{ fontSize: '1.8rem' }}
                                                value={searchString}
                                                onChange={event =>
                                                this.setState({ searchString: event.target.value })
                                                }
                                            />
                                            <button
                                                type="button"
                                                disabled={!searchFoundCount}
                                                onClick={selectPrevMatch}
                                            >
                                                &lt;
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!searchFoundCount}
                                                onClick={selectNextMatch}
                                            >
                                                &gt;
                                            </button>
                                            <span>
                                                &nbsp;
                                                {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                                                &nbsp;/&nbsp;
                                                {searchFoundCount || 0}
                                            </span>
                                        </form>
                                    </div>
                                    <SortableTree
                                        style={{ backgroundColor: '#FAFAF' }}
                                        canDrag={false}
                                        treeData={this.state.treeData}
                                        onChange={treeData => this.setState({ treeData })}
                                        searchMethod={customSearchMethod}
                                        searchQuery={searchString}
                                        searchFocusOffset={searchFocusIndex}
                                        searchFinishCallback={matches =>
                                            this.setState({
                                                searchFoundCount: matches.length,
                                                searchFocusIndex:
                                                matches.length > 0 ? searchFocusIndex % matches.length : 0,
                                            })
                                        }
                                    />
                                </div>
                            </Dialog>
                        </ToolbarGroup>
                </Toolbar>
                {/* eslint-enable */}
            </div>
        );
    }
}

export default ToolBarLibraryNameVersion;
