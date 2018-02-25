'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var ChannelsActionCreators = function () {
  function ChannelsActionCreators() {
    _classCallCheck(this, ChannelsActionCreators);
  }

  ChannelsActionCreators.prototype.setChannels = function setChannels(channels) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CHANNEL_LIST_SET, { channels: channels });
  };

  return ChannelsActionCreators;
}();

exports.default = new ChannelsActionCreators();
//# sourceMappingURL=ChannelsActionCreators.js.map