'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _PeerUtils = require('../../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _MessageUtils = require('../../utils/MessageUtils');

var _Scroller = require('../common/Scroller.react');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _MessageItem = require('./messages/MessageItem.react');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _Welcome = require('./messages/Welcome.react');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _Loading = require('./messages/Loading.react');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessagesList = function (_Component) {
  _inherits(MessagesList, _Component);

  function MessagesList(props, context) {
    _classCallCheck(this, MessagesList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    var dialog = context.delegate.components.dialog;

    if (dialog && dialog.messages) {
      _this.components = {
        MessageItem: (0, _lodash.isFunction)(dialog.messages.message) ? dialog.messages.message : _MessageItem2.default,
        Welcome: (0, _lodash.isFunction)(dialog.messages.welcome) ? dialog.messages.welcome : _Welcome2.default
      };
    } else {
      _this.components = {
        MessageItem: _MessageItem2.default,
        Welcome: _Welcome2.default
      };
    }

    _this.state = {
      showScrollToBottom: false
    };

    _this.dimensions = null;
    _this.isLoading = false;

    _this.onResize = _this.onResize.bind(_this);
    _this.onScroll = (0, _lodash.throttle)(_this.onScroll.bind(_this), 300);
    _this.handleScrollToBottom = _this.handleScrollToBottom.bind(_this);
    return _this;
  }

  MessagesList.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.peer !== this.props.peer || nextProps.messages !== this.props.messages || nextProps.isMember !== this.props.isMember || nextState.showScrollToBottom !== this.state.showScrollToBottom;
  };

  MessagesList.prototype.componentDidMount = function componentDidMount() {
    this.restoreScroll();
  };

  MessagesList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!_PeerUtils2.default.equals(nextProps.peer, this.props.peer)) {
      this.dimensions = null;
      this.isLoading = false;
    } else {
      this.updateDimensions(this.refs.scroller.getDimensions());
    }
  };

  MessagesList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.showScrollToBottom !== this.state.showScrollToBottom) {
      return;
    }

    var dimensions = this.dimensions,
        scroller = this.refs.scroller,
        _props = this.props,
        uid = _props.uid,
        messages = _props.messages;


    if (messages.unreadId && messages.unreadId !== prevProps.messages.unreadId) {
      if (this.refs.unread) {
        this.refs.scroller.scrollToNode(this.refs.unread);
      }
    } else if (messages.changeReason === _ActorAppConstants.MessageChangeReason.PUSH) {
      var _isLastMessageMine = (0, _MessageUtils.isLastMessageMine)(uid, messages);
      if (!dimensions || _isLastMessageMine) {
        this.scrollToBottom();
      }
    } else if (messages.changeReason === _ActorAppConstants.MessageChangeReason.UNSHIFT) {
      this.isLoading = false;
      if (dimensions) {
        var nextDimensions = scroller.getDimensions();
        // Restore scroll
        scroller.scrollTo(nextDimensions.scrollHeight - dimensions.scrollHeight);
      } else {
        this.scrollToBottom();
      }
    } else {
      this.restoreScroll();
    }
  };

  MessagesList.prototype.onScroll = function onScroll() {
    var dimensions = this.refs.scroller.getDimensions();
    this.updateDimensions(dimensions);
    if (!this.isLoading && dimensions.scrollTop < 100) {
      this.isLoading = true;
      this.props.onLoadMore();
    }

    var showScrollToBottom = dimensions.scrollTop < dimensions.scrollHeight - 2 * dimensions.offsetHeight;

    if (showScrollToBottom !== this.state.showScrollToBottom) {
      this.setState({ showScrollToBottom: showScrollToBottom });
    }
  };

  MessagesList.prototype.onResize = function onResize() {
    var dimensions = this.dimensions,
        scroller = this.refs.scroller;

    if (dimensions) {
      // Fix scroll
      var ratio = dimensions.scrollTop / dimensions.scrollHeight;
      var nextDimensions = scroller.getDimensions();
      scroller.scrollTo(ratio * nextDimensions.scrollHeight);
      this.dimensions = nextDimensions;
    } else {
      scroller.scrollToBottom();
    }
  };

  MessagesList.prototype.handleScrollToBottom = function handleScrollToBottom() {
    this.refs.scroller.scrollToBottom();
  };

  MessagesList.prototype.renderHeader = function renderHeader() {
    var _props2 = this.props,
        peer = _props2.peer,
        isMember = _props2.isMember,
        messages = _props2.messages;


    if (!isMember) {
      return null;
    }

    if (messages.isLoaded) {
      var Welcome = this.components.Welcome;

      return _react2.default.createElement(Welcome, { peer: peer, key: 'header' });
    }

    if (!messages.messages.length) {
      return null;
    }

    return _react2.default.createElement(_Loading2.default, { key: 'header' });
  };

  MessagesList.prototype.renderMessages = function renderMessages() {
    var _props3 = this.props,
        uid = _props3.uid,
        peer = _props3.peer,
        _props3$messages = _props3.messages,
        messages = _props3$messages.messages,
        overlay = _props3$messages.overlay,
        count = _props3$messages.count,
        selected = _props3$messages.selected,
        receiveDate = _props3$messages.receiveDate,
        readDate = _props3$messages.readDate,
        editId = _props3$messages.editId,
        unreadId = _props3$messages.unreadId;
    var MessageItem = this.components.MessageItem;


    var result = [];
    for (var index = messages.length - count; index < messages.length; index++) {
      var message = messages[index];
      if (message.rid === unreadId) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'unread-divider', ref: 'unread', key: 'unread' },
          _react2.default.createElement(
            'div',
            { className: 'text' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'expand_more'
            ),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'message.unread' }),
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'expand_more'
            )
          )
        ));
      }

      var overlayItem = overlay[index];
      if (overlayItem && overlayItem.dateDivider) {
        result.push(_react2.default.createElement(
          'div',
          { className: 'date-divider', key: overlayItem.dateDivider },
          overlayItem.dateDivider
        ));
      }

      result.push(_react2.default.createElement(MessageItem, {
        peer: peer,
        message: message,
        state: (0, _MessageUtils.getMessageState)(message, uid, receiveDate, readDate),
        isShort: overlayItem.useShort,
        isSelected: selected.has(message.rid),
        isEditing: editId === message.rid,
        onEdit: this.props.onEdit,
        onSelect: this.props.onSelect,
        key: message.sortKey
      }));
    }

    return result;
  };

  MessagesList.prototype.renderScrollToBottomButton = function renderScrollToBottomButton() {
    var showScrollToBottom = this.state.showScrollToBottom;

    if (!showScrollToBottom) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'chat__scroll-to-bottom', onClick: this.handleScrollToBottom },
      _react2.default.createElement(
        'i',
        { className: 'material-icons' },
        'keyboard_arrow_down'
      )
    );
  };

  MessagesList.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'chat__container' },
      _react2.default.createElement(
        _Scroller2.default,
        {
          className: 'chat__messages',
          ref: 'scroller',
          onScroll: this.onScroll,
          onResize: this.onResize
        },
        this.renderHeader(),
        this.renderMessages()
      ),
      this.renderScrollToBottomButton()
    );
  };

  MessagesList.prototype.scrollToBottom = function scrollToBottom() {
    this.dimensions = null;
    this.refs.scroller.scrollToBottom();
  };

  MessagesList.prototype.updateDimensions = function updateDimensions(dimensions) {
    if (dimensions.scrollHeight === dimensions.scrollTop + dimensions.offsetHeight) {
      // Lock scroll to bottom
      this.dimensions = null;
    } else {
      this.dimensions = dimensions;
    }
  };

  MessagesList.prototype.restoreScroll = function restoreScroll() {
    var dimensions = this.dimensions,
        scroller = this.refs.scroller;


    if (dimensions) {
      scroller.scrollTo(dimensions.scrollTop);
    } else {
      scroller.scrollToBottom();
    }
  };

  return MessagesList;
}(_react.Component);

MessagesList.contextTypes = {
  delegate: _react.PropTypes.object.isRequired
};
MessagesList.propTypes = {
  uid: _react.PropTypes.number.isRequired,
  peer: _react.PropTypes.object.isRequired,
  messages: _react.PropTypes.shape({
    messages: _react.PropTypes.array.isRequired,
    overlay: _react.PropTypes.array.isRequired,
    count: _react.PropTypes.number.isRequired,
    isLoaded: _react.PropTypes.bool.isRequired,
    receiveDate: _react.PropTypes.number.isRequired,
    readDate: _react.PropTypes.number.isRequired,
    editId: _react.PropTypes.string,
    unreadId: _react.PropTypes.string,
    selected: _react.PropTypes.object.isRequired,
    changeReason: _react.PropTypes.oneOf([_ActorAppConstants.MessageChangeReason.UNKNOWN, _ActorAppConstants.MessageChangeReason.PUSH, _ActorAppConstants.MessageChangeReason.UNSHIFT, _ActorAppConstants.MessageChangeReason.UPDATE]).isRequired
  }).isRequired,
  isMember: _react.PropTypes.bool.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  onLoadMore: _react.PropTypes.func.isRequired,
  onEdit: _react.PropTypes.func.isRequired
};
exports.default = MessagesList;
//# sourceMappingURL=MessagesList.react.js.map