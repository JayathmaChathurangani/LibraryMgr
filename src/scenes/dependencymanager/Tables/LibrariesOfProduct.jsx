import React from 'react';
import {
    PagingState,
    LocalPaging,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    VirtualTableView,
    TableHeaderRow,
    TableColumnResizing,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';
import Chip from 'material-ui/Chip';
import LibrariesOfProd
    from '../../../services/dependencyManager/database/LoadProductLibraries';

const columns = [
    { name: 'Count', title: '' },
    { name: 'LibraryName', title: 'The Library Name' },
    { name: 'LibraryType', title: 'The Library Type' },
    { name: 'LibraryVersion', title: 'The Current Version' },
    { name: 'LatestVersion', title: 'The Latest Version' },
    { name: 'ArtifactID', title: 'Artifact ID' },
    { name: 'GroupID', title: 'Group ID' },
];

export default class LibrariesOfProduct extends React.PureComponent {
    /**
     * @class LibrariesOfProduct
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            tRows: [],
            columnWidths: {
                Count: 50,
                LibraryName: 400,
                LibraryVersion: 200,
                LibraryType: 200,
                LatestVersion: 400,
                GroupID: 200,
                ArtifactID: 200,
            },
            expandedRows: [],
            prodName: '',
            prodVersion: '',
            numberOfRecords: 0,
        };
        this.loadTable = this.loadTable.bind(this);
    }
    componentWillReceiveProps(props) {
        if (props.renderCondition) {//eslint-disable-line
            this.setState({
                prodName: props.nameComp,//eslint-disable-line
                prodVersion: props.versionComp,//eslint-disable-line
                numberOfRecords: 0,
            });
            this.loadTable(props.nameComp, props.versionComp);
        }
    }
    /**
    * Load libraries of given Product
    */
    loadTable(pName, pVersion) {
        LibrariesOfProd.getLibrariesOfProduct(pName, pVersion).then((response) => {
            let i = 0;
            const array = [];
            if (response.Libraries.length > 0) {
                for (i; i < response.Libraries.length; i++) {
                    array[i] = {
                        Count: i + 1,
                        LibraryName: response.Libraries[i].LIB_NAME,
                        LibraryType: response.Libraries[i].LIB_TYPE,
                        LibraryVersion: response.Libraries[i].LIB_VERSION,
                        LatestVersion: response.Libraries[i].LATEST_VERSION,
                        GroupID: response.Libraries[i].ARTIFACT_ID,
                        ArtifactID: response.Libraries[i].GROUP_ID,
                    };
                }
            } else {
                array[0] = 'No results';
            }
            this.setState({ tRows: array, numberOfRecords: response.Libraries.length });
        });
    }
    render() {
        let returnView;
        if (this.props.renderCondition) {
            returnView = (
                <div>
                    {this.state.numberOfRecords > 0 ?
                        <div>
                            <Chip>
                                {this.state.numberOfRecords} results are returned
                            </Chip>
                            <Grid
                                rows={this.state.tRows}
                                columns={columns}
                            >
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={12}
                                />
                                <LocalPaging />
                                <VirtualTableView />
                                <TableColumnResizing defaultColumnWidths={this.state.columnWidths} />
                                <TableHeaderRow allowResizing />
                                <PagingPanel />
                            </Grid>
                        </div>
                        :
                        <Chip>
                            No Libraries Found
                        </Chip>
                    }
                </div>
            );
        }
        return (
            <div>
                {returnView}
            </div>
        );
    }
}
