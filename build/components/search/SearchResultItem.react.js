'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _MessageContent = require('../dialog/messages/MessageContent.react');

var _MessageContent2 = _interopRequireDefault(_MessageContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SearchResultItem = function (_Component) {
  _inherits(SearchResultItem, _Component);

  function SearchResultItem() {
    _classCallCheck(this, SearchResultItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SearchResultItem.prototype.render = function render() {
    var _props = this.props,
        content = _props.content,
        date = _props.date,
        sender = _props.sender;


    return _react2.default.createElement(
      'li',
      { className: 'search__results__item search__results__item--message row' },
      _react2.default.createElement(_AvatarItem2.default, {
        image: sender.avatar,
        placeholder: sender.placeholder,
        size: 'small',
        title: sender.title
      }),
      _react2.default.createElement(
        'div',
        { className: 'search__results__item__body col-xs' },
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement(
            'time',
            { className: 'time pull-right' },
            date
          ),
          _react2.default.createElement(
            'h4',
            { className: 'title' },
            sender.title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(_MessageContent2.default, { content: content })
        )
      )
    );
  };

  return SearchResultItem;
}(_react.Component);

SearchResultItem.propTypes = {
  content: _react.PropTypes.object.isRequired,
  date: _react.PropTypes.string.isRequired,
  sender: _react.PropTypes.object.isRequired
};
exports.default = SearchResultItem;
//# sourceMappingURL=SearchResultItem.react.js.map