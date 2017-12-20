import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Redeye from 'material-ui/svg-icons/image/remove-red-eye';
import compDetails from '../../../services/dependencyManager/database/LoadComponentDetails';

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
};
/**
* @class ToolBarComponentNameVersion
* @extends {Component}
* @description Get ComponentDetails
*/
class ToolBarComponentNameVersion extends Component {
    /**
     * @class ToolBarComponentNameVersion
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            disabled: true,
            numProduct: '',
            compType: 'Make Selections' };
        this.loadComponentDetails = this.loadComponentDetails.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({ compType: 'Make Selections', disabled: true, numProduct: '' });
        this.loadComponentDetails(props.compName, props.compVersion);//eslint-disable-line
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    }
    loadComponentDetails(cName, cVersion) {
        compDetails.getDetailsOfComponent(cName, cVersion).then((response) => {
            let i = 0;
            const array = [];
            if (response.ComponentProducts.length > 0) {
                for (i; i < response.ComponentProducts.length; i++) {
                    array.push(<ListItem
                        value={i}
                        key={i}
                        primaryText={response.ComponentProducts[i].PRODUCT_NAME}
                        secondaryText={
                            <p>
                                Version:{response.ComponentProducts[i].PRODUCT_VERSION}
                            </p>}
                    />);
                }
                if (response.ComponentType != null) {
                    this.setState({ compType: response.ComponentType });
                }
                this.setState({ disabled: false, numProduct: response.ComponentProducts.length });
            } else {
                array[0] = 'Not Found';
            }
            this.setState({ data: array });
        });
    }
    render() {
        const actions = [
            <RaisedButton
                label="Close"
                primary={true}//eslint-disable-line
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                {/* eslint-disable */}
                <Toolbar style={{ backgroundColor: '#212121' }}>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="Component Type :" />
                        <Chip backgroundColor='#FF3D00'>{this.state.compType}</Chip>
                    </ToolbarGroup>
                    <ToolbarGroup firstChild={false}>
                        <ToolbarTitle text="Associated Products :" />
                        <div>
                            <RaisedButton
                                label="View"
                                onClick={this.handleOpen}
                                disabled={this.state.disabled}
                                icon={<Redeye />}
                                primary={true}//eslint-disable-line
                            />
                            <Dialog
                                title="List Of Products Using the Component"

                                actions={actions}
                                modal={true}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                                contentStyle={customContentStyle}
                                autoScrollBodyContent={true}
                            >
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#212121', color: '#FAFAFA' }}>
                                    <p>{this.state.numProduct} products are using {this.props.compName} (Version:{this.props.compVersion})</p>
                                    <List>
                                        {this.state.data}
                                    </List>
                                </div>
                            </Dialog>
                        </div>
                    </ToolbarGroup>
                </Toolbar>
                {/* eslint-enable */}
            </div>
        );
    }
}

export default ToolBarComponentNameVersion;
