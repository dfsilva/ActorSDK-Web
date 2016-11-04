'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _utils = require('flux/utils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _CallActionCreators = require('../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _UserStore = require('../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _CallDraggable = require('./call/CallDraggable.react');

var _CallDraggable2 = _interopRequireDefault(_CallDraggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SmallCall = function (_Component) {
  _inherits(SmallCall, _Component);

  SmallCall.getStores = function getStores() {
    return [_CallStore2.default, _DialogStore2.default];
  };

  SmallCall.calculatePeerInfo = function calculatePeerInfo(peer) {
    if (peer) {
      if (peer.type === _ActorAppConstants.PeerTypes.USER) {
        return _UserStore2.default.getUser(peer.id);
      }

      if (peer.type === _ActorAppConstants.PeerTypes.GROUP) {
        return _GroupStore2.default.getGroup(peer.id);
      }
    }

    return null;
  };

  SmallCall.calculateState = function calculateState() {
    var call = _CallStore2.default.getState();
    if (!call.isOpen) {
      return { isOpen: false };
    }

    var dialogPeer = _DialogStore2.default.getCurrentPeer();
    var isSameDialog = _PeerUtils2.default.equals(dialogPeer, call.peer);

    if (isSameDialog && !call.isFloating) {
      return { isOpen: false };
    }

    return {
      call: call,
      isOpen: true,
      peerInfo: SmallCall.calculatePeerInfo(call.peer)
    };
  };

  function SmallCall(props) {
    _classCallCheck(this, SmallCall);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onAnswer = _this.onAnswer.bind(_this);
    _this.onEnd = _this.onEnd.bind(_this);
    _this.onMuteToggle = _this.onMuteToggle.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    _this.onFullscreen = _this.onFullscreen.bind(_this);
    _this.onUserAdd = _this.onUserAdd.bind(_this);
    _this.onVideo = _this.onVideo.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  SmallCall.prototype.onAnswer = function onAnswer() {
    _CallActionCreators2.default.answerCall(this.state.call.id);
  };

  SmallCall.prototype.onEnd = function onEnd() {
    _CallActionCreators2.default.endCall(this.state.call.id);
  };

  SmallCall.prototype.onMuteToggle = function onMuteToggle() {
    _CallActionCreators2.default.toggleCallMute(this.state.call.id);
  };

  SmallCall.prototype.onClose = function onClose() {
    _CallActionCreators2.default.hide();
  };

  SmallCall.prototype.onFullscreen = function onFullscreen() {
    console.debug('onFullscreen');
  };

  SmallCall.prototype.onUserAdd = function onUserAdd() {
    console.debug('onUserAdd');
  };

  SmallCall.prototype.onVideo = function onVideo() {
    console.debug('onVideo');
  };

  SmallCall.prototype.render = function render() {
    var _state = this.state,
        isOpen = _state.isOpen,
        call = _state.call,
        peerInfo = _state.peerInfo;


    if (!isOpen) {
      return null;
    }

    return _react2.default.createElement(_CallDraggable2.default, {
      peerInfo: peerInfo,
      callState: call.state,
      isOutgoing: call.isOutgoing,
      isMuted: call.isMuted,
      onEnd: this.onEnd,
      onAnswer: this.onAnswer,
      onMuteToggle: this.onMuteToggle,
      onFullscreen: this.onFullscreen,
      onUserAdd: this.onUserAdd,
      onVideo: this.onVideo,
      onClose: this.onClose
    });
  };

  return SmallCall;
}(_react.Component);

exports.default = _utils.Container.create(SmallCall);
//# sourceMappingURL=SmallCall.react.js.map