'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _opusRecorder = require('opus-recorder');

var _opusRecorder2 = _interopRequireDefault(_opusRecorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isRecordingSupported = _opusRecorder2.default.isRecordingSupported();

var VoiceRecorder = function (_Component) {
  _inherits(VoiceRecorder, _Component);

  function VoiceRecorder(props) {
    _classCallCheck(this, VoiceRecorder);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      startDate: null,
      duration: 0,
      isRecording: false
    };

    _this.onRecordStart = _this.onRecordStart.bind(_this);
    _this.onRecordStop = _this.onRecordStop.bind(_this);
    _this.onRecordDone = _this.onRecordDone.bind(_this);
    _this.updateDuration = _this.updateDuration.bind(_this);
    _this.onRecordStarted = _this.onRecordStarted.bind(_this);
    return _this;
  }

  VoiceRecorder.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextState.isRecording !== this.state.isRecording || nextState.duration !== this.state.duration;
  };

  VoiceRecorder.prototype.componentDidMount = function componentDidMount() {
    if (isRecordingSupported) {
      this.recorder = new _opusRecorder2.default();
      this.recorder.onstart = this.onRecordStarted;
      this.recorder.ondataavailable = this.onRecordDone;
    }
  };

  VoiceRecorder.prototype.componentWillUnmount = function componentWillUnmount() {
    this.recorder.onstart = null;
    this.recorder.ondataavailable = null;
    this.recorder = null;
  };

  VoiceRecorder.prototype.onRecordStart = function onRecordStart() {
    this.recorder.start();
  };

  VoiceRecorder.prototype.onRecordStarted = function onRecordStarted(event) {
    this.setState({
      startDate: Date.now(),
      duration: 0,
      isRecording: true
    });
    this.timer = setInterval(this.updateDuration, 50);
  };

  VoiceRecorder.prototype.updateDuration = function updateDuration() {
    var elapsed = new Date() - this.state.startDate;
    var roundElapsed = Math.round(elapsed / 100);
    var duration = (roundElapsed / 10).toFixed(1);
    this.setState({ duration: duration });
  };

  VoiceRecorder.prototype.onRecordStop = function onRecordStop(event) {
    this.recorder.stop();
    clearInterval(this.timer);
    this.setState({ isRecording: false });
  };

  VoiceRecorder.prototype.onRecordDone = function onRecordDone(typedArray) {
    // duration must be in ms
    var duration = this.state.duration * 1000;
    if (duration >= 100) {
      var dataBlob = new Blob([typedArray], { type: 'audio/ogg' });
      this.props.onFinish(duration, dataBlob);
    }
    this.setState({ duration: 0 });
  };

  VoiceRecorder.prototype.renderDuration = function renderDuration() {
    if (!this.state.duration) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'voice-recorder__duration' },
      _react2.default.createElement(
        'div',
        { className: 'fill row middle-xs center-xs' },
        'Voice message duration:\xA0 ',
        this.state.duration
      )
    );
  };

  VoiceRecorder.prototype.render = function render() {
    if (!isRecordingSupported) {
      return null;
    }

    var className = (0, _classnames2.default)('voice-recorder__icon', {
      'voice-recorder__icon--active': this.state.isRecording
    });

    return _react2.default.createElement(
      'div',
      { className: 'voice-recorder' },
      _react2.default.createElement(
        'span',
        { className: className, onMouseDown: this.onRecordStart, onMouseUp: this.onRecordStop },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'mic'
        )
      ),
      this.renderDuration()
    );
  };

  return VoiceRecorder;
}(_react.Component);

VoiceRecorder.propTypes = {
  onFinish: _react.PropTypes.func.isRequired
};
exports.default = VoiceRecorder;
//# sourceMappingURL=VoiceRecorder.react.js.map