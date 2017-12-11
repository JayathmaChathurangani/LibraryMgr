'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

    _this.handleChangePage = _this.handleChangePage.bind(_this);
    _this.state = {
      pageCount: Math.ceil(props.totalCount / props.perPageItemCount)
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: 'handleChangePage',
    value: function handleChangePage(status) {
      var _this2 = this;

      return function () {
        var activePage = _this2.props.activePage;
        var pageCount = _this2.state.pageCount;

        var newActive = void 0;

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
        _this2.props.handleChangePage(newActive);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          activePage = _props.activePage,
          nextPageText = _props.nextPageText,
          prePageText = _props.prePageText,
          className = _props.className;
      var pageCount = this.state.pageCount;

      var pageArr = [].concat(_toConsumableArray(new Array(pageCount).keys()));

      return _react2.default.createElement(
        'ul',
        { className: className },
        _react2.default.createElement(
          'li',
          { onClick: this.handleChangePage('pre') },
          _react2.default.createElement(
            'a',
            null,
            prePageText
          )
        ),
        pageArr.map(function (u, i) {
          return _react2.default.createElement(
            'li',
            {
              className: activePage === i ? 'active' : null,
              key: 'page-' + u,
              onClick: _this3.handleChangePage(i)
            },
            _react2.default.createElement(
              'a',
              null,
              i + 1
            )
          );
        }),
        _react2.default.createElement(
          'li',
          { onClick: this.handleChangePage('next') },
          _react2.default.createElement(
            'a',
            null,
            nextPageText
          )
        )
      );
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  handleChangePage: _propTypes2.default.func.isRequired,
  activePage: _propTypes2.default.number.isRequired,
  totalCount: _propTypes2.default.number.isRequired,
  perPageItemCount: _propTypes2.default.number.isRequired,
  nextPageText: _propTypes2.default.string,
  prePageText: _propTypes2.default.string,
  className: _propTypes2.default.string
};
Pagination.defaultProps = {
  className: 'react-pagination-status',
  nextPageText: '下一頁',
  prePageText: '上一頁'
};
exports.default = Pagination;