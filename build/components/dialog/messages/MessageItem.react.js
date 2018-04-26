'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _PeerUtils = require('../../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _DialogActionCreators = require('../../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _ActivityActionCreators = require('../../../actions/ActivityActionCreators');

var _ActivityActionCreators2 = _interopRequireDefault(_ActivityActionCreators);

var _DropdownActionCreators = require('../../../actions/DropdownActionCreators');

var _DropdownActionCreators2 = _interopRequireDefault(_DropdownActionCreators);

var _DropdownStore = require('../../../stores/DropdownStore');

var _DropdownStore2 = _interopRequireDefault(_DropdownStore);

var _GroupStore = require('../../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _SvgIcon = require('../../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _State = require('./State.react');

var _State2 = _interopRequireDefault(_State);

var _Reactions = require('./Reactions.react');

var _Reactions2 = _interopRequireDefault(_Reactions);

var _MessageContent = require('./MessageContent.react');

var _MessageContent2 = _interopRequireDefault(_MessageContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessageItem = function (_Component) {
  _inherits(MessageItem, _Component);

  MessageItem.getStores = function getStores() {
    return [_DropdownStore2.default];
  };

  MessageItem.calculateState = function calculateState(prevState, props) {
    return {
      isHighlighted: props && props.message ? _DropdownStore2.default.isMessageDropdownOpen(props.message.rid) : false
    };
  };

  function MessageItem(props, context) {
    _classCallCheck(this, MessageItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.showActions = function (event) {
      var message = _this.props.message;

      _DropdownActionCreators2.default.openMessageActions(event.target.getBoundingClientRect(), message);
    };

    _this.toggleMessageSelection = function () {
      var _this$props = _this.props,
          message = _this$props.message,
          onSelect = _this$props.onSelect;

      onSelect(message.rid);
    };

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  MessageItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.message !== nextProps.message || this.props.isShort !== nextProps.isShort;
  };

  MessageItem.prototype.onClick = function onClick() {
    var _props = this.props,
        message = _props.message,
        peer = _props.peer;


    if (_PeerUtils2.default.equals(peer, message.sender.peer)) {
      _ActivityActionCreators2.default.show();
    } else {
      _DialogActionCreators2.default.selectDialogPeerUser(message.sender.peer.id);
    }
  };

  MessageItem.prototype.renderTitle = function renderTitle() {
    var _props2 = this.props,
        message = _props2.message,
        peer = _props2.peer;


    if (_PeerUtils2.default.isGroupBot(message.sender)) {
      var group = _GroupStore2.default.getGroup(peer.id);
      return _react2.default.createElement('span', { className: 'message__sender__name', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.name) } });
    } else {
      return _react2.default.createElement('span', { className: 'message__sender__name', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(message.sender.title) } });
    }
  };

  MessageItem.prototype.renderHeader = function renderHeader() {
    var _props3 = this.props,
        isShort = _props3.isShort,
        message = _props3.message,
        state = _props3.state;


    if (isShort) {
      return null;
    }

    return _react2.default.createElement(
      'header',
      { className: 'message__header' },
      _react2.default.createElement(
        'h3',
        { className: 'message__sender' },
        _react2.default.createElement(
          'a',
          { onClick: this.onClick },
          this.renderTitle(),
          message.sender.userName ? _react2.default.createElement(
            'span',
            { className: 'message__sender__nick' },
            '@',
            message.sender.userName
          ) : null
        )
      ),
      _react2.default.createElement(
        'time',
        { className: 'message__timestamp' },
        message.date
      ),
      _react2.default.createElement(_State2.default, { state: state })
    );
  };

  MessageItem.prototype.renderLeftBlock = function renderLeftBlock() {
    var _props4 = this.props,
        isShort = _props4.isShort,
        message = _props4.message,
        state = _props4.state,
        peer = _props4.peer;


    if (isShort) {
      return _react2.default.createElement(
        'div',
        { className: 'message__info' },
        _react2.default.createElement(
          'time',
          { className: 'message__timestamp' },
          message.date
        ),
        _react2.default.createElement(_State2.default, { state: state })
      );
    } else {
      if (_PeerUtils2.default.isGroupBot(message.sender)) {
        var group = _GroupStore2.default.getGroup(peer.id);
        return _react2.default.createElement(
          'div',
          { className: 'message__info message__info--avatar' },
          _react2.default.createElement(_AvatarItem2.default, {
            className: 'message__avatar',
            image: group.avatar,
            placeholder: group.placeholder,
            title: group.name,
            onClick: this.onClick
          })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'message__info message__info--avatar' },
          _react2.default.createElement(_AvatarItem2.default, {
            className: 'message__avatar',
            image: message.sender.avatar,
            placeholder: message.sender.placeholder,
            title: message.sender.title,
            onClick: this.onClick
          })
        );
      }
    }
  };

  MessageItem.prototype.renderActions = function renderActions() {
    var _props5 = this.props,
        peer = _props5.peer,
        message = _props5.message;
    var isHighlighted = this.state.isHighlighted;
    var isExperimental = this.context.isExperimental;


    var messageActionsMenuClassName = (0, _classnames2.default)('message__actions__menu', {
      'message__actions__menu--opened': isHighlighted
    });

    return _react2.default.createElement(
      'div',
      { className: 'message__actions' },
      _react2.default.createElement(_Reactions2.default, { peer: peer, message: message }),
      _react2.default.createElement(
        'div',
        { className: messageActionsMenuClassName, onClick: this.showActions },
        _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--dropdown', glyph: 'cog' })
      ),
      isExperimental ? _react2.default.createElement(
        'div',
        { className: 'message__actions__selector', onClick: this.toggleMessageSelection },
        _react2.default.createElement('i', { className: 'icon material-icons icon-check' })
      ) : null
    );
  };

  MessageItem.prototype.render = function render() {
    var _props6 = this.props,
        message = _props6.message,
        isShort = _props6.isShort,
        isSelected = _props6.isSelected,
        isEditing = _props6.isEditing;
    var isHighlighted = this.state.isHighlighted;


    var messageClassName = (0, _classnames2.default)('message', {
      'message--short': isShort,
      'message--active': isHighlighted,
      'message--selected': isSelected,
      'message--editing': isEditing
    });

    return _react2.default.createElement(
      'div',
      { className: messageClassName },
      this.renderLeftBlock(),
      _react2.default.createElement(
        'div',
        { className: 'message__body' },
        this.renderHeader(),
        _react2.default.createElement(_MessageContent2.default, { content: message.content, rid: message.rid })
      ),
      this.renderActions()
    );
  };

  return MessageItem;
}(_react.Component);

MessageItem.contextTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool
};
MessageItem.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired,
  state: _react.PropTypes.string.isRequired,
  isShort: _react.PropTypes.bool.isRequired,
  isEditing: _react.PropTypes.bool.isRequired,
  isSelected: _react.PropTypes.bool.isRequired,
  onSelect: _react.PropTypes.func.isRequired
};
MessageItem.defaultProps = {
  isSelected: false,
  onSelect: _lodash.noop
};
exports.default = _utils.Container.create(MessageItem, { withProps: true });
//# sourceMappingURL=MessageItem.react.js.map