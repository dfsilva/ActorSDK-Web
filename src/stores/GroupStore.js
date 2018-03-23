/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/ActorAppDispatcher';
import { ActionTypes } from '../constants/ActorAppConstants';
import ActorClient from '../utils/ActorClient';

class GroupStore extends ReduceStore {

    static defaultGroupPermissions = {
        showAdminsToMembers: false,
        canMembersInvite: false,
        canMembersEditGroupInfo: false,
        canAdminsEditGroupInfo: false,
        showJoinLeaveMessages: false
    };

  getInitialState() {
    return {
      token: null,
      groupPermissionsLoading: true,
      groupPermissions: GroupStore.defaultGroupPermissions
    };
  }

  reduce(state, action) {
    switch (action.type) {

      case ActionTypes.GROUP_GET_TOKEN:
        return state;
      case ActionTypes.GROUP_GET_TOKEN_SUCCESS:
        return {
          ...state,
          token: action.response
        }
      case ActionTypes.GROUP_PERMISSIONS_LOAD:
        return {
            ...state,
            groupPermissionsLoading: true,
            groupPermissions: GroupStore.defaultGroupPermissions
        }
      case ActionTypes.GROUP_PERMISSIONS_LOAD_SUCCESS:
        return {
            ...state,
            groupPermissionsLoading: false,
            groupPermissions: action.permissions
        }
      case ActionTypes.GROUP_PERMISSIONS_LOAD_ERROR:
        return {
            ...state,
            adminSettingsLoading: false,
            groupPermissions: GroupStore.defaultGroupPermissions
        }
      case ActionTypes.GROUP_GET_TOKEN_ERROR:
        return state;
      case ActionTypes.GROUP_PERMISSIONS_SAVE_SUCCESS:
      case ActionTypes.GROUP_PERMISSIONS_SAVE_ERROR:
      case ActionTypes.GROUP_PERMISSIONS_SAVE:
          return {
              ...state,
              groupPermissions: action.groupPermissions
          }
      case ActionTypes.GROUP_CLEAR:
      case ActionTypes.GROUP_CLEAR_SUCCESS:
      case ActionTypes.GROUP_CLEAR_ERROR:
      case ActionTypes.GROUP_LEAVE:
      case ActionTypes.GROUP_LEAVE_SUCCESS:
      case ActionTypes.GROUP_LEAVE_ERROR:
      case ActionTypes.GROUP_DELETE:
      case ActionTypes.GROUP_DELETE_SUCCESS:
      case ActionTypes.GROUP_DELETE_ERROR:
      default:
        return state;
    }
  }

  /**
   * Get group information
   *
   * @param gid {number} Group id
   * @returns {object} Group information
   */
  getGroup(gid) {
    return ActorClient.getGroup(gid);
  }

  /**
   * Get group integration token
   *
   * @returns {string|null}
   */
  getToken() {
    return this.getState().token;
  }

    /**
     * @returns {{showAdminsToMembers: boolean,
     * canMembersInvite: boolean,
     * canMembersEditGroupInfo: boolean,
     * canAdminsEditGroupInfo: boolean,
     * showJoinLeaveMessages: boolean}|*}
     */
  getGroupPermissions(){
      return this.getState().groupPermissions;
  }
}

export default new GroupStore(Dispatcher);
