/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';


const SWIPE_THRESHOLD = 50;

export default (Component) => class SwipeComponent extends Component {

  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  render() {
    return (
      <div onTouchStart={this.onTouchStart}
           onTouchMove={this.onTouchMove}
           onTouchCancel={this.onTouchEnd}
           onTouchEnd={this.onTouchEnd}>
        <Component {...this.props}>{this.props.children}</Component>
      </div>
    );
  }

  onTouchStart(e) {
    if (e.touches.length > 1) return;
    this._initSwipe(e.touches[0]);
  }

  onTouchMove(e) {
    if (e.touches.length > 1) return;
    this._updateSwipe(e.touches[0]);
  }

  onTouchEnd(e) {
    this._extractSwipe(e);
    this._clearSwipe();
  }

  _initSwipe(touch) {
    this.setState({
      startTimeStamp: Date.now(),
      startX: touch.pageX,
      startY: touch.pageY
    });
  }

  _updateSwipe(touch) {
    this.setState({
      timeStamp: Date.now(),
      endX: touch.pageX,
      endY: touch.pageY
    });
  }

  _extractSwipe(e) {
    const { startX, startY, endX, endY } = this.state;
    let dx, dy;

    if (!startX || !startY || !endX || !endY) return;

    dx = Math.abs(endX - startX);
    dy = Math.abs(endY - startY);

    if (dx < SWIPE_THRESHOLD && dy < SWIPE_THRESHOLD) return;

    if (dx > dy) {
      this.state.direction = (endX > startX) ? 'right' : 'left';
    } else {
      this.state.direction = (endY > startY) ? 'down' : 'up';
    }

    this.state.type = 'swipe';
    this.state.target = e.target;

    if (typeof this.props.onSwipe === 'function') {
      this.props.onSwipe(this.state);
    }
  }

  _clearSwipe() {
    this.state = {};
  }
}