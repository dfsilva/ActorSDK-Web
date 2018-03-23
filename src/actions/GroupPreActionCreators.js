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
          this.setBindings('groupspre', [
              ActorClient.bindGroupspre(parentId, this.setGroupsPre)
          ]);
      }, 500);
  }
}

export default new GroupPreActionCreators();