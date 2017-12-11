import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import { Card, CardTitle } from 'material-ui/Card';
import LoadProductNames from '../../../services/dependencyManager/database/LoadProductNames';
import DropDownProductVersions from '../DropDowns/DropDownProductVersions';
import ToolbarProductNameVersion from '../Toolbars/ToolBarProductNameVersion';
import TabProduct from '../Tabs/TabProduct';

const array = [];
/**
 * @class ViewByProduct
 * @extends {Component}
 * @description Sample React component
 */
export default class ViewByProduct extends Component {
/**
 * @class ViewByProduct
 * @extends {Component}
 * @param {any} props props for constructor
 * @description Sample React component
 */
    constructor(props) {
        super(props);
        this.state = { data: [],
            searchText: '',
            dataD: [],
            prName: 'No product is Selected',
            prVersion: 'No Version is Selected',
            loadV: false,
            tabRender: false };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.setProductName = this.setProductName.bind(this);
    }
    /**
     * load product Names in the drop down list
     */
    componentDidMount() {
        this.loadProductNamesDropDown();
    }
    /**
    * @param {string} searchTxt
    * accept
    */
    handleUpdateInput(searchTxt) {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            searchText: searchTxt, //eslint-disable-line
            prVersion: 'No Version is Selected',//eslint-disable-line
            tabRender: false,
            loadV: false,
        });   //eslint-disable-line     
    }
    /**
    * set Product Name
    */
    setProductName() {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            prName: this.state.searchText, //eslint-disable-line
            prVersion: 'No Version is Selected',//eslint-disable-line
            tabRender: false,
            loadV: true,
        });   //eslint-disable-line     
    }
    /**
    * set Product Version
    */
    setProductVersion(version) {  //eslint-disable-line
        this.setState({ //eslint-disable-line
            prVersion: version,//eslint-disable-line
            tabRender: true,
            loadV: true,
        });   //eslint-disable-line
    }
    /**
    * Load the Menu items of the Product dropdown
    */
    loadProductNamesDropDown() {
        LoadProductNames.selectProductNamesfortheDropdown().then((response) => {
            let i = 0;
            if (response.length > 0) {
                for (i; i < response.length; i++) {
                    array[i] = response[i].PRODUCT_NAME;
                }
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
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div style={{ backgroundColor: '#212121' }}>
                        <div>
                            {/* eslint-disable */}
                            <Card>
                                <h2 className="text-center">View By Product</h2>
                                <CardTitle 
                                    className="text-center"
                                    subtitle="Libraries and Components of the selected products are displayed" 
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
                                    floatingLabelText="Search  Product"
                                    menuStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                                    openOnFocus={true}//eslint-disable-line
                                    searchText={this.state.searchText}
                                    onUpdateInput={this.handleUpdateInput}
                                    onNewRequest={this.setProductName}
                                    filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                                    dataSource={this.state.data}
                                />
                            </div>
                            <div
                                className="col-xs-6 col-sm-6 col-lg-6 text-left"
                                style={{ backgroundColor: '#212121' }}
                            >
                                <DropDownProductVersions
                                    loadDropDown={this.state.loadV}
                                    productName={this.state.searchText}
                                    setVersion={this.setProductVersion.bind(this)}//eslint-disable-line
                                />
                            </div>
                        </div>
                        <div>
                            <ToolbarProductNameVersion
                                nameProduct={this.state.prName}
                                versionProduct={this.state.prVersion}
                            />
                        </div>
                        <div>
                            <TabProduct
                                conditionRender={this.state.tabRender}
                                name={this.state.prName}
                                version={this.state.prVersion}
                            />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
