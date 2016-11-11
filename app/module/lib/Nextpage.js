/**
 * Created by gongchuangshidai on 16/11/7.
 */
var React = require('react');
var {Router,Route,Link,browserHistory} = require('react-router');

var Load = React.createClass({
    render:function(){
        return (
            <div className="loading" id="load" style={{display:'none'}}>
                <div className="imgbox">
                    <img src='../../../img/loading.png' alt=""/>
                </div>
            </div>
        )
    }
})
module.exports = Load;