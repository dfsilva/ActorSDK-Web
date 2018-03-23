'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GrouppreStore = function (_ReduceStore) {
    _inherits(GrouppreStore, _ReduceStore);

    function GrouppreStore() {
        _classCallCheck(this, GrouppreStore);

        return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
    }

    GrouppreStore.prototype.getInitialState = function getInitialState() {
        return {
            groups: [],
            parentId: 0,
            isLoading: true,
            isLoaded: false,
            isGroupsLoaded: false
        };
    };

    GrouppreStore.prototype.reduce = function reduce(state, action) {
        switch (action.type) {
            case _ActorAppConstants.ActionTypes.GROUPPRE_LOAD_SUCCESS:
                return _extends({}, state, {
                    isLoading: false,
                    isLoaded: true,
                    groups: action.groupspre
                });
            case _ActorAppConstants.ActionTypes.GROUPPRE_ADD_GROUP:
                return _extends({}, state, {
                    isGroupsLoaded: true
                });
            default:
                return state;
        }
    };

    GrouppreStore.prototype.getIsLoading = function getIsLoading() {
        return this.getState().isLoading;
    };

    GrouppreStore.prototype.getIsLoaded = function getIsLoaded() {
        return this.getState().isLoaded;
    };

    GrouppreStore.prototype.getIsGroupsLoaded = function getIsGroupsLoaded() {
        return this.getState().isGroupsLoaded;
    };

    GrouppreStore.prototype.getGroups = function getGroups() {
        return this.getState().groups;
    };

    GrouppreStore.prototype.getParentId = function getParentId() {
        return this.getState().parentId;
    };

    return GrouppreStore;
}(_utils.ReduceStore);

exports.default = new GrouppreStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=GrouppreStore.js.map