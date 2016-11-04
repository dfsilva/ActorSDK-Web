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

var cache = [];

/**
 * Class that represents a component for display voice message content
 */

var Voice = function (_Component) {
  _inherits(Voice, _Component);

  function Voice(props) {
    _classCallCheck(this, Voice);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.humanTime = function (millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = (millis % 60000 / 1000).toFixed(0);

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    _this.handleTimeUpdate = function () {
      _this.setState({
        currentTime: _this.audio.currentTime,
        duration: _this.audio.duration
      });
    };

    _this.handlePlayClick = function () {
      _this.audio.play();
      _this.setState({ isPlaying: true });
    };

    _this.handlePauseClick = function () {
      _this.audio.pause();
      _this.handlePlayEnding();
    };

    _this.handlePlayEnding = function () {
      _this.setState({ isPlaying: false });
    };

    _this.handleRewind = function (event) {
      var rewindRect = (0, _reactDom.findDOMNode)(_this.refs.rewind).getBoundingClientRect();
      var rewindPosition = (event.clientX - rewindRect.left) / rewindRect.width;

      _this.audio.currentTime = _this.audio.duration * rewindPosition;
    };

    _this.handleLoading = function () {
      return _this.setCached();
    };

    _this.state = {
      isLoaded: _this.isCached(),
      isPlaying: false,
      currentTime: 0,
      duration: props.duration / 1000
    };
    return _this;
  }

  Voice.prototype.componentDidMount = function componentDidMount() {
    var fileUrl = this.props.fileUrl;


    if (fileUrl) {
      this.createAudioElement(fileUrl);
    }
  };

  Voice.prototype.componentDidUpdate = function componentDidUpdate() {
    var fileUrl = this.props.fileUrl;


    if (fileUrl && !this.isCached()) {
      this.createAudioElement(fileUrl);
    }
  };

  Voice.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('loadeddata', this.handleLoading);
      this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      this.audio.removeEventListener('ended', this.handlePlayEnding);
      this.audio.removeEventListener('canplaythrough', this.handleLoading);
    }
  };

  Voice.prototype.createAudioElement = function createAudioElement(fileUrl) {
    this.audio = new Audio(fileUrl);
    this.audio.volume = 1;
    this.audio.addEventListener('loadeddata', this.handleLoading);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.handlePlayEnding);
    this.audio.addEventListener('canplaythrough', this.handleLoading);
    this.setCached();
  };

  Voice.prototype.isCached = function isCached() {
    var fileUrl = this.props.fileUrl;

    return cache[fileUrl] === true;
  };

  Voice.prototype.setCached = function setCached() {
    var fileUrl = this.props.fileUrl;

    cache[fileUrl] = true;
    this.setState({ isLoaded: cache[fileUrl] });
  };

  Voice.prototype.render = function render() {
    var className = this.props.className;
    var _state = this.state,
        isPlaying = _state.isPlaying,
        currentTime = _state.currentTime,
        duration = _state.duration,
        isLoaded = _state.isLoaded;

    var voiceClassName = (0, _classnames2.default)(className, 'row');

    var current = this.humanTime(currentTime * 1000);
    var total = this.humanTime(duration * 1000);
    var progress = currentTime / duration * 100;

    return _react2.default.createElement(
      'div',
      { className: voiceClassName },
      _react2.default.createElement(
        'div',
        { className: 'voice row' },
        _react2.default.createElement(
          'div',
          { className: 'voice__controls' },
          !isLoaded ? _react2.default.createElement(
            'i',
            { className: 'material-icons', style: { opacity: 0.3 } },
            'play_circle_filled'
          ) : isPlaying ? _react2.default.createElement(
            'i',
            { className: 'material-icons', onClick: this.handlePauseClick },
            'pause_circle_filled'
          ) : _react2.default.createElement(
            'i',
            { className: 'material-icons', onClick: this.handlePlayClick },
            'play_circle_filled'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'voice__body col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs text-left' },
              _react2.default.createElement(
                'time',
                { className: 'voice__time voice__time--current' },
                current
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs text-right' },
              _react2.default.createElement(
                'time',
                { className: 'voice__time voice__time--total' },
                total
              )
            )
          ),
          isLoaded ? _react2.default.createElement(
            'div',
            { className: 'voice__rewind', onClick: this.handleRewind, ref: 'rewind' },
            _react2.default.createElement('div', { className: 'played', style: { width: progress + '%' } })
          ) : _react2.default.createElement('div', { className: 'voice__rewind voice__rewind--loading' })
        )
      ),
      _react2.default.createElement('div', { className: 'col-xs' })
    );
  };

  return Voice;
}(_react.Component);

Voice.propTypes = {
  fileUrl: _react.PropTypes.string,
  duration: _react.PropTypes.number.isRequired,
  className: _react.PropTypes.string
};
exports.default = Voice;
//# sourceMappingURL=Voice.react.js.map