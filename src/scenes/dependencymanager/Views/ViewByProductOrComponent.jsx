import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import { Card, CardTitle } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import LoadNames from '../../../services/dependencyManager/database/LoadProductAndCompNames';
import DropDownProductComponentVersions from '../DropDowns/DropDownProductOrLibraryVersions';
import ToolbarProductNameVersion from '../Toolbars/ToolBarProductNameVersion';
import ToolbarComponent from '../Toolbars/ToolBarComponentNameVersion';
import TableComponentLibraries from '../Tables/LibrariesOfComponent';
import TableProductLibraries from '../Tables/LibrariesOfProduct';
import LoadingScreen from '../Common/LoadingScreen';

const array = [];
/**
 * @class ViewByProductOrComponent
 * @extends {Component}
 * @description Sample React component
 */
export default class ViewByProductOrComponent extends Component {
/**
 * @class ViewByProductOrComponent
 * @extends {Component}
 * @param {any} props props for constructor
 * @description Sample React component
 */
    constructor(props) {
        super(props);
        this.state = { data: [],
            searchText: '',
            productArrayLength: '',
            totalArrayLength: '',
            typeSelected: '',
            isNameSelected: '',
            loadUI: false,
            type: '',
            dataD: [],
            name: 'Make Selections',
            version: 'Make Selections',
            loadV: false,
            tableRender: false };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.setName = this.setName.bind(this);
    }
    /**
     * load product Names in the drop down list
     */
    componentDidMount() {
        this.loadNameDropDown();
    }
    /**
    * @param {string} searchTxt
    * accept
    */
    handleUpdateInput(searchTxt) {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            searchText: searchTxt, //eslint-disable-line
            version: 'No Version is Selected',//eslint-disable-line
            tableRender: false,
            loadV: false,
            isNameSelected: false,
            typeSelected: '',
        });   //eslint-disable-line  
    }
    /**
    * set Product Name
    */
    setName(key,value) {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            name: this.state.searchText, //eslint-disable-line
            version: 'No Version is Selected',//eslint-disable-line
            tableRender: false,
            loadV: true,
        });   //eslint-disable-line
        const number = value;
        if (number >= this.state.productArrayLength) {
            this.setState({ typeSelected: 'Component', isNameSelected: 'true' });
        } else {
            this.setState({ typeSelected: 'Product', isNameSelected: 'true' });
        }
    }
    /**
    * set Product Version
    */
    setVersion(version) {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            version: version,//eslint-disable-line
            tableRender: true,
            loadV: true,
        });   //eslint-disable-line
    }
    /**
    * Load the Product items of the dropdown
    */
    loadNameDropDown() {
        LoadNames.selectNamesfortheDropdown().then((response) => {
            let i = 0;
            if (response.products.length > 0) {
                for (i; i < response.products.length; i++) {
                    array[i] = {
                        text: response.products[i].NAME,
                        value: (
                            <MenuItem
                                primaryText={response.products[i].NAME}
                                secondaryText="(Product)"
                            />
                        ),
                    };
                }
                this.setState({
                    productArrayLength: response.products.length,
                    loadUI: true,
                });
            }
            if (response.components.length > 0) {
                const totalLength = response.products.length + response.components.length;
                let arrayNum = 0;
                for (i; i < totalLength; i++) {
                    array[i] = {
                        text: response.components[arrayNum].NAME,
                        value: (
                            <MenuItem
                                primaryText={response.components[arrayNum].NAME}
                                secondaryText="(Component)"
                            />
                        ),
                    };
                    arrayNum++;
                }
                this.setState({ totalArrayLength: totalLength });
            } else {
                array[0] = 'Error in loading';
            }
            this.setState({ data: array });
        });
    }
    /**
     * return component body
     * @return div
     */
    render() {
        let returnView;
        if (this.state.loadUI) {
            returnView = (
                <div style={{ backgroundColor: '#212121' }}>
                    <div>
                        {/* eslint-disable */}
                        <Card>
                            <h2 className="text-center">View By Product/Component</h2>
                            <CardTitle 
                                className="text-center"
                                subtitle="Libraries of the selected Product/Component are displayed" 
                            />
                        </Card>
                        {/* eslint-enable */}
                    </div>
                    <div style={{ backgroundColor: '#212121' }}>
                        <div
                            className="col-xs-6 col-sm-6 col-lg-6 text-right"
                            style={{ backgroundColor: '#212121' }}
                        >
                            <AutoComplete
                                floatingLabelText="Search"
                                menuStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                                openOnFocus={true}//eslint-disable-line
                                searchText={this.state.searchText}
                                onUpdateInput={this.handleUpdateInput}
                                onNewRequest={this.setName}
                                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                                dataSource={this.state.data}
                                fullWidth={true}//eslint-disable-line
                            />
                        </div>
                        <div
                            className="col-xs-6 col-sm-6 col-lg-6 text-left"
                            style={{ backgroundColor: '#212121' }}
                        >
                            <DropDownProductComponentVersions
                                loadDropDown={this.state.loadV}
                                selectedType={this.state.typeSelected}
                                Name={this.state.searchText}
                                setVersion={this.setVersion.bind(this)}//eslint-disable-line
                            />
                        </div>
                        <div style={{ backgroundColor: '#212121' }} />
                    </div>
                    <div>
                        {this.state.isNameSelected ?
                            <div>
                                {this.state.typeSelected === 'Product' ?
                                    <ToolbarProductNameVersion
                                        nameProduct={this.state.name}
                                        versionProduct={this.state.version}
                                    />
                                    :
                                    <ToolbarComponent
                                        compName={this.state.name}
                                        compVersion={this.state.version}
                                    />
                                }
                            </div>
                            :
                            <div />
                        }
                    </div>
                    {this.state.typeSelected === 'Product' ?
                        <TableProductLibraries
                            renderCondition={this.state.tableRender}
                            nameComp={this.state.name}
                            versionComp={this.state.version}
                        />
                        :
                        <TableComponentLibraries
                            renderCondition={this.state.tableRender}
                            nameComp={this.state.name}
                            versionComp={this.state.version}
                        />
                    }
                </div>
            );
        } else {
            returnView = (
                <div>
                    <LoadingScreen />
                </div>
            );
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    {returnView}
                </MuiThemeProvider>
            </div>
        );
    }
}
