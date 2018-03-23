/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import { dispatch, dispatchAsync } from '../dispatcher/ActorAppDispatcher';
import { ActionTypes } from '../constants/ActorAppConstants';
import ActorClient from "../utils/ActorClient";

import ActionCreators from "./ActionCreators";
import EditGroupStore from "../stores/EditGroupStore";

class GroupPermissionsActionCreators extends ActionCreators {

    loadGroupPermissions(gid) {
        dispatch(ActionTypes.GROUP_PERMISSIONS_LOAD);
        ActorClient.loadGroupPermissions(gid).then((permissions) => {
            dispatch(ActionTypes.GROUP_PERMISSIONS_LOAD_SUCCESS, { permissions });
        }).catch((error) => {
            dispatch(ActionTypes.GROUP_PERMISSIONS_LOAD_ERROR, { error });
        });
    }

    savePermissions(gid, groupPermissions){
        dispatchAsync(ActorClient.saveGroupAdminSettings(gid, groupPermissions), {
            request: ActionTypes.GROUP_PERMISSIONS_SAVE,
            success: ActionTypes.GROUP_PERMISSIONS_SAVE_SUCCESS,
            failure: ActionTypes.GROUP_PERMISSIONS_SAVE_ERROR
        }, { gid, groupPermissions });
    }

}

export default new GroupPermissionsActionCreators();