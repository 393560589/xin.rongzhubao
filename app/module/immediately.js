/**
 * Created by gongchuangshidai on 16/10/31.
 */
var React = require('react');
var RulesToop = require('./lib/imRule');
var {Router,Route,Link,browserHistory} = require('react-router');
var Back = require('./lib/goback');
var allWay = require('./item/publicFun.js');
var reqwest = require('reqwest');
var url = require('./item/item.js');
var Load = require('./lib/Nextpage');

var $ = new allWay();
var Imme = React.createClass({
    getInitialState:function(){
        return {
            rule:null,
            isrule:false
        }
    },
    componentDidMount:function(){


        $.id('load').style.display='none';

        var area2 = new LArea();
        area2.init({
            'trigger': 'address',
            'valueTo': 'value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });

        $.id('close').onclick = function(){
            $.id('checked').checked='checked';
        }

    },
    copyClick:function(event){
        var tar = event.currentTarget,
            val = React.findDOMNode(this.refs.carName).innerHTML;
        tar.parentNode.getElementsByTagName('input')[0].value = val
    },
    rulesBlock:function(event){
        var tar = event.currentTarget;
        console.log(tar.id)
        this.setState({
            rule:tar.id,
            isrule:true
        })
        var wp = $.id('toopwp');
        wp.style.display='block';
    },
    moveColor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5576d4';

    },
    leaveColor:function(event){
        var $ = new allWay(),_this = this;
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5A7CDD';

        if($.id('checked').checked == false){
            alert('请阅读并同意条款信息');
            return
        }
        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        var address={
            idcard:$.getCookie('idcard'),//身份证
            applicant : $.id('applicant').value,//投保人
            policy:$.id('policy').value,//被保人
            receiver:$.id('receiver').value,//收件人
            rePhone:$.id('rePhone').value,//收件人手机号
            address:$.id('address').value,//收件地址
            addDe:$.id('addDe').value,//收件详细地址
            list:this.props.params.userId//订单号
        }
        if(address.receiver==''){
            alert('请输入收件人姓名')
            return
        }
        if(!$.isPhone(address.rePhone)){
            alert('请输入正确的收件人手机号')
        }
        if(address.policy == ''){
            alert('请输入被保人姓名')
            return
        }
        if(address.applicant == ''){
            alert('请输入投保人姓名')
            return
        }
        if(address.address == ''){
            alert('请输入地区')
            return
        }
        if(address.addDe == ''){
            alert('请输入详细地址!')
            return
        }
        $.id('load').style.display='block';
        reqwest({
            url:url+'V1/address',
            method:'post',
            data:address,
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code == 0){
                    browserHistory.push('/chmsg/'+_this.props.params.userId);
                }else{
                    alert(xrh.msg)
                }
            },
            error:function(){}
        })

    },
    render:function(){
        var $ = new allWay(),
            data={};

        data.name = $.getCookie('userName');
        data.phone = $.getCookie('userPhone');
        data.idcard = $.getCookie('idcard');
        var userName = decodeURIComponent(data.name,"utf-8");

        return (
            <div className="immediately">
                <Back url={"/program/"+this.props.params.userId} tit="立即报价" />
                <h4 className="se-tit">
                    车主信息
                </h4>
                <ul className="eve-li clearfix">
                    <li>
                        <span className="leftspan pull-left">姓名</span>
                        <p className="pull-left" id="userName" ref="carName">
                            {userName}
                        </p>
                    </li>
                    <li>
                        <span className="leftspan pull-left">身份证号</span>
                        <p className="pull-left" id="idcard">
                            {data.idcard}
                        </p>
                    </li>
                    <li>
                        <span className="leftspan pull-left">手机号</span>
                        <p id="userPhone">{data.phone}</p>
                    </li>
                    <li>
                        <span className="leftspan pull-left">被投保人</span>
                        <span className="pull-left">
                            <input type="text" id="policy" className="pull-left" defaultValue="" placeholder="输入被投保人姓名"/>
                        </span>
                        <p className="pull-right button" onClick={this.copyClick}>
                            同车主
                        </p>
                    </li>
                    <li>
                        <span className="leftspan pull-left">投保人</span>
                        <span className="pull-left">
                            <input type="text" id="applicant" className="pull-left" placeholder="请输入投保人姓名"/>
                        </span>
                        <p className="pull-right button" onClick={this.copyClick}>
                            同车主
                        </p>
                    </li>
                </ul>
                <h4 className="se-tit">
                    配送地址
                </h4>
                <ul className="eve-li">
                    <li className="clearfix">
                        <span className="leftspan pull-left">收件人</span>
                        <span className="pull-left">
                            <input type="text" id="receiver" className="pull-left" defaultValue={userName}/>
                        </span>
                        <p className="pull-right button" onClick={this.copyClick}>
                            同车主
                        </p>
                    </li>
                    <li className="clearfix">
                        <span className="leftspan pull-left">手机号</span>
                        <input defaultValue={data.phone} id="rePhone" className="phoneValue pull-left" type="tel" maxLength="11"/>
                    </li>
                    <li className="clearfix">
                        <span className="leftspan pull-left">地区选择</span>
                        <span className="content-block pull-left">
                            <input id="address" type="text" className="pull-left" readOnly="readonly" placeholder="城市选择特效"/>
                            <input id="value2" type="hidden" value="110000,110100,110101"/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <span className="leftspan pull-left">地区选择</span>
                        <span className="content-block">
                           <input type="text" id="addDe" className="inputCom pull-left" placeholder="xx街道xx单元xx室"/>
                        </span>
                    </li>
                </ul>
                <p className="rules clearfix" >
                    <input type="checkbox" id="checked"/>
                    <span>
                        立即报价即表示同意条款信息
                        <span className="buleColor" id="http://h5.rongzhubao.cn/rules3.html" onClick={this.rulesBlock}>《商业险》</span>
                        <span className="buleColor" id="http://h5.rongzhubao.cn/rules4.html" onClick={this.rulesBlock}>《交强险》</span>
                        <span className="buleColor" id="http://h5.rongzhubao.cn/rules5.html" onClick={this.rulesBlock}>《免责申明》</span>
                    </span>
                </p>
                <Link onTouchStart={this.moveColor} onTouchEnd={this.leaveColor} className="abtn">
                    确认信息
                </Link>
                <RulesToop src={this.state.rule} right={this.state.isrule}/>
                <Load />
            </div>
        )
    }
})
module.exports = Imme;