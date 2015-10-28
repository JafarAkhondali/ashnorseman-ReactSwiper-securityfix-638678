/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swipe, { Swiper } from './swipe.jsx';


const Box = swipe(class Box extends Component {

  render() {
    return (
      <div {...this.props}>swipe(Component)</div>
    );
  }
});

class Box2 extends Component {

  render() {
    return (
      <Swiper onSwipe={this.props.onSwipe}>
        <div {...this.props}>
          &lt;Swiper /&gt;
        </div>
      </Swiper>
    )
  }
}


class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      swipes: []
    };

    this.swipe = this.swipe.bind(this);
  }

  render() {
    const { swipes } = this.state,
      swipeList = swipes.map((swipe) => {
        return <li key={swipe.timeStamp}>{`Swiped ${swipe.direction}: from (${swipe.startX}, ${swipe.startY}) to (${swipe.endX}, ${swipe.endY}) at ${swipe.timeStamp}`}</li>;
      }),
      boxStyle = {
        background: '#202020',
        color: '#fff',
        height: 100,
        lineHeight: '100px',
        marginBottom: 10,
        textAlign: 'center'
      };

    return (
      <div>
        <Box style={boxStyle} onSwipe={this.swipe} onClick={this.handleClick} />
        <Box2 style={boxStyle} onSwipe={this.swipe} onClick={this.handleClick} />
        <ul>{swipeList}</ul>
      </div>
    );
  }

  swipe(e) {
    this.setState({
      swipes: [e].concat(this.state.swipes)
    });
  }

  handleClick(e) {
    console.log('click');
  }
}


ReactDOM.render(
  <Test />,
  document.getElementById('app')
);