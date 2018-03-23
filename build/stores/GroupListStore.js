'use strict';

exports.__esModule = true;

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

var GroupListStore = function (_ReduceStore) {
  _inherits(GroupListStore, _ReduceStore);

  function GroupListStore() {
    _classCallCheck(this, GroupListStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  GroupListStore.prototype.getInitialState = function getInitialState() {
    return [];
  };

  GroupListStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_SUCCESS:
        return action.response;
      case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_ERROR:
        return state;
      default:
        return state;
    }
  };

  return GroupListStore;
}(_utils.ReduceStore);

exports.default = new GroupListStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=GroupListStore.js.map