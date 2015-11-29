'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../../constants/ActorAppConstants');

var _humanFileSize = require('../../../utils/humanFileSize');

var _humanFileSize2 = _interopRequireDefault(_humanFileSize);

var _AttachmentsActionCreators = require('../../../actions/AttachmentsActionCreators');

var _AttachmentsActionCreators2 = _interopRequireDefault(_AttachmentsActionCreators);

var _MessageActionCreators = require('../../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _AttachmentStore = require('../../../stores/AttachmentStore');

var _AttachmentStore2 = _interopRequireDefault(_AttachmentStore);

var _Attachment = require('./Attachment.react');

var _Attachment2 = _interopRequireDefault(_Attachment);

var _Pagination = require('./Pagination.react');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SendAttachment = (function (_Component) {
  _inherits(SendAttachment, _Component);

  function SendAttachment(props) {
    _classCallCheck(this, SendAttachment);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SendAttachment).call(this, props));

    _this.handleClose = function () {
      return _AttachmentsActionCreators2.default.hide();
    };

    _this.handleKeyDown = function (event) {
      event.preventDefault();
      switch (event.keyCode) {
        case _ActorAppConstants.KeyCodes.ESC:
          _this.handleClose();
          break;
        case _ActorAppConstants.KeyCodes.ENTER:
          if (event.shiftKey) {
            _this.handleSendAll();
          } else {
            _this.handleSend();
          }
          break;
      }
    };

    _this.handleSelect = function (index) {
      return _AttachmentsActionCreators2.default.selectAttachment(index);
    };

    _this.handleCancel = function () {
      return _AttachmentsActionCreators2.default.deleteAttachment();
    };

    _this.handleSend = function () {
      return _AttachmentsActionCreators2.default.sendAttachment(_AttachmentStore2.default.getAttachment(), _this.state.selectedIndex);
    };

    _this.handleSendAll = function () {
      return _AttachmentsActionCreators2.default.sendAll(_this.state.attachments);
    };

    return _this;
  }

  _createClass(SendAttachment, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _react2.default.findDOMNode(this.refs.send).focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isOpen = _state.isOpen;
      var attachments = _state.attachments;
      var selectedIndex = _state.selectedIndex;

      var isSingleFile = attachments.length > 1;

      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--attachments',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: { width: 700 } },
        _react2.default.createElement(
          'header',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            this.getIntlMessage('modal.attachments.title')
          ),
          isSingleFile ? _react2.default.createElement(
            'button',
            { className: 'button button--lightblue pull-right',
              onClick: this.handleSendAll },
            this.getIntlMessage('button.sendAll')
          ) : null
        ),
        _react2.default.createElement(
          'section',
          { className: 'modal-new__body' },
          _react2.default.createElement(_Attachment2.default, { attachment: attachments[selectedIndex] })
        ),
        _react2.default.createElement(
          'footer',
          { className: 'modal-new__footer row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs' },
            isSingleFile ? _react2.default.createElement(_Pagination2.default, { current: selectedIndex,
              total: attachments.length - 1,
              onChange: this.handleSelect }) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs text-right' },
            _react2.default.createElement(
              'button',
              { className: 'button',
                onClick: this.handleCancel },
              this.getIntlMessage('button.cancel')
            ),
            _react2.default.createElement(
              'button',
              { className: 'button button--rised', ref: 'send',
                onClick: this.handleSend },
              this.getIntlMessage('button.send')
            )
          )
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _AttachmentStore2.default.isOpen(),
        attachments: _AttachmentStore2.default.getAllAttachments(),
        selectedIndex: _AttachmentStore2.default.getSelectedIndex()
      };
    }
  }]);

  return SendAttachment;
})(_react.Component);

SendAttachment.getStores = function () {
  return [_AttachmentStore2.default];
};

_reactMixin2.default.onClass(SendAttachment, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(SendAttachment, { pure: false });