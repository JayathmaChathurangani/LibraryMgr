import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import build from 'material-ui/svg-icons/action/build';
import assignment from 'material-ui/svg-icons/action/assignment';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ProductComponents from '../../../services/dependencyManager/database/LoadComponentsInProduct';
import ProductLibraries from '../../../services/dependencyManager/database/LoadLibrariesInProduct';
import LibraryTable from '../Tables/ProductLibraries';
/**
 * @class TabProduct
 * @extends {Component}
 * @description Sample React component
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
        this.loadProductComponents = this.loadProductComponents.bind(this);
        this.loadProductLibraries = this.loadProductLibraries.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({ renderTable: false });
        this.loadProductComponents(props.conditionRender, props.name, props.version);//eslint-disable-line
        this.loadProductLibraries(props.conditionRender, props.name, props.version);//eslint-disable-line
    }
    /**
    * Load Product Components
    */
    loadProductComponents(conditionRender, prName, prVersion) {
        if (conditionRender) {//eslint-disable-line
            ProductComponents.getProductComponents(prName, prVersion).then((response) => {
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
    * Load Product Libraries
    */
    loadProductLibraries(conditionRender, prName, prVersion) {
        if (conditionRender) {//eslint-disable-line
            ProductLibraries.getProductLibraries(prName, prVersion).then((response) => {
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
                <Tabs style={{ background: '#80D8FF' }} >
                    <Tab
                        icon={<build />}
                        label="COMPONENTS"
                    >
                        <div>
                            <Paper
                                style={{ overflow: 'auto' }}
                            >
                                <List>
                                    {this.state.data}
                                </List>
                            </Paper>
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
