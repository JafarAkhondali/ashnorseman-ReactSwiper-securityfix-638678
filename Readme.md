Usage
-----

1. swipe(Component) Function
============================

    ``` javascript
    import swipe from 'react-swiper-ash';
    
    // Make `onSwipe` usable on the `Box`
    const Box = swipe(class Box extends Component {
    
      render() {
        return (
          <div {...this.props}>Swipe Me!</div>
        );
      }
    });
    
    // Now you can use `onSwipe` to directly
    class Test extends Component {
    
      render() {
        return (
          <Box onSwipe={this.swipe} />
        );
      }
    
      swipe(e) {
        console.log(e);
      }
    }
    ```

2. Swiper Component
===================

    ``` javascript
    import { Swiper } from 'react-swiper-ash';
    
    class Box2 extends Component {
    
      render() {
        return (
          <Swiper onSwipe={this.props.onSwipe}>
            <div {...this.props}>&lt;Swiper /&gt;</div>
          </Swiper>
        )
      }
    }
    
    class Test extends Component {
    
      render() {
        return (
          <Box2 onSwipe={this.swipe} />
        );
      }
    
      swipe(e) {
        console.log(e);
      }
    }
    ```
    
Event properties
----------------

* e.timeStamp
* e.direction => left, right, up, down
* e.startX
* e.startY
* e.endX
* e.endY
* e.target

Example
-------

[http://react-swiper.herokuapp.com](http://react-swiper.herokuapp.com)

Tested Browsers
---------------

* iOS - Safari (√)
* iOS - Chrome (√)
* iOS - UC Browser (√)
* iOS - QQ Browser (√)
* Android - Chrome (√)
* Android - UC Browser (√)
* Android - QQ Browser (√)
* Android - MIUI Built-in (√)