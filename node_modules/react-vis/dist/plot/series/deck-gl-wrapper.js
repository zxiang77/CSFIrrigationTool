'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deck = require('deck.gl');

var _deck2 = _interopRequireDefault(_deck);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var DeckGLWrapper = function (_Component) {
  _inherits(DeckGLWrapper, _Component);

  function DeckGLWrapper() {
    _classCallCheck(this, DeckGLWrapper);

    return _possibleConstructorReturn(this, (DeckGLWrapper.__proto__ || Object.getPrototypeOf(DeckGLWrapper)).apply(this, arguments));
  }

  _createClass(DeckGLWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          marginBottom = _props.marginBottom,
          marginRight = _props.marginRight,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth;


      var width = innerWidth + marginLeft + marginRight;
      var height = innerHeight + marginTop + marginBottom;

      var glViewport = new _deck.OrthographicViewport({
        width: width || 0,
        height: height || 0,
        left: -marginLeft,
        top: -marginTop
      });
      if (!innerHeight || !innerWidth) {
        return null;
      }

      var layers = children.reduce(function (res, layer) {
        if (!layer.type.renderLayer) {
          var trueLayer = layer.props.children;
          return res.concat(trueLayer.type.renderLayer(trueLayer.props));
        }

        return res.concat(layer.type.renderLayer(layer.props));
      }, []);
      return _react2.default.createElement(_deck2.default, { width: width, height: height, viewport: glViewport,
        style: { position: 'absolute', top: 0, left: 0 },
        layers: layers });
    }
  }]);

  return DeckGLWrapper;
}(_react.Component);

DeckGLWrapper.displayName = 'DeckGLWrapper';
DeckGLWrapper.propTypes = {
  marginLeft: _propTypes2.default.number.isRequired,
  marginTop: _propTypes2.default.number.isRequired,
  marginBottom: _propTypes2.default.number.isRequired,
  marginRight: _propTypes2.default.number.isRequired,
  innerHeight: _propTypes2.default.number.isRequired,
  innerWidth: _propTypes2.default.number.isRequired
};

exports.default = DeckGLWrapper;