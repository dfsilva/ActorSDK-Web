'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupPreActionCreators = function (_ActionCreators) {
    _inherits(GroupPreActionCreators, _ActionCreators);

    function GroupPreActionCreators() {
        _classCallCheck(this, GroupPreActionCreators);

        return _possibleConstructorReturn(this, _ActionCreators.apply(this, arguments));
    }

    GroupPreActionCreators.prototype.setGroupsPre = function setGroupsPre(groupspre) {
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUPPRE_LOAD_SUCCESS, { groupspre: groupspre });
    };

    GroupPreActionCreators.prototype.showGroupsPre = function showGroupsPre(parentId) {
        var _this2 = this;

        setTimeout(function () {
            var bindings = [_ActorClient2.default.bindGroupspre(parentId, _this2.setGroupsPre)];
            _this2.setBindings('groupspre', bindings);
        }, 500);
    };

    GroupPreActionCreators.prototype.loadGroups = function loadGroups() {
        setTimeout(function () {
            (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUPPRE_ADD_GROUP, {});
        }, 1000);
    };

    return GroupPreActionCreators;
}(_ActionCreators3.default);

exports.default = new GroupPreActionCreators();
//# sourceMappingURL=GroupPreActionCreators.js.map