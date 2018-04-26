'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ImageUtils = require('../../utils/ImageUtils');

var _utils = require('flux/utils');

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _TextField = require('../common/TextField.react');

var _TextField2 = _interopRequireDefault(_TextField);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _NotificationsActionCreators = require('../../actions/NotificationsActionCreators');

var _NotificationsActionCreators2 = _interopRequireDefault(_NotificationsActionCreators);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _NotificationsStore = require('../../stores/NotificationsStore');

var _NotificationsStore2 = _interopRequireDefault(_NotificationsStore);

var _GroupStore = require('../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _PeerStore = require('../../stores/PeerStore');

var _PeerStore2 = _interopRequireDefault(_PeerStore);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _OnlineStore = require('../../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _GroupProfileMembers = require('../activity/GroupProfileMembers.react');

var _GroupProfileMembers2 = _interopRequireDefault(_GroupProfileMembers);

var _GroupPreProperties = require('../activity/GroupPreProperties.react');

var _GroupPreProperties2 = _interopRequireDefault(_GroupPreProperties);

var _Fold = require('../common/Fold.react');

var _Fold2 = _interopRequireDefault(_Fold);

var _ToggleNotifications = require('../common/ToggleNotifications.react');

var _ToggleNotifications2 = _interopRequireDefault(_ToggleNotifications);

var _GroupPermissionsActionCreators = require('../../actions/GroupPermissionsActionCreators');

var _GroupPermissionsActionCreators2 = _interopRequireDefault(_GroupPermissionsActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupProfile = function (_Component) {
  _inherits(GroupProfile, _Component);

  GroupProfile.getStores = function getStores() {
    return [_NotificationsStore2.default, _GroupStore2.default, _OnlineStore2.default];
  };

  GroupProfile.calculateState = function calculateState(prevState, nextProps) {
    var gid = nextProps.group.id;
    var peer = gid ? _PeerStore2.default.getGroupPeer(gid) : null;
    var notificationEnabled = _NotificationsStore2.default.isNotificationsEnabled(peer);
    return {
      peer: peer,
      isNotificationsEnabled: peer ? notificationEnabled : true,
      integrationToken: _GroupStore2.default.getToken(),
      message: _OnlineStore2.default.getMessage(),
      groupPermissions: _GroupStore2.default.getGroupPermissions()
    };
  };

  function GroupProfile(props) {
    _classCallCheck(this, GroupProfile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleNotificationChange = _this.handleNotificationChange.bind(_this);
    _this.handleTokenSelect = _this.handleTokenSelect.bind(_this);
    _this.handleAvatarClick = _this.handleAvatarClick.bind(_this);
    _this.handleGroupPermissionsFoldChange = _this.handleGroupPermissionsFoldChange.bind(_this);
    _this.handleShowAdminsToMembersChange = _this.handleShowAdminsToMembersChange.bind(_this);
    _this.handleCanMembersInviteChange = _this.handleCanMembersInviteChange.bind(_this);
    _this.handleCanMembersEditGroupInfoChange = _this.handleCanMembersEditGroupInfoChange.bind(_this);
    _this.handleCanAdminsEditGroupInfoChange = _this.handleCanAdminsEditGroupInfoChange.bind(_this);
    _this.handleShowJoinLeaveMessagesChange = _this.handleShowJoinLeaveMessagesChange.bind(_this);
    _this.handlerSavePermissions = _this.handlerSavePermissions.bind(_this);

    return _this;
  }

  GroupProfile.prototype.handleNotificationChange = function handleNotificationChange(event) {
    var peer = this.state.peer;

    _NotificationsActionCreators2.default.changeNotificationsEnabled(peer, event.target.checked);
  };

  GroupProfile.prototype.handleTokenSelect = function handleTokenSelect(event) {
    event.target.select();
  };

  GroupProfile.prototype.handleAvatarClick = function handleAvatarClick() {
    _ImageUtils.lightbox.open(this.props.group.bigAvatar);
  };

  GroupProfile.prototype.handleGroupPermissionsFoldChange = function handleGroupPermissionsFoldChange(foldState) {
    if (foldState) {
      _GroupPermissionsActionCreators2.default.loadGroupPermissions(this.props.group.id);
    }
  };

  GroupProfile.prototype.handleShowAdminsToMembersChange = function handleShowAdminsToMembersChange(event) {
    this.setState(_extends({}, this.state, {
      groupPermissions: _extends({}, this.state.groupPermissions, {
        showAdminsToMembers: event.target.checked
      })
    }));
  };

  GroupProfile.prototype.handleCanMembersInviteChange = function handleCanMembersInviteChange(event) {
    this.setState(_extends({}, this.state, {
      groupPermissions: _extends({}, this.state.groupPermissions, {
        canMembersInvite: event.target.checked
      })
    }));
  };

  GroupProfile.prototype.handleCanMembersEditGroupInfoChange = function handleCanMembersEditGroupInfoChange(event) {
    this.setState(_extends({}, this.state, {
      groupPermissions: _extends({}, this.state.groupPermissions, {
        canMembersEditGroupInfo: event.target.checked
      })
    }));
  };

  GroupProfile.prototype.handleCanAdminsEditGroupInfoChange = function handleCanAdminsEditGroupInfoChange(event) {
    this.setState(_extends({}, this.state, {
      groupPermissions: _extends({}, this.state.groupPermissions, {
        canAdminsEditGroupInfo: event.target.checked
      })
    }));
  };

  GroupProfile.prototype.handleShowJoinLeaveMessagesChange = function handleShowJoinLeaveMessagesChange(event) {
    this.setState(_extends({}, this.state, {
      groupPermissions: _extends({}, this.state.groupPermissions, {
        showJoinLeaveMessages: event.target.checked
      })
    }));
  };

  GroupProfile.prototype.handlerSavePermissions = function handlerSavePermissions(event) {
    _GroupPermissionsActionCreators2.default.savePermissions(this.props.group.id, this.state.groupPermissions);
  };

  GroupProfile.prototype.renderMainInfo = function renderMainInfo() {
    var group = this.props.group;

    var admin = _UserStore2.default.getUser(group.ownerId);

    return _react2.default.createElement(
      'header',
      null,
      _react2.default.createElement(_AvatarItem2.default, {
        className: 'profile__avatar',
        size: 'large',
        image: group.bigAvatar,
        placeholder: group.placeholder,
        title: group.name,
        onClick: this.handleAvatarClick
      }),
      _react2.default.createElement('h3', {
        className: 'group_profile__meta__title',
        dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.name) }
      }),
      _react2.default.createElement(
        'div',
        { className: 'group_profile__meta__created' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'createdBy' }),
        '\xA0',
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(admin.name) } })
      )
    );
  };

  GroupProfile.prototype.renderAbout = function renderAbout() {
    var about = this.props.group.about;


    if (!about) {
      return null;
    }

    return _react2.default.createElement('div', {
      className: 'group_profile__meta__description',
      dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(about).replace(/\n/g, '<br/>') }
    });
  };

  GroupProfile.prototype.renderToken = function renderToken() {
    var ownerId = this.props.group.ownerId;
    var integrationToken = this.state.integrationToken;

    var myId = _UserStore2.default.getMyId();

    if (ownerId !== myId) {
      return null;
    }

    return _react2.default.createElement(
      'li',
      { className: 'profile__list__item group_profile__integration no-p' },
      _react2.default.createElement(
        _Fold2.default,
        { icon: 'power', iconClassName: 'icon--pink', title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'integrationToken' }) },
        _react2.default.createElement(
          'div',
          { className: 'info info--light' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'integrationTokenHint' })
          ),
          _react2.default.createElement(
            'a',
            { href: 'https://actor.readme.io/docs/simple-integration', target: '_blank' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'integrationTokenHelp' })
          )
        ),
        _react2.default.createElement('textarea', {
          className: 'textarea',
          onClick: this.handleTokenSelect,
          readOnly: true,
          rows: '3',
          value: integrationToken })
      )
    );
  };

  GroupProfile.prototype.renderGroupPermissions = function renderGroupPermissions() {
    var isCanEditAdministration = this.props.group.isCanEditAdministration;
    var groupPermissions = this.state.groupPermissions;


    if (!isCanEditAdministration) {
      return null;
    }

    return _react2.default.createElement(
      'li',
      { className: 'profile__list__item group_profile__integration2 no-p' },
      _react2.default.createElement(
        _Fold2.default,
        { icon: 'lock_open', iconClassName: 'icon--squash', title: 'Security Configurations',
          onStateChange: this.handleGroupPermissionsFoldChange },
        _react2.default.createElement(
          'ul',
          { className: 'profile__list' },
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'showAdminsToMembers' },
              "Show Admins to Members",
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', {
                  checked: groupPermissions.showAdminsToMembers,
                  id: 'showAdminsToMembers',
                  type: 'checkbox',
                  onChange: this.handleShowAdminsToMembersChange
                }),
                _react2.default.createElement('label', { htmlFor: 'showAdminsToMembers' })
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'canMembersInvite' },
              "Can Members Invite",
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', {
                  checked: groupPermissions.canMembersInvite,
                  id: 'canMembersInvite',
                  type: 'checkbox',
                  onChange: this.handleCanMembersInviteChange
                }),
                _react2.default.createElement('label', { htmlFor: 'canMembersInvite' })
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'canMembersEditGroupInfo' },
              "Can Members Edit Group Info",
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', {
                  checked: groupPermissions.canMembersEditGroupInfo,
                  id: 'canMembersEditGroupInfo',
                  type: 'checkbox',
                  onChange: this.handleCanMembersEditGroupInfoChange
                }),
                _react2.default.createElement('label', { htmlFor: 'canMembersEditGroupInfo' })
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'canMembersEditGroupInfo' },
              "Can Admins Edit Group Info",
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', {
                  checked: groupPermissions.canAdminsEditGroupInfo,
                  id: 'canAdminsEditGroupInfo',
                  type: 'checkbox',
                  onChange: this.handleCanAdminsEditGroupInfoChange
                }),
                _react2.default.createElement('label', { htmlFor: 'canAdminsEditGroupInfo' })
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'showJoinLeaveMessages' },
              "Show Join Leave Messages",
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', {
                  checked: groupPermissions.showJoinLeaveMessages,
                  id: 'showJoinLeaveMessages',
                  type: 'checkbox',
                  onChange: this.handleShowJoinLeaveMessagesChange
                }),
                _react2.default.createElement('label', { htmlFor: 'showJoinLeaveMessages' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'button',
          { className: 'button button--lightblue pull-left', ref: 'saveAdmins',
            onClick: this.handlerSavePermissions },
          "Save"
        )
      )
    );
  };

  GroupProfile.prototype.renderGroupPre = function renderGroupPre() {
    var group = this.props.group;

    return _react2.default.createElement(
      'li',
      { className: 'profile__list__item group_profile__integration no-p' },
      _react2.default.createElement(
        _Fold2.default,
        { icon: 'power', iconClassName: 'icon--pink', title: 'Criar Grupo Pre' },
        _react2.default.createElement(
          'div',
          { className: 'info info--light' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'integrationTokenHint' })
          ),
          _react2.default.createElement(
            'a',
            { href: 'https://actor.readme.io/docs/simple-integration', target: '_blank' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'integrationTokenHelp' })
          )
        ),
        _react2.default.createElement('textarea', {
          className: 'textarea',
          onClick: this.handleTokenSelect,
          readOnly: true,
          rows: '3',
          value: integrationToken })
      )
    );
  };

  GroupProfile.prototype.render = function render() {
    var group = this.props.group;
    var _state = this.state,
        isNotificationsEnabled = _state.isNotificationsEnabled,
        message = _state.message;

    var isMember = _DialogStore2.default.isMember();

    var iconElement = _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--green', glyph: 'members' });

    if (!isMember) {
      return _react2.default.createElement(
        'div',
        { className: 'activity__body group_profile' },
        _react2.default.createElement(
          'ul',
          { className: 'profile__list' },
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item group_profile__meta' },
            this.renderMainInfo(),
            this.renderAbout()
          )
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'activity__body group_profile' },
      _react2.default.createElement(
        _Scrollbar2.default,
        null,
        _react2.default.createElement(
          'ul',
          { className: 'profile__list' },
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item group_profile__meta' },
            this.renderMainInfo(),
            this.renderAbout()
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item group_profile__notifications no-p' },
            _react2.default.createElement(_ToggleNotifications2.default, {
              isNotificationsEnabled: isNotificationsEnabled,
              onNotificationChange: this.handleNotificationChange })
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item group_profile__members no-p' },
            _react2.default.createElement(
              _Fold2.default,
              { iconElement: iconElement, title: message },
              _react2.default.createElement(_GroupProfileMembers2.default, { groupId: group.id, members: group.members })
            )
          ),
          this.renderToken(),
          this.renderGroupPermissions()
        )
      )
    );
  };

  return GroupProfile;
}(_react.Component);

GroupProfile.propTypes = {
  group: _react.PropTypes.object.isRequired
};
exports.default = _utils.Container.create(GroupProfile, { withProps: true, pure: false });
//# sourceMappingURL=GroupProfile.react.js.map