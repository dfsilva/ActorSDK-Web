'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Fold = function (_Component) {
  _inherits(Fold, _Component);

  function Fold(props) {
    _classCallCheck(this, Fold);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onClick = function () {
      var updatedState = !_this.state.isOpen;
      if (_this.props.onStateChange) {
        _this.props.onStateChange(updatedState);
      }
      _this.setState({ isOpen: updatedState });
    };

    _this.onClick = _this.onClick.bind(_this);

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  Fold.prototype.render = function render() {
    var _props = this.props,
        icon = _props.icon,
        iconClassName = _props.iconClassName,
        title = _props.title,
        iconElement = _props.iconElement;

    var titleIconClassName = (0, _classnames2.default)('material-icons icon', iconClassName);
    var className = (0, _classnames2.default)({
      'fold': true,
      'fold--open': this.state.isOpen
    });

    var foldIcon = void 0;
    if (icon) {
      foldIcon = _react2.default.createElement(
        'i',
        { className: titleIconClassName },
        icon
      );
    }
    if (iconElement) {
      foldIcon = iconElement;
    }

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'fold__title', onClick: this.onClick },
        foldIcon,
        title,
        _react2.default.createElement(
          'i',
          { className: 'fold__indicator material-icons pull-right' },
          'arrow_drop_down'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'fold__content' },
        this.props.children
      )
    );
  };

  return Fold;
}(_react.Component);

Fold.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  icon: _react.PropTypes.string,
  iconClassName: _react.PropTypes.string,
  iconElement: _react.PropTypes.element,
  title: _react.PropTypes.node.isRequired,
  onStateChange: _react.PropTypes.func
};
exports.default = Fold;
//# sourceMappingURL=Fold.react.js.map