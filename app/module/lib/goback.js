/**
 * Created by dell on 2016/10/25.
 */
var React = require('react');
var {Router,Route,Link,browserHistory} = require('react-router');



var Back = React.createClass({
    moveColor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5576d4';
    },
    leaveColor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5A7CDD';
    },
    render:function(){
        return (
            <Link href='javascript:history.back(-1)' className="goback"
                  onTouchStart={this.moveColor}
                  onTouchEnd={this.leaveColor}
            >
                <i className="iconfont pull-left">
                    &#xe601;
                </i>
                {this.props.tit}
            </Link>
        )
    }
})
module.exports=Back;