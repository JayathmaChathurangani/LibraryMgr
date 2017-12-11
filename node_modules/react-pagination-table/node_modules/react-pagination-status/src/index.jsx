/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

type State = {
  pageCount: number,
}

type Props = {
  handleChangePage: (x: number) => void,
  activePage: number,
  totalCount: number,
  perPageItemCount: number,
  nextPageText: string,
  prePageText: string,
  className: string,
}

export default class Pagination extends Component {

  state: State

  handleChangePage: (status: mixed) => () => void

  static propTypes = {
    handleChangePage: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    perPageItemCount: PropTypes.number.isRequired,
    nextPageText: PropTypes.string,
    prePageText: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'react-pagination-status',
    nextPageText: '下一頁',
    prePageText: '上一頁',
  };

  constructor(props: Props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.state = {
      pageCount: Math.ceil(props.totalCount / props.perPageItemCount),
    };
  }

  handleChangePage(status: mixed): Function {
    return (): void => {
      let { activePage }: { activePage: number } = this.props;
      let { pageCount }: { pageCount: number } = this.state;
      let newActive: mixed;

      switch (status) {
        case 'next':
          newActive = activePage === --pageCount ? 0 : ++activePage;
          break;
        case 'pre':
          newActive = activePage === 0 ? --pageCount : --activePage;
          break;
        default:
          newActive = status;
      }
      this.props.handleChangePage(newActive);
    };
  }

  render() {
    const {
      activePage,
      nextPageText,
      prePageText,
      className,
    }: {
      activePage: number,
      nextPageText: string,
      prePageText: string,
      className: string,
    } = this.props;

    const { pageCount }: { pageCount: number } = this.state;
    const pageArr: number[] = [...new Array(pageCount).keys()];

    return (
      <ul className={ className }>
        <li onClick={ this.handleChangePage('pre') }><a>{ prePageText }</a></li>
        {
          pageArr.map((u: number, i) =>
            <li
              className={ activePage === i ? 'active' : null }
              key={ `page-${u}` }
              onClick={ this.handleChangePage(i) }
            >
              <a>{ i + 1 }</a>
            </li>,
          )
        }
        <li onClick={ this.handleChangePage('next') }><a>{ nextPageText }</a></li>
      </ul>
    );
  }
}
