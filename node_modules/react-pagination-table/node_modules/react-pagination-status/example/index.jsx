/* @flow */
import { render } from 'react-dom';
import React, { Component } from 'react';
import Pagination from '../lib';

type State = {
  activePage: number,
}

const App = class App extends Component {

  state: State

  handleChangePage: (page: number) => void

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.state = {
      activePage: 0,
    };
  }

  handleChangePage(page: number) {
    this.setState({
      activePage: page,
    });
  }

  render() {
    const { activePage }: { activePage: number } = this.state;

    return (
      <div>
        <div>now page number: { activePage + 1 }</div>
        <Pagination
          handleChangePage={ this.handleChangePage }
          activePage={ activePage }
          totalCount={ 10 }
          perPageItemCount={ 2 }
          nextPageText="next"
          prePageText="prev"
        />
      </div>
    );
  }
};
render(
  <App />,
  document.getElementById('container'),
);
