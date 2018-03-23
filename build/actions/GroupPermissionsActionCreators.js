'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

var _EditGroupStore = require('../stores/EditGroupStore');

var _EditGroupStore2 = _interopRequireDefault(_EditGroupStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupPermissionsActionCreators = function (_ActionCreators) {
    _inherits(GroupPermissionsActionCreators, _ActionCreators);

    function GroupPermissionsActionCreators() {
        _classCallCheck(this, GroupPermissionsActionCreators);

        return _possibleConstructorReturn(this, _ActionCreators.apply(this, arguments));
    }

    GroupPermissionsActionCreators.prototype.loadGroupPermissions = function loadGroupPermissions(gid) {
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_LOAD);
        _ActorClient2.default.loadGroupPermissions(gid).then(function (permissions) {
            (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_LOAD_SUCCESS, { permissions: permissions });
        }).catch(function (error) {
            (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_LOAD_ERROR, { error: error });
        });
    };

    GroupPermissionsActionCreators.prototype.savePermissions = function savePermissions(gid, groupPermissions) {
        (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.saveGroupAdminSettings(gid, groupPermissions), {
            request: _ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_SAVE,
            success: _ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_SAVE_SUCCESS,
            failure: _ActorAppConstants.ActionTypes.GROUP_PERMISSIONS_SAVE_ERROR
        }, { gid: gid, groupPermissions: groupPermissions });
    };

    return GroupPermissionsActionCreators;
}(_ActionCreators3.default);

exports.default = new GroupPermissionsActionCreators();
//# sourceMappingURL=GroupPermissionsActionCreators.js.map