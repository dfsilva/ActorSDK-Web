/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Recorder from 'opus-recorder';

const isRecordingSupported = Recorder.isRecordingSupported();

class VoiceRecorder extends Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      duration: 0,
      isRecording: false
    };

    this.onRecordStart = this.onRecordStart.bind(this);
    this.onRecordStop = this.onRecordStop.bind(this);
    this.onRecordDone = this.onRecordDone.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.onRecordStarted = this.onRecordStarted.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isRecording !== this.state.isRecording ||
           nextState.duration !== this.state.duration;
  }

  componentDidMount() {
    if (isRecordingSupported) {
      this.recorder = new Recorder();
      this.recorder.onstart = this.onRecordStarted;
      this.recorder.ondataavailable = this.onRecordDone;
    }
  }

  componentWillUnmount() {
    this.recorder.onstart = null;
    this.recorder.ondataavailable = null;
    this.recorder = null;
  }

  onRecordStart() {
    this.recorder.start();
  }

  onRecordStarted(event){
    this.setState({
        startDate: Date.now(),
        duration: 0,
        isRecording: true
    });
    this.timer = setInterval(this.updateDuration, 50);
  }

  updateDuration(){
      const elapsed = new Date() - this.state.startDate;
      var roundElapsed = Math.round(elapsed / 100);
      var duration = (roundElapsed / 10).toFixed(1);
      this.setState({duration});
  }

  onRecordStop(event) {
    this.recorder.stop();
    clearInterval(this.timer);
    this.setState({ isRecording: false});
  }

  onRecordDone(typedArray) {
    // duration must be in ms
    const duration = this.state.duration * 1000;
    if (duration >= 100) {
      const dataBlob = new Blob( [typedArray], { type: 'audio/ogg' } );
      this.props.onFinish(duration, dataBlob);
    }
    this.setState({duration:0});
  }

  renderDuration() {
    if (!this.state.duration) {
      return null;
    }

    return (
      <div className="voice-recorder__duration">
        <div className="fill row middle-xs center-xs">
          Voice message duration:&nbsp; {this.state.duration}
        </div>
      </div>
    );
  }

  render() {
    if (!isRecordingSupported) {
      return null;
    }

    const className = classNames('voice-recorder__icon', {
      'voice-recorder__icon--active': this.state.isRecording
    });

    return (
      <div className="voice-recorder">
        <span className={className} onMouseDown={this.onRecordStart} onMouseUp={this.onRecordStop}>
          <i className="material-icons">mic</i>
        </span>
        {this.renderDuration()}
      </div>
    );
  }
}

export default VoiceRecorder;
