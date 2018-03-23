/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/ActorAppDispatcher';
import { ActionTypes, AsyncActionStates } from '../constants/ActorAppConstants';

class GrouppreStore extends ReduceStore {

    getInitialState() {
        return {
            groups: [],
            parentId: 0,
            isLoading: true,
            isLoaded: false,
            isGroupsLoaded: false
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.GROUPPRE_LOAD_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    isLoaded: true,
                    groups: action.groupspre
                }
            case ActionTypes.GROUPPRE_ADD_GROUP:
                return {
                    ...state,
                    isGroupsLoaded: true
                }
            default:
                return state;
        }
    }

    getIsLoading() {
        return this.getState().isLoading;
    }

    getIsLoaded(){
        return this.getState().isLoaded;
    }

    getIsGroupsLoaded(){
        return this.getState().isGroupsLoaded;
    }

    getGroups() {
        return this.getState().groups;
    }

    getParentId(){
        return this.getState().parentId;
    }
}

export default new GrouppreStore(Dispatcher);
