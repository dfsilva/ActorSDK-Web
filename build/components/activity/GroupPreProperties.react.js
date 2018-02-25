"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var GroupPreProperties = function (_Component) {
  _inherits(GroupPreProperties, _Component);

  function GroupPreProperties(props) {
    _classCallCheck(this, GroupPreProperties);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  GroupPreProperties.prototype.render = function render() {
    return _react2.default.createElement(
      "ul",
      { className: "group_profile__members__list" },
      _react2.default.createElement(
        "li",
        null,
        _react2.default.createElement("input", { type: "checkbox", name: "vehicle", value: "Bike" }),
        " Grupo Publico"
      ),
      _react2.default.createElement(
        "li",
        null,
        _react2.default.createElement(
          "select",
          null,
          _react2.default.createElement(
            "option",
            { value: "volvo" },
            "Volvo"
          ),
          _react2.default.createElement(
            "option",
            { value: "saab" },
            "Saab"
          ),
          _react2.default.createElement(
            "option",
            { value: "mercedes" },
            "Mercedes"
          ),
          _react2.default.createElement(
            "option",
            { value: "audi" },
            "Audi"
          )
        )
      )
    );
  };

  return GroupPreProperties;
}(_react.Component);

GroupPreProperties.propTypes = {
  groupId: _react.PropTypes.number,
  groups: _react.PropTypes.array.isRequired
};
exports.default = GroupPreProperties;
//# sourceMappingURL=GroupPreProperties.react.js.map