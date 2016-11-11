/**
 * Created by gongchuangshidai on 16/10/28.
 */
var React = require('react');
var {Router,Route,Link,browserHistory} = require('react-router')

require('../item/swipe');

var Slider = React.createClass({
    componentDidMount:function(){},
    render:function(){
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">Slide 1</div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
})
module.exports = Slider;