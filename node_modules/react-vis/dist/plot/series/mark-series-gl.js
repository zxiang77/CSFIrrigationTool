'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deck = require('deck.gl');

var _d3Color = require('d3-color');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _theme = require('../../theme');

var _scalesUtils = require('../../utils/scales-utils');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

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

var MarkSeriesGL = function (_AbstractSeries) {
  _inherits(MarkSeriesGL, _AbstractSeries);

  function MarkSeriesGL() {
    _classCallCheck(this, MarkSeriesGL);

    return _possibleConstructorReturn(this, (MarkSeriesGL.__proto__ || Object.getPrototypeOf(MarkSeriesGL)).apply(this, arguments));
  }

  _createClass(MarkSeriesGL, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props) {
      var data = props.data,
          _renderKey = props._renderKey,
          seriesId = props.seriesId,
          colorDomain = props.colorDomain,
          colorRange = props.colorRange,
          sizeDomain = props.sizeDomain,
          sizeRange = props.sizeRange,
          outline = props.outline;


      var xFunctor = (0, _scalesUtils.getAttributeFunctor)(props, 'x');
      var yFunctor = (0, _scalesUtils.getAttributeFunctor)(props, 'y');
      var sizeFunctor = (0, _scalesUtils.getAttributeFunctor)(props, 'size') || function (p) {
        return _theme.DEFAULT_SIZE;
      };
      var fillFunctor = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacityFunctor = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');

      return new _deck.ScatterplotLayer({
        id: seriesId,
        data: data,
        getPosition: function getPosition(p) {
          return [xFunctor(p), yFunctor(p)];
        },
        getRadius: function getRadius(p) {
          return sizeFunctor(p);
        },
        getColor: function getColor(p) {
          var color = (0, _d3Color.rgb)(fillFunctor(p));
          return [color.r, color.g, color.b, (opacityFunctor(p) || _theme.DEFAULT_OPACITY) * 255];
        },
        opacity: 1,
        outline: outline,
        projectionMode: _deck.COORDINATE_SYSTEM.IDENTITY,
        updateTriggers: {
          getPosition: _renderKey,
          getColor: colorDomain.concat(colorRange).concat([_renderKey]).join(''),
          getRadius: sizeDomain.concat(sizeRange).concat([_renderKey]).join('')
        },
        // there's a bug that the radius calculated with project_scale
        radiusMinPixels: 2,
        pickable: true,
        onHover: function onHover(row) {
          return props.onValueMouseOver(row.object);
        },
        onClick: function onClick(row) {
          return props.onValueClick(row.object);
        }
      });
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return false;
    }
  }, {
    key: 'isDeckGL',
    get: function get() {
      return true;
    }
  }]);

  return MarkSeriesGL;
}(_abstractSeries2.default);

MarkSeriesGL.displayName = 'MarkSeriesGL';
MarkSeriesGL.defaultProps = {
  onValueMouseOver: function onValueMouseOver() {},
  onValueClick: function onValueClick() {},
  outline: false
};

MarkSeriesGL.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  seriesId: _propTypes2.default.string.isRequired,
  outline: _propTypes2.default.bool
});

exports.default = MarkSeriesGL;