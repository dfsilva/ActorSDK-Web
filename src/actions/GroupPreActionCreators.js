/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import { dispatch, dispatchAsync } from '../dispatcher/ActorAppDispatcher';
import { ActionTypes } from '../constants/ActorAppConstants';
import ActorClient from "../utils/ActorClient";

import ActionCreators from "./ActionCreators";

class GroupPreActionCreators extends ActionCreators {

  setGroupsPre(groupspre){
      dispatch(ActionTypes.GROUPPRE_LOAD_SUCCESS, { groupspre })
  }

  showGroupsPre(parentId){
      setTimeout(() => {
          const bindings = [
              ActorClient.bindGroupspre(parentId, this.setGroupsPre)
          ];
          this.setBindings('groupspre', bindings);
      }, 500);
  }

  loadGroups() {
      setTimeout(() => {
          dispatch(ActionTypes.GROUPPRE_ADD_GROUP, { })
      }, 1000);
  }
}

export default new GroupPreActionCreators();