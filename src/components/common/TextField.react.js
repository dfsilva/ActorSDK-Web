/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import classnames from 'classnames';

class TextField extends Component {

  static propTypes = {
    className: PropTypes.string,
    floatingLabel: PropTypes.node,
    type: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    inputRef: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      inputId: 'input-' + Math.random().toString(36).substr(2, 5)
    };
  }

  render() {
    const { className, floatingLabel, type, value, inputRef, disabled, errorText } = this.props;
    const { isFocused, inputId } = this.state;

    const inputClassName = classnames('input input__material', className, {
      'input__material--focus': isFocused,
      'input__material--filled': value && value.length > 0,
      'input__material--disabled': disabled,
      'input__material--with-error': errorText
    });

    const inputProps = {
      type: type || 'text',
      id: inputId,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      disabled,
      ref: inputRef ? inputRef : (input => this.inputElement = input)
    };

    return (
      <div className={inputClassName}>
        {
          floatingLabel
            ? <label htmlFor={inputId} onMouseDown={this.focus}>{floatingLabel}</label>
            : null
        }
        <input {...inputProps}/>
        {
          errorText
            ? <span className="error">{errorText}</span>
            : null
        }
      </div>
    );
  }

  focus = () => {
    const input = this.props.inputRef || this.refs.inputElement

      if (!input) {
      return;
    }

    setImmediate(() => {
      findDOMNode(input).focus();
    });

  };

  handleChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(event);
  };

  handleFocus = (event) => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    onFocus && onFocus(event);
  };

  handleBlur = (event) => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur && onBlur(event);
  };
}

export default TextField;
