'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _utils = require('flux/utils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActivityStore = require('../stores/ActivityStore');

var _ActivityStore2 = _interopRequireDefault(_ActivityStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _DialogInfoStore = require('../stores/DialogInfoStore');

var _DialogInfoStore2 = _interopRequireDefault(_DialogInfoStore);

var _UserProfile = require('./activity/UserProfile.react');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _GroupProfile = require('./activity/GroupProfile.react');

var _GroupProfile2 = _interopRequireDefault(_GroupProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ActivitySection = function (_Component) {
  _inherits(ActivitySection, _Component);

  ActivitySection.getStores = function getStores() {
    return [_DialogStore2.default, _DialogInfoStore2.default, _ActivityStore2.default];
  };

  ActivitySection.calculateState = function calculateState() {
    return {
      peer: _DialogStore2.default.getCurrentPeer(),
      info: _DialogInfoStore2.default.getState(),
      isOpen: _ActivityStore2.default.isOpen()
    };
  };

  function ActivitySection(props) {
    _classCallCheck(this, ActivitySection);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  ActivitySection.prototype.componentDidUpdate = function componentDidUpdate() {
    setImmediate(function () {
      window.dispatchEvent(new Event('resize'));
    });
  };

  ActivitySection.prototype.renderBody = function renderBody() {
    var _state = this.state,
        peer = _state.peer,
        info = _state.info;


    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        return _react2.default.createElement(_UserProfile2.default, { user: info });
      case _ActorAppConstants.PeerTypes.GROUP:
        return _react2.default.createElement(_GroupProfile2.default, { group: info });
      default:
        return null;
    }
  };

  ActivitySection.prototype.render = function render() {
    var _state2 = this.state,
        peer = _state2.peer,
        isOpen = _state2.isOpen;

    if (!isOpen || !peer) {
      return _react2.default.createElement('section', { className: 'activity' });
    }

    return _react2.default.createElement(
      'section',
      { className: 'activity activity--shown' },
      this.renderBody()
    );
  };

  return ActivitySection;
}(_react.Component);

exports.default = _utils.Container.create(ActivitySection);
//# sourceMappingURL=Activity.react.js.map