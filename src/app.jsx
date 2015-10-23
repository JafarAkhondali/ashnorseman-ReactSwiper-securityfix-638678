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
      <div {...this.props}>Swiper</div>
    );
  }
});


class Test extends Component {

  render() {
    return (
      <Box style={{ background: '#202020', color: '#fff', height: 200 }}
           onSwipe={this.swipe} />
    );
  }

  swipe(e) {
    alert(e.direction);
  }
}


ReactDOM.render(
  <Test />,
  document.getElementById('app')
);