/**
 * Created by AshZhang on 15/10/14.
 */

'use strict';

var React = require('react');

var SWIPE_THRESHOLD = 50;

module.exports = function (Component) {
  return React.createClass({
    displayName: 'Swiper',

    render: function render() {
      return React.createElement(
        'div',
        { onTouchStart: this.onTouchStart,
          onTouchMove: this.onTouchMove,
          onTouchCancel: this.onTouchEnd,
          onTouchEnd: this.onTouchEnd },
        React.createElement(
          Component,
          this.props,
          this.props.children
        )
      );
    },

    onTouchStart: function onTouchStart(e) {
      if (e.touches.length > 1) return;
      this._initSwipe(e.touches[0]);
    },

    onTouchMove: function onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length > 1) return;
      this._updateSwipe(e.touches[0]);
    },

    onTouchEnd: function onTouchEnd(e) {
      this._extractSwipe(e);
      this._clearSwipe();
    },

    _initSwipe: function _initSwipe(touch) {
      this.setState({
        startTimeStamp: Date.now(),
        startX: touch.pageX,
        startY: touch.pageY
      });
    },

    _updateSwipe: function _updateSwipe(touch) {
      this.setState({
        timeStamp: Date.now(),
        endX: touch.pageX,
        endY: touch.pageY
      });
    },

    _extractSwipe: function _extractSwipe(e) {
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
    },

    _clearSwipe: function _clearSwipe() {
      this.state = {};
    }
  });
};
