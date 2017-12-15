/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import { dispatch } from '../dispatcher/ActorAppDispatcher';
import { ActionTypes } from '../constants/ActorAppConstants';
import ActorClient from '../utils/ActorClient';

class ChannelsActionCreators {
  setChannels(channels) {
    dispatch(ActionTypes.CHANNEL_LIST_SET, { channels });
  }
}

export default new ChannelsActionCreators();
