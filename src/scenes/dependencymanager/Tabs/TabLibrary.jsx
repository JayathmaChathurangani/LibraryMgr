import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import build from 'material-ui/svg-icons/action/build';
import assignment from 'material-ui/svg-icons/action/assignment';
import { List, ListItem } from 'material-ui/List';
import LibraryComponent from '../../../services/dependencyManager/database/LoadComponetsUsingLibrary';
import LibraryProduct from '../../../services/dependencyManager/database/LoadProductsUsingLibrary';
import LibraryTable from '../Tables/ProductLibraries';
/**
 * @class TabProduct
 * @extends {Component}
 * @description Sample React component(Not this)
 */
class TabProduct extends Component {
    /**
     * @class TabProduct
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = { data: [], dataTable: [], renderTable: false };
        this.loadLibraryComponents = this.loadLibraryComponents.bind(this);
        this.loadLibraryProducts = this.loadLibraryProducts.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({ renderTable: false });
        this.loadLibraryComponents(props.conditionRender, props.name, props.version);//eslint-disable-line
        this.loadLibraryProducts(props.conditionRender, props.name, props.version);//eslint-disable-line
    }
    /**
    * Load Library Components
    */
    loadLibraryComponents(conditionRender, lName, lVersion) {
        if (conditionRender) {//eslint-disable-line
            LibraryComponents.getProductComponents(prName, prVersion).then((response) => {
                let i = 0;
                const array = [];
                if (response.length > 0) {
                    for (i; i < response.length; i++) {
                        array.push(<ListItem
                            value={i}
                            key={i}
                            primaryText={response[i].COMP_NAME}
                            secondaryText={response[i].COMP_VERSION}
                        />);
                    }
                } else {
                    array[0] = 'Nothing to Show';
                }
                this.setState({ data: array });
            });
        }
    }
    /**
    * Load Components Using given Library
    */
    loadLibraryProducts(conditionRender, prName, prVersion) {
        if (conditionRender) {//eslint-disable-line
            LibraryProduct.getProductLibraries(prName, prVersion).then((response) => {
                let i = 0;
                const array = [];
                if (response.length > 0) {
                    for (i; i < response.length; i++) {
                        array[i] = response[i];
                    }
                    this.setState({ renderTable: true });
                } else {
                    array[0] = 'Nothing to Show';
                }
                this.setState({ dataTable: array });
            });
        }
    }
    render() {
        let returnView;
        if (this.props.conditionRender) {//eslint-disable-line
            returnView = (
                <Tabs>
                    <Tab
                        icon={<build />}
                        label="COMPONENTS"
                    >
                        <div>
                            <List>
                                {this.state.data}
                            </List>
                        </div>
                    </Tab>
                    <Tab
                        icon={<assignment />}
                        label="LIBRARIES"
                    >
                        {this.state.renderTable ?
                            <div>
                                <LibraryTable libraryData={this.state.dataTable} />
                            </div>
                            :
                            <div>
                                No Libraries
                            </div>
                        }
                    </Tab>
                </Tabs>
            );
        }
        return (
            <div>
                {returnView}
            </div>
        );
    }
}

export default TabProduct;
