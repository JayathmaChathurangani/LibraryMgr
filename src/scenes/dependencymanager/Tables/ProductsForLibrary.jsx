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
import ProductsOfLibrary from '../../../services/dependencyManager/database/LoadProductsUsingLibrary';

const columns = [
    { name: 'ProductID', title: 'Product ID' },
    { name: 'ProductName', title: 'The Product Name' },
    { name: 'ProductVersion', title: 'The Product Version' },
];

export default class ProductsForLibrary extends React.PureComponent {
    /**
     * @class ProductsForLibrary
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            tRows: [],
            columnWidths: {
                ProductID: 500, ProductName: 600, ProductVersion: 500,
            },
            expandedRows: [],
            libraryName: '',
            libraryVersion: '',
        };
        this.loadProducts = this.loadProducts.bind(this);
    }
    componentWillReceiveProps(props) {
        if (props.renderCondition) {//eslint-disable-line
            this.setState({
                libraryName: props.nameLibrary,//eslint-disable-line
                libraryVersion: props.versionLibrary,//eslint-disable-line
            });
            this.loadProducts(props.nameLibrary, props.versionLibrary);
        }
    }
    /**
    * Load Products using the given library
    */
    loadProducts(lName, lVersion) {
        ProductsOfLibrary.getProductsUsingLibrary(lName, lVersion).then((response) => {
            let i = 0;
            const array = [];
            if (response.length > 0) {
                for (i; i < response.length; i++) {
                    array[i] = {
                        ProductID: response[i].PRODUCT_ID,
                        ProductName: response[i].PRODUCT_NAME,
                        ProductVersion: response[i].PRODUCT_VERSION,
                    };
                }
            } else {
                array[0] = 'Nothing to Show';
            }
            this.setState({ tRows: array });
        });
    }
    render() {
        let returnView;
        if (this.props.renderCondition) {
            returnView = (
                <Grid
                    rows={this.state.tRows}
                    columns={columns}
                >
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={13}
                    />
                    <LocalPaging />
                    <VirtualTableView />
                    <TableColumnResizing defaultColumnWidths={this.state.columnWidths} />
                    <TableHeaderRow allowResizing />
                    <PagingPanel />
                </Grid>
            );
        } else {
            returnView = (
                <div>
                    Please Select a library
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
