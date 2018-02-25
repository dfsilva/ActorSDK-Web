'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TextField = function (_Component) {
  _inherits(TextField, _Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.focus = function () {
      var input = _this.props.inputRef || _this.refs.inputElement;

      if (!input) {
        return;
      }

      setImmediate(function () {
        (0, _reactDom.findDOMNode)(input).focus();
      });
    };

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      onChange && onChange(event);
    };

    _this.handleFocus = function (event) {
      var onFocus = _this.props.onFocus;

      _this.setState({ isFocused: true });
      onFocus && onFocus(event);
    };

    _this.handleBlur = function (event) {
      var onBlur = _this.props.onBlur;

      _this.setState({ isFocused: false });
      onBlur && onBlur(event);
    };

    _this.state = {
      isFocused: false,
      inputId: 'input-' + Math.random().toString(36).substr(2, 5)
    };
    return _this;
  }

  TextField.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        className = _props.className,
        floatingLabel = _props.floatingLabel,
        type = _props.type,
        value = _props.value,
        inputRef = _props.inputRef,
        disabled = _props.disabled,
        errorText = _props.errorText;
    var _state = this.state,
        isFocused = _state.isFocused,
        inputId = _state.inputId;


    var inputClassName = (0, _classnames2.default)('input input__material', className, {
      'input__material--focus': isFocused,
      'input__material--filled': value && value.length > 0,
      'input__material--disabled': disabled,
      'input__material--with-error': errorText
    });

    var inputProps = {
      type: type || 'text',
      id: inputId,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      disabled: disabled,
      ref: inputRef ? inputRef : function (input) {
        return _this2.inputElement = input;
      }
    };

    return _react2.default.createElement(
      'div',
      { className: inputClassName },
      floatingLabel ? _react2.default.createElement(
        'label',
        { htmlFor: inputId, onMouseDown: this.focus },
        floatingLabel
      ) : null,
      _react2.default.createElement('input', inputProps),
      errorText ? _react2.default.createElement(
        'span',
        { className: 'error' },
        errorText
      ) : null
    );
  };

  return TextField;
}(_react.Component);

TextField.propTypes = {
  className: _react.PropTypes.string,
  floatingLabel: _react.PropTypes.node,
  type: _react.PropTypes.string,
  value: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  errorText: _react.PropTypes.string,
  inputRef: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
};
exports.default = TextField;
//# sourceMappingURL=TextField.react.js.map