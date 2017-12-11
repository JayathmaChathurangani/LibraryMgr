# react-pagination-status

[![Build Status](https://travis-ci.org/addhome2001/react-pagination-status.svg?branch=master)](https://travis-ci.org/addhome2001/react-pagination-status)

[![Known Vulnerabilities](https://snyk.io/test/github/addhome2001/react-pagination-status/badge.svg)](https://snyk.io/test/github/addhome2001/react-pagination-status)

> A pagination component of React let you to manage page status.

## [Demo]( https://addhome2001.github.io/react-pagination-status/)


If you want use `react-pagination-status` with table component, maybe you can try [this](https://www.npmjs.com/package/react-pagination-table)

## Install
```
 npm install react-pagination-status
```

## Test
```
npm test
```

## Usage

````javascript
import React from 'react';
import Pagination from 'react-pagination-status';

export default class app extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangePage = ::this.handleChangePage;
        //Store activePage state into parent component
        this.state = {
            activePage: 0
        }
    }

    handleChangePage(page) {
        this.setState({
            activePage: page
        })
    }

    render() {
        const { activePage } = this.state;
        return (
            <div>
                <div>now page number: { activePage +1 }</div>
                <Pagination
                    handleChangePage = { this.handleChangePage }
                    activePage = { activePage }
                    totalCount = { 10 }
                    perPageItemCount = { 2 }
                />
            </div>
        )
    }
}
````

## API

### Pagination

| Props        | Description                        | Type          | Default                  |
|------------------|------------------------------------|---------------|--------------------------|
| handleChangePage   |  its argument is current page          | function      | isRequired                      |
| activePage          | default page                       | Number        | isRequired                |
| totalCount            | items total count or length                 | Number        | isRequired                       |
| perPageItemCount  | items are shown per page           | Number        | isRequired                       |
| nextPageText         | the text of `nextPage` button                     | String        | 下一頁                    |
| prePageText         | the text of `previousPage` button                     | String        | 上一頁                    |
| className         | the className button                     | String        | react-pagination-status                   |



## Example
```
npm start
```

By default, the web server will run on the `8000` port after run the command above. Then you can access `localhost:8000` to see the demo.

## Style
By default, `react-pagination-status` have a `react-pagination-status` className. You can pass
custom className as a string using the `className` prop.

>In addition, the activated page(`<li>`) button will be added `.active`  class and it's up to you to modify the default css.

LICENSE
=======

MIT
