'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _reactIntl = require('react-intl');

var _l18n = require('../l18n');

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Confirm = function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm(props) {
    _classCallCheck(this, Confirm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.reject();
      }
    };

    _this.promise = new Promise(function (resolve, reject) {
      _this.reject = reject;
      _this.resolve = resolve;
    });

    var SharedActor = _SharedContainer2.default.get();
    _this.intlData = (0, _l18n.getIntlData)(SharedActor.forceLocale);
    return _this;
  }

  Confirm.prototype.componentDidMount = function componentDidMount() {
    _ComposeActionCreators2.default.toggleAutoFocus(false);
    (0, _reactDom.findDOMNode)(this.refs.confirm).focus();
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  Confirm.prototype.componentWillUnmount = function componentWillUnmount() {
    _ComposeActionCreators2.default.toggleAutoFocus(true);
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  Confirm.prototype.renderDescription = function renderDescription() {
    var description = this.props.description;

    if (!description) return null;

    return _react2.default.createElement(
      'div',
      { className: 'modal__body' },
      description
    );
  };

  Confirm.prototype.render = function render() {
    var _props = this.props,
        message = _props.message,
        abortLabel = _props.abortLabel,
        confirmLabel = _props.confirmLabel;


    return _react2.default.createElement(
      _reactIntl.IntlProvider,
      this.intlData,
      _react2.default.createElement(
        'div',
        { className: 'modal' },
        _react2.default.createElement(
          'div',
          { className: 'confirm' },
          _react2.default.createElement(
            'div',
            { className: 'modal__content' },
            _react2.default.createElement(
              'header',
              { className: 'modal__header' },
              _react2.default.createElement(
                'h1',
                null,
                message
              )
            ),
            this.renderDescription(),
            _react2.default.createElement(
              'footer',
              { className: 'modal__footer text-right' },
              _react2.default.createElement(
                'button',
                { className: 'button', onClick: this.reject },
                abortLabel || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' })
              ),
              _react2.default.createElement(
                'button',
                { className: 'button button--lightblue', onClick: this.resolve, ref: 'confirm' },
                confirmLabel || _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.ok' })
              )
            )
          )
        )
      )
    );
  };

  return Confirm;
}(_react.Component);

Confirm.propTypes = {
  message: _react.PropTypes.node.isRequired,
  description: _react.PropTypes.string,
  abortLabel: _react.PropTypes.string,
  confirmLabel: _react.PropTypes.string
};
function confirm(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var element = document.createElement('div');
  element.className = 'modal-overlay';

  var wrapper = document.body.appendChild(element);

  var component = (0, _reactDom.render)((0, _react.createElement)(Confirm, _extends({ message: message }, options)), wrapper);

  function cleanup() {
    (0, _reactDom.unmountComponentAtNode)(wrapper);
    setImmediate(function () {
      return wrapper.remove();
    });
  }

  // Unmount component and remove it from DOM
  component.promise.then(function () {
    return cleanup();
  }, function () {
    return cleanup();
  });

  return component.promise;
}
//# sourceMappingURL=confirm.js.map