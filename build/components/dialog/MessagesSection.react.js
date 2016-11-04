'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _MessageActionCreators = require('../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _MessageStore = require('../../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _MessagesList = require('./MessagesList.react');

var _MessagesList2 = _interopRequireDefault(_MessagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessagesSection = function (_Component) {
  _inherits(MessagesSection, _Component);

  MessagesSection.getStores = function getStores() {
    return [_MessageStore2.default];
  };

  MessagesSection.calculateState = function calculateState() {
    return _MessageStore2.default.getState();
  };

  function MessagesSection(props) {
    _classCallCheck(this, MessagesSection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onEdit = _this.onEdit.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onLoadMore = _this.onLoadMore.bind(_this);
    return _this;
  }

  MessagesSection.prototype.onEdit = function onEdit(message, text) {
    var peer = this.props.peer;

    _MessageActionCreators2.default.endEdit(peer, message, text);
  };

  MessagesSection.prototype.onSelect = function onSelect(rid) {
    _MessageActionCreators2.default.toggleSelected(rid);
  };

  MessagesSection.prototype.onLoadMore = function onLoadMore() {
    _DialogActionCreators2.default.loadMoreMessages(this.props.peer);
  };

  MessagesSection.prototype.render = function render() {
    var _props = this.props,
        uid = _props.uid,
        peer = _props.peer,
        isMember = _props.isMember;


    return _react2.default.createElement(_MessagesList2.default, {
      uid: uid,
      peer: peer,
      messages: this.state,
      isMember: isMember,
      onSelect: this.onSelect,
      onLoadMore: this.onLoadMore,
      onEdit: this.onEdit
    });
  };

  return MessagesSection;
}(_react.Component);

MessagesSection.propTypes = {
  uid: _react.PropTypes.number.isRequired,
  peer: _react.PropTypes.object.isRequired,
  isMember: _react.PropTypes.bool.isRequired
};
exports.default = _utils.Container.create(MessagesSection);
//# sourceMappingURL=MessagesSection.react.js.map