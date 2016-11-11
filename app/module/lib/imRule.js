/**
 * Created by gongchuangshidai on 16/11/3.
 */
var React = require('react');


var RulesToop = React.createClass({

    closeClick:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#fff'
        var wp = React.findDOMNode(this.refs.toopwarp);
        wp.style.display = 'none';
    },
    startClick:function(event){
      var tar = event.currentTarget;
        tar.style.backgroundColor = '#f5f5f5';
    },
    render:function(){
        if(this.props.right){
            var src = this.props.src;
            console.log(src)
            var ifram = <iframe src={src} frameborder="0" width="100%" height="100%" border="0"></iframe>
        }
        return (
            <div className="fixed ru-tp" ref="toopwarp" id="toopwp" style={{display:'none'}}>
                <div className="bgbox">
                    <h4>《条款信息》</h4>
                    <div className="comstyle">
                        <ul style={{height:'100%'}}>
                            <li className="iframerool" style={{height:'100%'}}>
                                {ifram}
                            </li>
                        </ul>
                    </div>
                    <p id="close" onTouchStart={this.startClick} onTouchEnd={this.closeClick}>确定</p>
                </div>
            </div>
        )
    }
})
module.exports = RulesToop