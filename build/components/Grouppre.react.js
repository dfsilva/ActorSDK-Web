'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

var _GrouppreStore = require('../stores/GrouppreStore');

var _GrouppreStore2 = _interopRequireDefault(_GrouppreStore);

var _GroupPreActionCreators = require('../actions/GroupPreActionCreators');

var _GroupPreActionCreators2 = _interopRequireDefault(_GroupPreActionCreators);

var _AvatarItem = require('./common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Scrollbar = require('./common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Grouppre = function (_Component) {
    _inherits(Grouppre, _Component);

    Grouppre.getStores = function getStores() {
        return [_GrouppreStore2.default];
    };

    Grouppre.calculateState = function calculateState() {
        return {
            parentId: _GrouppreStore2.default.getParentId(),
            isLoading: _GrouppreStore2.default.getIsLoading(),
            isLoaded: _GrouppreStore2.default.getIsLoaded(),
            isGroupsLoaded: _GrouppreStore2.default.getIsGroupsLoaded(),
            groups: _GrouppreStore2.default.getGroups()
        };
    };

    function Grouppre(props) {
        _classCallCheck(this, Grouppre);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    Grouppre.prototype.componentWillMount = function componentWillMount() {};

    Grouppre.prototype.componentWillUnmount = function componentWillUnmount() {
        _GroupPreActionCreators2.default.removeBindings('groupspre');
    };

    Grouppre.prototype.componentDidUpdate = function componentDidUpdate() {
        this.checkGroupspreLoaded();
    };

    Grouppre.prototype.checkGroupspreLoaded = function checkGroupspreLoaded() {
        var _state = this.state,
            isLoaded = _state.isLoaded,
            isGroupsLoaded = _state.isGroupsLoaded;

        if (isLoaded && !isGroupsLoaded) {
            _GroupPreActionCreators2.default.loadGroups();
        }
    };

    Grouppre.prototype.componentDidMount = function componentDidMount() {
        var parentId = this.state.parentId;

        _GroupPreActionCreators2.default.showGroupsPre(parentId);
    };

    Grouppre.prototype.render = function render() {
        var _state2 = this.state,
            isLoading = _state2.isLoading,
            groups = _state2.groups;


        var archiveClassname = (0, _classnames2.default)('archive-section', {
            'archive-section--loading': isLoading
        });

        var groupsList = (0, _lodash.map)(groups, function (grouppre, index) {
            var groupId = grouppre.groupId,
                parentId = grouppre.parentId,
                hasChildren = grouppre.hasChildren;

            var group = _ActorClient2.default.getGroup(groupId);
            var groupPeer = _ActorClient2.default.getGroupPeer(groupId);
            return _react2.default.createElement(
                'div',
                { className: 'archive-section__list__item col-xs-12 col-sm-12 col-md-12 col-lg-12', key: index },
                group.isMember ? _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/im/' + groupPeer.key, className: 'archive-item row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'archive-item__user margin_top_8px' },
                        _react2.default.createElement(_AvatarItem2.default, {
                            className: 'archive-item__avatar',
                            size: 'medium',
                            image: group.avatar,
                            placeholder: group.placeholder,
                            title: group.name
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'archive-item__title' },
                            group.name,
                            group.restrictedDomains ? " (" + group.restrictedDomains + ")" : ""
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'archive-item__subtitle' },
                            group.about
                        )
                    )
                ) : _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/im/join/' + group.shortName, className: 'archive-item row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'archive-item__user margin_top_8px' },
                        _react2.default.createElement(_AvatarItem2.default, {
                            className: 'archive-item__avatar',
                            size: 'medium',
                            image: group.avatar,
                            placeholder: group.placeholder,
                            title: group.name
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'archive-item__title' },
                            group.name,
                            group.restrictedDomains ? " (" + group.restrictedDomains + ")" : ""
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'archive-item__subtitle' },
                            group.about
                        )
                    )
                )
            );
        });

        return _react2.default.createElement(
            'section',
            { className: 'main' },
            _react2.default.createElement(
                'header',
                { className: 'toolbar row color--white' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Predefined Groups'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'flexrow' },
                _react2.default.createElement(
                    'section',
                    { className: archiveClassname },
                    _react2.default.createElement(
                        _Scrollbar2.default,
                        { ref: 'archiveScroll' },
                        _react2.default.createElement(
                            'div',
                            { className: 'archive-section__list row' },
                            groups.length !== 0 ? groupsList : !isLoading ? _react2.default.createElement(
                                'div',
                                { className: 'archive-section__list__item archive-section__list__item--empty col-xs-12' },
                                _react2.default.createElement(
                                    'h3',
                                    null,
                                    'No predefined groups'
                                )
                            ) : null,
                            isLoading ? _react2.default.createElement(
                                'div',
                                { className: 'archive-section__list__item archive-section__list__item--loading col-xs-12 col-sm-12 col-md-12 col-lg-12' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'preloader' },
                                    _react2.default.createElement('div', null),
                                    _react2.default.createElement('div', null),
                                    _react2.default.createElement('div', null),
                                    _react2.default.createElement('div', null),
                                    _react2.default.createElement('div', null)
                                )
                            ) : null
                        )
                    )
                )
            )
        );
    };

    return Grouppre;
}(_react.Component);

exports.default = _utils.Container.create(Grouppre, { pure: false });
//# sourceMappingURL=Grouppre.react.js.map