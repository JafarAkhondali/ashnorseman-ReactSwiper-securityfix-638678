/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swipe from './swipe.jsx';


const Box = swipe(class Page extends Component {

  render() {
    return (
      <div {...this.props}>Swipe Me!</div>
    );
  }
});


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
        height: 200,
        lineHeight: '200px',
        textAlign: 'center'
      };

    return (
      <div>
        <Box style={boxStyle} onSwipe={this.swipe} />
        <ul>{swipeList}</ul>
      </div>
    );
  }

  swipe(e) {
    this.setState({
      swipes: [e].concat(this.state.swipes)
    });
  }
}


ReactDOM.render(
  <Test />,
  document.getElementById('app')
);