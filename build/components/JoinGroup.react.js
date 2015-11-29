'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _requireAuth = require('../utils/require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _JoinGroupActions = require('../actions/JoinGroupActions');

var _JoinGroupActions2 = _interopRequireDefault(_JoinGroupActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var JoinGroup = (function (_Component) {
  _inherits(JoinGroup, _Component);

  function JoinGroup(props) {
    _classCallCheck(this, JoinGroup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JoinGroup).call(this, props));

    _JoinGroupActions2.default.joinGroupViaLink(props.params.token);
    return _this;
  }

  _createClass(JoinGroup, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return JoinGroup;
})(_react.Component);

JoinGroup.propTypes = {
  params: _react.PropTypes.object
};
exports.default = (0, _requireAuth2.default)(JoinGroup);