/**
 * Created by gongchuangshidai on 16/11/2.
 */
var React = require('react');
var Back =require('./lib/goback');
var {Router,Route,Link,browserHistory} = require('react-router');
var allWay = require('./item/publicFun.js');
var reqwest = require('reqwest');
var url = require('./item/item.js');
var Load = require('./lib/Nextpage');

var $ = new allWay();

var times = [3,6,9]

var Order = React.createClass({
    getInitialState:function(){
        return {
            islist:false,
            list:null,
            allfee:null,
            times:6,
            istimes:false,
            rule:null,
            isrule:false,
        }
    },
    componentDidMount:function(){
        $.id('load').style.display='block';
        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token),
            _this = this;


        reqwest({
            url:url+'V1/carwar',
            method:'get',
            data:{
                order_id:this.props.params.userId
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                console.log(xrh.list);
                _this.setState({
                    islist:true,
                    allfee:xrh.all_fee,
                    list:xrh.list
                })
                $.id('load').style.display='none';
            }
        })


    },
    closeClick:function(event){
        var tar = event.currentTarget;

    },
    checkClick:function(event){
        var only = document.getElementsByClassName('chs');
        for(var i=0,len=only.length;i<len;i++){
            only[i].style.color='#e9e9e9'
        }
        var tar = event.currentTarget;

        tar.getElementsByTagName('i')[0].style.color='#5A7CDD';
        var mon = tar.getElementsByTagName('span')[0].children[0].innerHTML
        $.id('next').setAttribute('value',mon);
        this.setState({
            times:parseFloat(mon),
            istimes:true
        })
        setTimeout(function(){
            $.id('paylist').style.display = 'none';
        },200)

    },
    agreeClick:function(){
        $.id('load').style.display='block';
        var _this = this;
        var type = $.id('next').getAttribute('value');
        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);
        reqwest({
            url:url+'V1/fenqi',
            menthod:'get',
            data:{
                type:type,
                order_id:_this.props.params.userId
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code==0){
                    reqwest({
                        url:'http://api.rongzhubao.cn/V1/wappay',
                        method:'post',
                        dataType:'jsonp',
                        data:{
                            order_id:_this.props.params.userId
                        },
                        headers:{
                            'Authorization':'Basic '+base,
                            'Accept':'application/json, text/plain, */*'
                        },
                        success:function(xrh){
                            window.location.href = xrh
                        }
                    })
                }

            },
            error:function(){}

        })

    },
    closetoop:function(){
        var sr = document.getElementsByClassName('re-sr');
        for(var i=0,len=sr.length;i<len;i++){
            sr[i].style.display='none';
        }
    },
    toPay:function(event){
        var only = document.getElementsByClassName('only');
        for(var i=0,len=only.length;i<len;i++){
            only[i].style.color='#e9e9e9'
        }
        var tar= event.currentTarget;
        tar.children[0].style.color='#5A7CDD';

        var data=tar.getAttribute('data');

        $.id('next').setAttribute('data',data);
        if(data=='1'){
            $.id('paylist').style.display='block';

        }
    },
    takeOrder:function(event){
        var tar = event.currentTarget;
        var data = parseFloat(tar.getAttribute('data')),
            value = parseFloat(tar.getAttribute('value'));

        if(data == 1){
            $.id('allrules').style.display = 'block';
        }
        if(data==2){
            $.id('allpays').style.display = 'block';
        }
    },
    blockrules:function(event){
        var tar = event.currentTarget;
        this.setState({
            rule:tar.id,
            isrule:true
        })
        $.id('reSr').style.display='block';

    },
    ruleNone:function(){
        $.id('reSr').style.display='none';
    },
    render:function(){
        if(this.state.islist){
            var list = this.state.list.map(function(item){
                return (
                    <li className="clearfix">
                        <span className="pull-left">
                            {item.name}
                        </span>
                        <b className="pull-right">
                            {item.prMon}元
                        </b>
                    </li>
                )
            })
            var all,mou,fq;
            if(this.state.istimes){
                    all = this.state.allfee;
                    mou = this.state.times;

                    fq=<p className="pull-right">
                            {(parseFloat(all)/mou).toFixed(2)}元 x {mou}期={all}元
                        </p>
            }else{
                    all = this.state.allfee;
                    mou = this.state.times;
                    fq=<p className="pull-right">
                        {(parseFloat(all)/parseFloat(mou)).toFixed(2)}元 x {mou}期={all}元
                    </p>
            }

        }
        if(this.state.isrule){
            var rule = <iframe src={this.state.rule} frameborder="0" width="100%" height="100%"></iframe>

        }
        return (
            <div className="or-de">
                <Back tit="信息审核"/>
                <h4 className="se-tit clearfix">
                    <span className="pull-left">
                        订单号
                    </span>
                    <b className="pull-right">{this.props.params.userId}</b>
                </h4>
                <ul className="eve-li">
                    {list}
                </ul>
                <h4 className="se-tit">
                    分期支付(0利息0手续0首付)
                </h4>
                <ul className="eve-li">
                    <li className="clearfix"  onTouchEnd={this.toPay} data="1">
                        <i className="iconfont pull-left only" id="payable" >
                            &#xe600;
                        </i>
                        <span className="pull-left">
                           分期支付
                        </span>
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                        {fq}
                    </li>

                </ul>
                <Link className="abtn" id="next" data="0" value="6" onTouchEnd={this.takeOrder}>
                    提交订单
                </Link>
                <div className="fixed re-in" id="paylist" style={{display: "none"}}>
                    <div className="or-dv">
                        <ul className="eve-li">
                            {
                                times.map(function(item){
                                    return (
                                        <li className="clearfix" onTouchEnd={this.checkClick}>
                                            <span className="pull-left">
                                                <span>
                                                    {item}
                                                </span>期
                                            </span>
                                            <i className="iconfont pull-right chs">
                                                &#xe600;
                                            </i>
                                        </li>
                                    )
                                },this)
                            }
                        </ul>
                    </div>
                </div>
                <div className="fixed re-sr" id='allrules' style={{display: "none"}}>
                    <div className="re-dp">
                        <div className="re-lp">
                            <h5>
                                <p className="buleColor" id="http://h5.rongzhubao.cn/rules1.html" onTouchEnd={this.blockrules}>
                                    《分期车险退保须知》
                                </p>
                                <p className="buleColor" id="http://h5.rongzhubao.cn/rules2.html" onTouchEnd={this.blockrules}>
                                    《分期且信》
                                </p>
                            </h5>
                            <ul className="clearfix btnwp">
                                <li className="pull-left agree" id="close" onTouchEnd={this.closetoop}>取消</li>
                                <li className="pull-right" id="go" onTouchEnd={this.agreeClick}>同意</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="fixed re-sr" id="reSr" style={{display: "none"}}>
                    <div className="re-dp">
                        <div className="re-lp">
                            <h5>《 条款内容 》</h5>
                            <div className="rules comstyle">
                                <ul style={{height:'100%'}}>
                                    <li className="iframerool" style={{color:'#3d3d3e',height:'100%'}}>
                                        {rule}
                                    </li>
                                </ul>
                            </div>
                            <ul className="clearfix btnwp">
                                <li className="pull-left close" id="close" style={{width:'100%'}} onTouchEnd={this.ruleNone}>确定</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="fixed re-sr" id='allpays' style={{display: "none"}}>
                    <div className="re-dp">
                        <div className="re-lp">
                            <h4>
                                分期支付优惠多多,是否再考虑下分期支付呢
                            </h4>
                            <ul className="clearfix btnwp">
                                <li className="pull-left agree" id="close" onTouchEnd={this.closetoop}>返回分期</li>
                                <li className="pull-right" id="go" onTouchEnd={this.agreeClick}>继续支付</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Load />
            </div>
        )
    }
})
module.exports =Order;
