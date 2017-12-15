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
        <li>
          <input type="checkbox" name="vehicle" value="Bike"/> Grupo Publico
        </li>
        <li>
            <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </li>
      </ul>
    );
  }
}

export default GroupPreProperties;
