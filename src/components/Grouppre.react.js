/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

import { map, debounce } from 'lodash';
import React, { Component} from 'react';
import { Container } from 'flux/utils';
import classnames from 'classnames';
import { Link } from 'react-router';

import GrouppreStore from '../stores/GrouppreStore';
import GroupPreActionCreators from "../actions/GroupPreActionCreators";

import AvatarItem from './common/AvatarItem.react';
import Scrollbar from './common/Scrollbar.react';
import ActorClient from "../utils/ActorClient";

class Grouppre extends Component {

  static getStores() {
    return [GrouppreStore];
  }

  static calculateState() {
    return {
      parentId: GrouppreStore.getParentId(),
      isLoading: GrouppreStore.getIsLoading(),
      isAllLoaded: GrouppreStore.getIsLoaded(),
      groups: GrouppreStore.getGroups()
    }
  }

  constructor(props){
     super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
      GroupPreActionCreators.removeBindings('groupspre');
  }

  componentDidUpdate() {
  }

  componentDidMount() {
      const {parentId} = this.state
      GroupPreActionCreators.showGroupsPre(parentId);
  }

  render() {
    const { isLoading, groups } = this.state;

    const archiveClassname = classnames('archive-section', {
      'archive-section--loading': isLoading
    });

    const groupsList = map(groups, (grouppre, index) => {
        const { groupId, parentId, hasChildren } = grouppre;
        const group = ActorClient.getGroup(groupId);
        const groupPeer = ActorClient.getGroupPeer(groupId);
        return (
            <div className="archive-section__list__item col-xs-12 col-sm-12 col-md-12 col-lg-12" key={index}>
                {group.isMember ?
                    <Link to={`/im/${groupPeer.key}`} className="archive-item row">
                        <div className="archive-item__user">
                            <AvatarItem
                                className="archive-item__avatar"
                                size="medium"
                                image={group.avatar}
                                placeholder={group.placeholder}
                                title={group.name}
                            />
                        </div>
                        <div className="col-xs">
                            <h4 className="archive-item__title">{group.name}</h4>
                        </div>
                    </Link>
                    :
                    <Link to={`/im/join/${group.shortName}`} className="archive-item row">
                        <div className="archive-item__user">
                            <AvatarItem
                                className="archive-item__avatar"
                                size="medium"
                                image={group.avatar}
                                placeholder={group.placeholder}
                                title={group.name}
                            />
                        </div>
                        <div className="col-xs">
                            <h4 className="archive-item__title">{group.name}</h4>
                        </div>
                    </Link>
                }
            </div>
        )
    });

      return (
          <section className="main">
              <header className="toolbar row color--white">
                  <h3>Predefined Groups</h3>
              </header>
              <div className="flexrow">
                  <section className={archiveClassname}>
                      <Scrollbar ref="archiveScroll">
                          <div className="archive-section__list row">
                              {
                                  groups.length !== 0 ?
                                      groupsList :
                                      !isLoading
                                      ? <div className="archive-section__list__item archive-section__list__item--empty col-xs-12">
                                          <h3>No predefined groups</h3>
                                        </div>
                                      : null
                              }
                              {
                                  isLoading
                                      ? <div className="archive-section__list__item archive-section__list__item--loading col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                          <div className="preloader"><div/><div/><div/><div/><div/></div>
                                      </div>
                                      : null
                              }
                          </div>
                      </Scrollbar>
                  </section>
              </div>
          </section>
      );
  }
}

export default Container.create(Grouppre, { pure: false });
