/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils';

import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { AsyncActionStates } from '../constants/ActorAppConstants';
import JoinGroupStore from '../stores/JoinGroupStore';
import JoinGroupActions from '../actions/JoinGroupActions';

class Join extends Component {
  static propTypes = {
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  };

  static getStores() {
    return [JoinGroupStore];
  }

  static calculateState() {
    return JoinGroupStore.getState();
  }

  constructor(props) {
    super(props);

    JoinGroupActions.joinGroupViaLink(props.params.token);
  }

  renderStatus() {
    const { status, token, error } = this.state;
    switch (status) {
      case AsyncActionStates.PROCESSING:
      case AsyncActionStates.PENDING:
        return (
            <div>
              <div className="preloader"><div/><div/><div/><div/><div/></div>
              <div className="join__message">
                  <FormattedMessage id="join.joining" values={{ token: token }}/>
              </div>
            </div>
        );
      case AsyncActionStates.SUCCESS:
        return (
          <div className="join__message join__message--success">
              <FormattedMessage id="join.success" values={{}}/>
          </div>
        );

      case AsyncActionStates.FAILURE:
        return (
          <div className="join__message join__message--error">
            {error}
          </div>
        );
    }
  }

  render() {
    return (
      <div className="join__container">
        {this.renderStatus()}
      </div>
    );
  }
}

export default Container.create(Join);
