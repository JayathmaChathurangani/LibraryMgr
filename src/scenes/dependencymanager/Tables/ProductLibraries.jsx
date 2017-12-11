import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Redeye from 'material-ui/svg-icons/image/remove-red-eye';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/**
 * @class ProductLibraries
 * @extends {Component}
 * @description Sample React component
 */
class ProductLibraries extends Component {
    /**
     * @class ProductLibraries
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            overflowx: true,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
            tableData: [],
        };
    }
    componentWillReceiveProps(props) {
        this.setState({ tableData: props.libraryData });//eslint-disable-line
    }
    render() {
        return (
            <div>
                <Paper
                    zDepth={5}
                    style={{ overflow: 'auto' }}
                >
                    <div>
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                            bodyStyle={{ overflow: 'visible' }}
                        >
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn
                                        tooltip="The Library ID"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Library  ID
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Library Name"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Library  Name
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Group ID"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Group ID
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Artifact ID"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Artifact ID
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Library Type"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Library Type
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Current Version"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Current Version
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="The Latest Version"
                                        style={{ textAlign: 'left', fontSize: '24px' }}
                                    >
                                        Latest Version
                                    </TableHeaderColumn>
                                    {/* eslint-disable */}
                                    <TableHeaderColumn></TableHeaderColumn>
                                    {/* eslint-disable */}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                                displayRowCheckbox={false}
                            >
                                {this.state.tableData.map (
                                    (row, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{row.LIB_ID}</TableRowColumn>
                                            <TableRowColumn>{row.LIB_NAME}</TableRowColumn>
                                            <TableRowColumn>{row.LM_GROUP_ID}</TableRowColumn>
                                            <TableRowColumn>{row.LM_ARTIFACT_ID}</TableRowColumn>
                                            <TableRowColumn>{row.LIB_TYPE}</TableRowColumn>
                                            <TableRowColumn><Chip>{row.LIB_VERSION}</Chip></TableRowColumn>
                                            <TableRowColumn><Chip
                                                backgroundColor='#F50057'
                                            >
                                                Latest Version
                                            </Chip>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <RaisedButton
                                                    label="Dependency Heirarchy"
                                                    primary={true}//eslint-disable-line
                                                    labelPosition="before"
                                                    icon={<Redeye />}
                                                />
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default ProductLibraries;
