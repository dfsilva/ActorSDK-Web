/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { lightbox } from '../../utils/ImageUtils';
import { Container } from 'flux/utils';
import Scrollbar from '../common/Scrollbar.react';
import TextField from '../common/TextField.react';

import { escapeWithEmoji } from '../../utils/EmojiUtils'

import NotificationsActionCreators from '../../actions/NotificationsActionCreators';

import DialogStore from '../../stores/DialogStore';
import NotificationsStore from '../../stores/NotificationsStore';
import GroupStore from '../../stores/GroupStore';
import PeerStore from '../../stores/PeerStore';
import UserStore from '../../stores/UserStore';
import OnlineStore from '../../stores/OnlineStore';

import SvgIcon from '../common/SvgIcon.react';
import AvatarItem from '../common/AvatarItem.react';
import GroupProfileMembers from '../activity/GroupProfileMembers.react';
import GroupPreProperties from '../activity/GroupPreProperties.react';
import Fold from '../common/Fold.react';
import ToggleNotifications from '../common/ToggleNotifications.react';
import GroupPermissionsActionCreators from '../../actions/GroupPermissionsActionCreators'

class GroupProfile extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired
  };

  static getStores() {
    return [NotificationsStore, GroupStore, OnlineStore];
  }

  static calculateState(prevState, nextProps) {
    const gid = nextProps.group.id;
    const peer = gid ? PeerStore.getGroupPeer(gid) : null;
    const notificationEnabled = NotificationsStore.isNotificationsEnabled(peer);
    return {
      peer,
      isNotificationsEnabled: peer ? notificationEnabled : true,
      integrationToken: GroupStore.getToken(),
      message: OnlineStore.getMessage(),
      groupPermissions: GroupStore.getGroupPermissions()
    };
  }

  constructor(props) {
    super(props);

    this.handleNotificationChange = this.handleNotificationChange.bind(this);
    this.handleTokenSelect = this.handleTokenSelect.bind(this);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.handleGroupPermissionsFoldChange = this.handleGroupPermissionsFoldChange.bind(this);
    this.handleShowAdminsToMembersChange = this.handleShowAdminsToMembersChange.bind(this);
    this.handleCanMembersInviteChange = this.handleCanMembersInviteChange.bind(this);
    this.handleCanMembersEditGroupInfoChange = this.handleCanMembersEditGroupInfoChange.bind(this);
    this.handleCanAdminsEditGroupInfoChange = this.handleCanAdminsEditGroupInfoChange.bind(this);
    this.handleShowJoinLeaveMessagesChange = this.handleShowJoinLeaveMessagesChange.bind(this);
    this.handlerSavePermissions = this.handlerSavePermissions.bind(this);

  }

  handleNotificationChange(event) {
    const { peer } = this.state;
    NotificationsActionCreators.changeNotificationsEnabled(peer, event.target.checked);
  }

  handleTokenSelect(event) {
    event.target.select();
  }

  handleAvatarClick() {
    lightbox.open(this.props.group.bigAvatar);
  }

  handleGroupPermissionsFoldChange(foldState){
      if(foldState){
          GroupPermissionsActionCreators.loadGroupPermissions(this.props.group.id)
      }
  }

  handleShowAdminsToMembersChange(event) {
      this.setState({ ...this.state,
          groupPermissions: { ...this.state.groupPermissions,
            showAdminsToMembers: event.target.checked
          }
      });
  }

  handleCanMembersInviteChange(event) {
      this.setState({ ...this.state,
          groupPermissions: { ...this.state.groupPermissions,
              canMembersInvite: event.target.checked
          }
      });
  }

  handleCanMembersEditGroupInfoChange(event) {
      this.setState({ ...this.state,
          groupPermissions: { ...this.state.groupPermissions,
              canMembersEditGroupInfo: event.target.checked
          }
      });
  }

  handleCanAdminsEditGroupInfoChange(event) {
      this.setState({ ...this.state,
          groupPermissions: { ...this.state.groupPermissions,
              canAdminsEditGroupInfo: event.target.checked
          }
      });
  }

  handleShowJoinLeaveMessagesChange(event) {
      this.setState({ ...this.state,
          groupPermissions: { ...this.state.groupPermissions,
              showJoinLeaveMessages: event.target.checked
          }
      });
  }

  handlerSavePermissions(event){
      GroupPermissionsActionCreators.savePermissions(this.props.group.id, this.state.groupPermissions);
  }

  renderMainInfo() {
    const { group } = this.props;
    const admin = UserStore.getUser(group.ownerId);

    return (
      <header>
        <AvatarItem
          className="profile__avatar"
          size="large"
          image={group.bigAvatar}
          placeholder={group.placeholder}
          title={group.name}
          onClick={this.handleAvatarClick}
        />

        <h3
          className="group_profile__meta__title"
          dangerouslySetInnerHTML={{ __html: escapeWithEmoji(group.name) }}
        />

        <div className="group_profile__meta__created">
          <FormattedMessage id="createdBy"/>
          &nbsp;
          <span dangerouslySetInnerHTML={{ __html: escapeWithEmoji(admin.name) }}/>
        </div>
      </header>
    );
  }

  renderAbout() {
    const { group: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div
        className="group_profile__meta__description"
        dangerouslySetInnerHTML={{ __html: escapeWithEmoji(about).replace(/\n/g, '<br/>') }}
      />
    );
  }

  renderToken() {
    const { group: { ownerId } } = this.props;
    const { integrationToken } = this.state;
    const myId = UserStore.getMyId();

    if (ownerId !== myId) {
      return null;
    }

    return (
      <li className="profile__list__item group_profile__integration no-p">
        <Fold icon="power" iconClassName="icon--pink" title={<FormattedMessage id="integrationToken"/>}>

          <div className="info info--light">
            <p><FormattedMessage id="integrationTokenHint"/></p>
            <a href="https://actor.readme.io/docs/simple-integration" target="_blank"><FormattedMessage id="integrationTokenHelp"/></a>
          </div>

          <textarea
            className="textarea"
            onClick={this.handleTokenSelect}
            readOnly
            rows="3"
            value={integrationToken}/>
        </Fold>
      </li>
    );
  }

  renderGroupPermissions(){
      const { group: {isCanEditAdministration} } = this.props;
      const { groupPermissions } = this.state;

      if (!isCanEditAdministration) {
          return null;
      }

      return (
          <li className="profile__list__item group_profile__integration2 no-p">
              <Fold icon="lock_open" iconClassName="icon--squash" title="Security Configurations"
                    onStateChange={this.handleGroupPermissionsFoldChange}>
                  <ul className="profile__list">
                      <li className="profile__list__item no-p">
                          <label htmlFor="showAdminsToMembers">
                              {"Show Admins to Members"}
                              <div className="switch pull-right">
                                  <input
                                      checked={groupPermissions.showAdminsToMembers}
                                      id="showAdminsToMembers"
                                      type="checkbox"
                                      onChange={this.handleShowAdminsToMembersChange}
                                  />
                                  <label htmlFor="showAdminsToMembers"/>
                              </div>
                          </label>
                      </li>
                      <li className="profile__list__item no-p">
                          <label htmlFor="canMembersInvite">
                              {"Can Members Invite"}
                              <div className="switch pull-right">
                                  <input
                                      checked={groupPermissions.canMembersInvite}
                                      id="canMembersInvite"
                                      type="checkbox"
                                      onChange={this.handleCanMembersInviteChange}
                                  />
                                  <label htmlFor="canMembersInvite"/>
                              </div>
                          </label>
                      </li>
                      <li className="profile__list__item no-p">
                          <label htmlFor="canMembersEditGroupInfo">
                              {"Can Members Edit Group Info"}
                              <div className="switch pull-right">
                                  <input
                                      checked={groupPermissions.canMembersEditGroupInfo}
                                      id="canMembersEditGroupInfo"
                                      type="checkbox"
                                      onChange={this.handleCanMembersEditGroupInfoChange}
                                  />
                                  <label htmlFor="canMembersEditGroupInfo"/>
                              </div>
                          </label>
                      </li>
                      <li className="profile__list__item no-p">
                          <label htmlFor="canMembersEditGroupInfo">
                              {"Can Admins Edit Group Info"}
                              <div className="switch pull-right">
                                  <input
                                      checked={groupPermissions.canAdminsEditGroupInfo}
                                      id="canAdminsEditGroupInfo"
                                      type="checkbox"
                                      onChange={this.handleCanAdminsEditGroupInfoChange}
                                  />
                                  <label htmlFor="canAdminsEditGroupInfo"/>
                              </div>
                          </label>
                      </li>
                      <li className="profile__list__item no-p">
                          <label htmlFor="showJoinLeaveMessages">
                              {"Show Join Leave Messages"}
                              <div className="switch pull-right">
                                  <input
                                      checked={groupPermissions.showJoinLeaveMessages}
                                      id="showJoinLeaveMessages"
                                      type="checkbox"
                                      onChange={this.handleShowJoinLeaveMessagesChange}
                                  />
                                  <label htmlFor="showJoinLeaveMessages"/>
                              </div>
                          </label>
                      </li>
                  </ul>

                  <button className="button button--lightblue pull-left" ref="saveAdmins"
                          onClick={this.handlerSavePermissions}>
                      {"Save"}
                  </button>

              </Fold>
          </li>
      );
  }

  renderGroupPre() {
        const { group } = this.props;
        return (
            <li className="profile__list__item group_profile__integration no-p">
              <Fold icon="power" iconClassName="icon--pink" title="Criar Grupo Pre">

                <div className="info info--light">
                  <p><FormattedMessage id="integrationTokenHint"/></p>
                  <a href="https://actor.readme.io/docs/simple-integration" target="_blank"><FormattedMessage id="integrationTokenHelp"/></a>
                </div>

                <textarea
                    className="textarea"
                    onClick={this.handleTokenSelect}
                    readOnly
                    rows="3"
                    value={integrationToken}/>
              </Fold>
            </li>
        );
    }

  render() {
    const { group } = this.props;
    const { isNotificationsEnabled, message } = this.state;
    const isMember = DialogStore.isMember();

    const iconElement = (
      <SvgIcon className="icon icon--green" glyph="members" />
    );

    if (!isMember) {
      return (
        <div className="activity__body group_profile">
          <ul className="profile__list">
            <li className="profile__list__item group_profile__meta">
              {this.renderMainInfo()}
              {this.renderAbout()}
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div className="activity__body group_profile">
        <Scrollbar>
          <ul className="profile__list">
            <li className="profile__list__item group_profile__meta">
              {this.renderMainInfo()}
              {this.renderAbout()}
            </li>

            <li className="profile__list__item group_profile__notifications no-p">
              <ToggleNotifications
                  isNotificationsEnabled={isNotificationsEnabled}
                                   onNotificationChange={this.handleNotificationChange}/>
            </li>

            <li className="profile__list__item group_profile__members no-p">
              <Fold iconElement={iconElement} title={message}>
                <GroupProfileMembers groupId={group.id} members={group.members}/>
              </Fold>
            </li>

           {/* <li className="profile__list__item group_profile__group_pre no-p">
                <GroupPreProperties groupId={group.id} groups={[]}/>
            </li>*/}
            {this.renderToken()}
            {this.renderGroupPermissions()}
          </ul>
        </Scrollbar>
      </div>
    );
  }
}

export default Container.create(GroupProfile, { withProps: true, pure: false });
