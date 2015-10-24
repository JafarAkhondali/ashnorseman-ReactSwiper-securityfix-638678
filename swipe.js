/**
 * Created by AshZhang on 15/10/14.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SWIPE_THRESHOLD = 50;

exports['default'] = function (Component) {
  return (function (_Component) {
    _inherits(SwipeComponent, _Component);

    function SwipeComponent(props) {
      _classCallCheck(this, SwipeComponent);

      _get(Object.getPrototypeOf(SwipeComponent.prototype), 'constructor', this).call(this, props);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    _createClass(SwipeComponent, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { onTouchStart: this.onTouchStart,
            onTouchMove: this.onTouchMove,
            onTouchCancel: this.onTouchEnd,
            onTouchEnd: this.onTouchEnd },
          _react2['default'].createElement(
            Component,
            this.props,
            this.props.children
          )
        );
      }
    }, {
      key: 'onTouchStart',
      value: function onTouchStart(e) {
        if (e.touches.length > 1) return;
        this._initSwipe(e.touches[0]);
      }
    }, {
      key: 'onTouchMove',
      value: function onTouchMove(e) {
        e.preventDefault();
        if (e.touches.length > 1) return;
        this._updateSwipe(e.touches[0]);
      }
    }, {
      key: 'onTouchEnd',
      value: function onTouchEnd(e) {
        this._extractSwipe(e);
        this._clearSwipe();
      }
    }, {
      key: '_initSwipe',
      value: function _initSwipe(touch) {
        this.setState({
          startTimeStamp: Date.now(),
          startX: touch.pageX,
          startY: touch.pageY
        });
      }
    }, {
      key: '_updateSwipe',
      value: function _updateSwipe(touch) {
        this.setState({
          timeStamp: Date.now(),
          endX: touch.pageX,
          endY: touch.pageY
        });
      }
    }, {
      key: '_extractSwipe',
      value: function _extractSwipe(e) {
        var _state = this.state;
        var startX = _state.startX;
        var startY = _state.startY;
        var endX = _state.endX;
        var endY = _state.endY;

        var dx = undefined,
            dy = undefined;

        if (!startX || !startY || !endX || !endY) return;

        dx = Math.abs(endX - startX);
        dy = Math.abs(endY - startY);

        if (dx < SWIPE_THRESHOLD && dy < SWIPE_THRESHOLD) return;

        if (dx > dy) {
          this.state.direction = endX > startX ? 'right' : 'left';
        } else {
          this.state.direction = endY > startY ? 'down' : 'up';
        }

        this.state.type = 'swipe';
        this.state.target = e.target;

        if (typeof this.props.onSwipe === 'function') {
          this.props.onSwipe(this.state);
        }
      }
    }, {
      key: '_clearSwipe',
      value: function _clearSwipe() {
        this.state = {};
      }
    }]);

    return SwipeComponent;
  })(Component);
};

module.exports = exports['default'];
