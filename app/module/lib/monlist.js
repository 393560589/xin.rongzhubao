/**
 * Created by gongchuangshidai on 16/10/29.
 */
var React = require('react');

var data=[
    {
        name:''
    }
];

var Monlist =React.createClass({
    clickMove:function(event){

        var tar = event.currentTarget,
            check = '<pre class="iconfont">&#xe600;</pre>';
        if(this.props.ismon){
            var html = tar.children[0].innerHTML.replace(/<.+?>/gim,'');
            if(html<1000){
                html = html*10000
            }
            var inn = this.props.inner[0];
            var htmlinn= inn.getElementsByClassName('amount')[0];

            htmlinn.innerHTML=  html;
            if(htmlinn.innerHTML=='国产玻璃'){
                inn.parentNode.parentNode.setAttribute('itemID',1)
            }else if(htmlinn.innerHTML=='进口玻璃'){
                inn.parentNode.parentNode.setAttribute('itemID',2)
            }
        }
        tar.children[1].innerHTML = check;
        this.closeClick()
    },
    closeClick:function(){
        var monlist = React.findDOMNode(this.refs.monlist),
            moWr = React.findDOMNode(this.refs.moWr);
        function move(){
            monlist.style.opacity = 0;
            moWr.style.bottom = -100+'%';
        }
        function nonePlay(){
            monlist.style.display='none';
        }
        setTimeout(move,200)
        setTimeout(nonePlay,500)
    },
    render:function(){
        if(this.props.ismon){
                var mon,block;
                var resp = this.props.Mon.map(function(item){
                    if(item>49999){
                         mon = item/10000;
                         block = 'block'
                    }else{
                         mon = item
                         block = 'none';
                    }
                    return (
                        <li onClick={this.clickMove}>
                           <span className="pull-left">
                               {mon}
                           </span>

                            <i className="pull-right icon">

                            </i>
                            <span className="pull-right" style={{display:block}}>
                                   万元
                            </span>
                        </li>
                    )
                },this)


        }
        return (
            <div className="monlist" id="monlist" ref="monlist" style={{display:'none',opacity:1}}>
                <div className="mo-bt" id="moBt" ref="moBt">
                    <div className="mo-wr" id="moWr" ref="moWr">
                        <div className="fixedWrap">
                            <ul className="eve-li">
                                {
                                    resp
                                }
                            </ul>
                            <div className="noChoose" onClick={this.closeClick}>
                                不投保
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
module.exports= Monlist