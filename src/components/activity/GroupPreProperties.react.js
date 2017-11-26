/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';

class GroupPreProperties extends Component {
  static propTypes = {
    groupId: PropTypes.number,
    groups: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <ul className="group_profile__members__list">

      </ul>
    );
  }
}

export default GroupPreProperties;
