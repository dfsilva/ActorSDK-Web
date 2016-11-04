'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _EmojiUtils = require('../../utils/EmojiUtils');

var _isInside = require('../../utils/isInside');

var _isInside2 = _interopRequireDefault(_isInside);

var _EmojiActionCreators = require('../../actions/EmojiActionCreators');

var _EmojiActionCreators2 = _interopRequireDefault(_EmojiActionCreators);

var _EmojiStore = require('../../stores/EmojiStore');

var _EmojiStore2 = _interopRequireDefault(_EmojiStore);

var _reactScroll = require('react-scroll');

var _Sticker = require('../emoji_stickers/Sticker.react');

var _Sticker2 = _interopRequireDefault(_Sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var emojiTabs = [];
var emojis = [];
var closeTimer = void 0;
var CLOSE_TIMEOUT = 550;

var EmojiDropdown = function (_Component) {
  _inherits(EmojiDropdown, _Component);

  EmojiDropdown.getStores = function getStores() {
    return [_EmojiStore2.default];
  };

  EmojiDropdown.calculateState = function calculateState() {
    return _EmojiStore2.default.getState();
  };

  function EmojiDropdown(props) {
    _classCallCheck(this, EmojiDropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onKeyDown = function () {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleClose = function () {
      return _EmojiActionCreators2.default.close();
    };

    _this.onSelect = function (emoji) {
      return _this.props.onSelect(emoji);
    };

    _this.onDocumentClick = function (event) {
      event.stopPropagation();
      event.preventDefault();
      if (!event.target.className.includes('emojis__header__tabs__tab')) {
        var emojiDropdown = (0, _reactDom.findDOMNode)(_this.refs.emojiDropdown);
        var emojiRect = emojiDropdown.getBoundingClientRect();
        var coords = {
          x: event.pageX || event.clientX,
          y: event.pageY || event.clientY
        };

        if (!(0, _isInside2.default)(coords, emojiRect)) {
          _this.handleClose();
        }
      }
    };

    _this.changeDropdownTitle = function (title) {
      return _this.setState({ dropdownTitle: title });
    };

    _this.handleEmojiTabMouseEnter = function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.click();
    };

    _this.handleEmojiOpenerMouseEnter = function () {
      _this.handleEmojiMouseEnter();
      localStorage.setItem('isEmojiOpenedBefore', true);
      _EmojiActionCreators2.default.open();
    };

    _this.handleEmojiMouseLeave = function () {
      closeTimer = setTimeout(_this.handleClose, CLOSE_TIMEOUT);
    };

    _this.handleEmojiMouseEnter = function () {
      clearTimeout(closeTimer);
    };

    var emojiCategories = (0, _EmojiUtils.getEmojiCategories)();

    (0, _lodash.forEach)(emojiCategories, function (category, index) {
      var currentCategoryEmojis = [];

      _EmojiUtils.emoji.change_replace_mode('css');
      var categoryIcon = _EmojiUtils.emoji.replace_colons(category.icon);

      emojiTabs.push(_react2.default.createElement(
        _reactScroll.Link,
        { to: category.title,
          spy: true,
          offset: 30,
          duration: 300,
          key: index,
          onSetActive: function onSetActive() {
            return _this.changeDropdownTitle(category.title);
          },
          containerId: 'emojiContainer',
          onMouseEnter: _this.handleEmojiTabMouseEnter,
          className: 'emojis__header__tabs__tab',
          activeClass: 'emojis__header__tabs__tab--active' },
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: categoryIcon } })
      ));

      (0, _lodash.forEach)(category.data, function (emojiChar, index) {
        _EmojiUtils.emoji.change_replace_mode('css');
        var convertedChar = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = true;
        var emojiColon = _EmojiUtils.emoji.replace_unified(emojiChar);
        _EmojiUtils.emoji.colons_mode = false;

        currentCategoryEmojis.push(_react2.default.createElement('a', { onClick: function onClick() {
            return _this.onSelect(emojiColon);
          }, key: index, dangerouslySetInnerHTML: { __html: convertedChar } }));
      });

      emojis.push(_react2.default.createElement(
        _reactScroll.Element,
        { name: category.title, key: index },
        _react2.default.createElement(
          'p',
          null,
          category.title
        ),
        currentCategoryEmojis
      ));
    });

    _this.handleEmojisTabMouseEnter = _this.handleEmojisTabMouseEnter.bind(_this);
    _this.handleStickerTabMouseEnter = _this.handleStickerTabMouseEnter.bind(_this);
    return _this;
  }

  EmojiDropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var isOpen = nextState.isOpen;

    var emojiDropdown = (0, _reactDom.findDOMNode)(this.refs.emojiDropdown);

    if (isOpen) {
      emojiDropdown.addEventListener('mouseenter', this.handleEmojiMouseEnter, false);
      emojiDropdown.addEventListener('mouseleave', this.handleEmojiMouseLeave, false);
      document.addEventListener('click', this.onDocumentClick, false);
      document.addEventListener('keydown', this.onKeyDown, false);
    } else {
      emojiDropdown.removeEventListener('mouseenter', this.handleEmojiMouseEnter, false);
      emojiDropdown.removeEventListener('mouseleave', this.handleEmojiMouseLeave, false);
      document.removeEventListener('click', this.onDocumentClick, false);
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  };

  EmojiDropdown.prototype.handleEmojisTabMouseEnter = function handleEmojisTabMouseEnter() {
    this.setState({ isStickersOpen: false });
  };

  EmojiDropdown.prototype.handleStickerTabMouseEnter = function handleStickerTabMouseEnter() {
    this.setState({ isStickersOpen: true });
  };

  EmojiDropdown.prototype.renderStickers = function renderStickers() {
    var stickers = this.state.stickers;
    var onStickerSelect = this.props.onStickerSelect;

    if (stickers.length === 0) return null;

    return stickers.map(function (sticker, index) {
      return _react2.default.createElement(_Sticker2.default, {
        sticker: sticker,
        onClick: onStickerSelect,
        key: index
      });
    });
  };

  EmojiDropdown.prototype.render = function render() {
    var _state = this.state,
        isOpen = _state.isOpen,
        dropdownTitle = _state.dropdownTitle,
        isStickersOpen = _state.isStickersOpen;

    var isEmojiOpenedBefore = localStorage.getItem('isEmojiOpenedBefore') === 'true' || false;

    var emojiDropdownClassName = (0, _classnames2.default)('emoji-dropdown', {
      'emoji-dropdown--opened': isOpen
    });
    var emojiOpenerClassName = (0, _classnames2.default)('emoji-opener material-icons', {
      'emoji-opener--active': isOpen,
      'emoji-opener--with-dot': !isEmojiOpenedBefore
    });

    var emojiTabClassName = (0, _classnames2.default)('emoji-dropdown__footer__tab', {
      'emoji-dropdown__footer__tab--active': !isStickersOpen
    });
    var stickerTabClassName = (0, _classnames2.default)('emoji-dropdown__footer__tab', {
      'emoji-dropdown__footer__tab--active': isStickersOpen
    });

    var emojisClassName = (0, _classnames2.default)('emojis', {
      'hide': isStickersOpen
    });
    var stickersClassName = (0, _classnames2.default)('stickers', {
      'hide': !isStickersOpen
    });

    return _react2.default.createElement(
      'div',
      { className: emojiDropdownClassName, onMouseEnter: this.handleEmojiOpenerMouseEnter, onMouseLeave: this.handleEmojiMouseLeave },
      _react2.default.createElement(
        'i',
        { className: emojiOpenerClassName },
        'insert_emoticon'
      ),
      _react2.default.createElement(
        'div',
        { className: 'emoji-dropdown__wrapper', ref: 'emojiDropdown' },
        _react2.default.createElement(
          'div',
          { className: 'emoji-dropdown__body' },
          _react2.default.createElement(
            'div',
            { className: emojisClassName },
            _react2.default.createElement(
              'header',
              { className: 'emojis__header' },
              _react2.default.createElement(
                'p',
                { className: 'emojis__header__title' },
                dropdownTitle || 'Emoji'
              ),
              _react2.default.createElement(
                'div',
                { className: 'emojis__header__tabs pull-right' },
                emojiTabs
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'emojis__body', id: 'emojiContainer' },
              emojis
            )
          ),
          _react2.default.createElement(
            'div',
            { className: stickersClassName },
            this.renderStickers()
          )
        ),
        _react2.default.createElement(
          'footer',
          { className: 'emoji-dropdown__footer' },
          _react2.default.createElement(
            'div',
            { className: emojiTabClassName,
              onClick: this.handleEmojisTabMouseEnter },
            'Emojis'
          ),
          _react2.default.createElement(
            'div',
            { className: stickerTabClassName,
              onClick: this.handleStickerTabMouseEnter },
            'Stickers'
          )
        )
      )
    );
  };

  return EmojiDropdown;
}(_react.Component);

EmojiDropdown.propTypes = {
  onSelect: _react.PropTypes.func.isRequired,
  onStickerSelect: _react.PropTypes.func.isRequired
};
exports.default = _utils.Container.create(EmojiDropdown);
//# sourceMappingURL=EmojiDropdown.react.js.map