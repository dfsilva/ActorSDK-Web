'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _modalOpen = false,
    _currentStep = _ActorAppConstants.CreateGroupSteps.NAME_INPUT,
    _groupName = '',
    _selectedUserIds = new _immutable2.default.Set();

var CreateGroupStore = (function (_Store) {
  _inherits(CreateGroupStore, _Store);

  function CreateGroupStore(dispatcher) {
    _classCallCheck(this, CreateGroupStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CreateGroupStore).call(this, dispatcher));
  }

  _createClass(CreateGroupStore, [{
    key: 'isModalOpen',
    value: function isModalOpen() {
      return _modalOpen;
    }
  }, {
    key: 'getCurrentStep',
    value: function getCurrentStep() {
      return _currentStep;
    }
  }, {
    key: 'getGroupName',
    value: function getGroupName() {
      return _groupName;
    }
  }, {
    key: 'getSelectedUserIds',
    value: function getSelectedUserIds() {
      return _selectedUserIds;
    }
  }, {
    key: 'resetStore',
    value: function resetStore() {
      _modalOpen = false;
      _currentStep = _ActorAppConstants.CreateGroupSteps.NAME_INPUT;
      _groupName = '';
      _selectedUserIds = new _immutable2.default.Set();
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {

        case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_OPEN:
          _modalOpen = true;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.GROUP_CREATE_MODAL_CLOSE:
          this.resetStore();
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_NAME:
          _currentStep = _ActorAppConstants.CreateGroupSteps.CONTACTS_SELECTION;
          _groupName = action.name;
          this.__emitChange();
          break;

        //case ActionTypes.GROUP_CREATE_SET_AVATAR:
        //  _avatar = action.avatar;
        //  this.__emitChange();
        //  break;

        case _ActorAppConstants.ActionTypes.GROUP_CREATE_SET_MEMBERS:
          _selectedUserIds = action.selectedUserIds;
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.GROUP_CREATE:
          _currentStep = _ActorAppConstants.CreateGroupSteps.CREATION_STARTED;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.GROUP_CREATE_SUCCESS:
          this.resetStore();
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.GROUP_CREATE_ERROR:
          console.error('Failed to create group', action.error);
          this.__emitChange();
          break;
      }
    }
  }]);

  return CreateGroupStore;
})(_utils.Store);

exports.default = new CreateGroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=CreateGroupStore.js.map