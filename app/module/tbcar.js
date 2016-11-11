/**
 * Created by gongchuangshidai on 16/10/10.
 */
var React =require('react');
var {Router,Link,browserHistory} = require('react-router');

var url = require('./item/item');

var Back = require('./lib/goback')
var TbcarDe = require('./lib/tbcarDe');
var allWay = require('./item/publicFun');
var reqwest = require('reqwest');
var Load = require('./lib/Nextpage.js')

var $ = new allWay();
var dateTime=30;

var Tbcar = React.createClass({
    getInitialState:function(){
        return {
            isCircle:true
        }
    },
    componentDidMount:function(){
        var carMsg = React.findDOMNode(this.refs.carMsg),
            carWrap = $.id('carWrap'),
            tTop = $.id('tTop');
        tTop.style.display='none'
        carMsg.onclick = function(){
            tTop.style.position='fixed';
            tTop.style.top = 0;
            tTop.style.display='block'
            carWrap.style.bottom = 0+'%'
        }

        var getDate = $.id('getDate');
        getDate.onclick = function(){
            editDate(event)
        }
        $.id('getDate3').onclick = function(){
            editDate(event)
        }
        $.id('transfer').onclick=function(){
            editDate(event)
        }


    },
    checkMsgClick:function(event) {
        var tar = event.currentTarget;
        tar.style.backgroundColor ='#5A7CDD';
        var _this = this;

        var $ = new allWay(), data = {},
            date = React.findDOMNode(this.refs.date),//注册日期
            carCode = React.findDOMNode(this.refs.carCode),//车架号
            engine = React.findDOMNode(this.refs.engine),//发动机号
            idcard = React.findDOMNode(this.refs.idcard),//身份证
            moveCircle = React.findDOMNode(this.refs.moveCircle),//是否过户
            nameGet = React.findDOMNode(this.refs.nameGet),//姓名
            carMsg = React.findDOMNode(this.refs.carMsg),//车型
            changedate =React.findDOMNode(this.refs.changedate),//过户日期
            effect_time = React.findDOMNode(this.refs.date2);//保单生效日期

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        var now = new Date().getTime();
        var arr1 = date.value.split('-');// 注册日期
        var arr2 = changedate.value.split('-');//过户日期
        var arr3 = effect_time.value.split('-');//保单生效日期

        var oldtimes1 = new Date(parseFloat(arr1[0]),parseFloat(arr1[1]),parseFloat(arr1[2])).getTime();
        var oldtimes2 = new Date(parseFloat(arr2[0]),parseFloat(arr2[1]),parseFloat(arr2[2])).getTime();
        var oldtimes3 = new Date(parseFloat(arr3[0]),parseFloat(arr3[1]),parseFloat(arr3[2])-1).getTime();

        if (carMsg.innerHTML == '') {
            alert('请选择车型');
            return
        }
        if (!$.getCheckCode(carCode.value.toUpperCase())) {
            alert('请输入正确的车架号');
            return
        }
        if (!$.isEngine(engine.value.toUpperCase())) {
            alert('请输入正确的发动机号');
            return
        }
        if (date.value == '') {
            alert('请选择注册时间');
            return
        }else if(oldtimes1>now){
            alert('车辆注册日期必须早于今天');
            return
        }
        if(effect_time.value == ''){
            alert('请选择保单生效日期');
            return
        }else if(oldtimes3<now){
            alert('保单生效日期必须晚于今天');
            return
        }
        if(changedate.value != ''){
            if(oldtimes2<oldtimes1){
                alert('车辆过户日期必须晚于注册日期')
                return
            }
        }

        if (date.effect_time == '') {
            alert('请选择保单生效时间');
            return
        }
        if(moveCircle.id == '1'){

        }
        if (!$.chNa(nameGet.value)) {
            alert('请输入姓名');
            return
        }
        if (!$.validateIdCard(idcard.value.toUpperCase())) {
            alert('请输入正确格式的身份证号');
            return
        }

        $.id('load').style.display='block';

        //获取数据并且跳到下一个页面
        data.opid = opid;
        data.car_type =carMsg.innerHTML;
        data.car_id = carMsg.getAttribute('data');
        data.vin = carCode.value.toUpperCase();
        data.edg_no = engine.value.toUpperCase();
        data.log_time = date.value;
        data.transfer = moveCircle.id;
        data.tra_time = changedate.value;
        data.name = nameGet.value;
        data.card_no = idcard.value.toUpperCase();
        data.purchasePrice = carMsg.getAttribute('value');
        data.seatNoForCheck = carMsg.className;
        data.id = this.props.params.userId;
        data.effect_time =effect_time.value;
        console.log(data)
        reqwest({
            url:url+'V1/cartwo',
            method:'POST',
            data:data,
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(resp){

                $.cookie('seat',data.seatNoForCheck-1,{path:'/',expires:dateTime});//座位号
                $.cookie('chanceId',resp.list,{path:'/',expires:dateTime});//null
                $.cookie('userName',data.name,{path:'/',expires:dateTime});//姓名
                $.cookie('idcard',data.card_no,{path:'/',expires:dateTime});//身份证
                $.cookie('effect_time',data.effect_time,{path:'/',expires:dateTime});//保单生效时间
                $.cookie('log_time',data.log_time,{path:'/',expires:dateTime});//注册日期
                $.cookie('edg_no',data.edg_no,{path:'/',expires:dateTime});//发动机号
                $.cookie('vin',data.vin,{path:'/',expires:dateTime});//车架号
                $.cookie('car_id',data.car_id,{path:'/',expires:dateTime})//车子data
                $.cookie('car_type',data.car_type,{path:'/',expires:dateTime});//车子名称
                $.cookie('purchasePrice',data.purchasePrice,{path:'/',expires:dateTime});//车子价格


                if(resp.code == 0){
                    browserHistory.push('/program/'+_this.props.params.userId)
                }else{
                    $.id('load').style.display = 'none';
                    alert(resp.msg);
                }


            },
            error:function(){}
        })
    }
    ,
    moveClick:function(event){
        var moveCircle = React.findDOMNode(this.refs.moveCircle),
            move = function(){},
            _this = this,
            change = React.findDOMNode(this.refs.change);
        move.prototype.left = function(){
            moveCircle.style.left =1+'px';
            moveCircle.parentNode.style.backgroundColor ='#C4C4C5'
        }
        move.prototype.right = function(){
            moveCircle.style.left =0.8+'rem';
            moveCircle.parentNode.style.backgroundColor ='#4CDB5D'
        }
        var say = new move();
        if(this.state.isCircle){
            say.right();
            moveCircle.id=1;
            _this.setState({
                isCircle:false
            });
            change.style.display = 'block'
        }else{
            moveCircle.id=0
            say.left();
            _this.setState({
                isCircle:true
            });
            change.style.display = 'none'
        }

    },
    startMoveClick:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor ='#5576d4';
    },
    render:function(){
        var seat='',
            idcard='',
            userName='',
            effect_time='',
            log_time='',
            edg_no='',
            vin='',
            car_id='',
            car_type='',
            purchasePrice='';

        if($.getCookie('userName') != null){
                seat=parseFloat($.getCookie('seat'))+1,
                idcard=$.getCookie('idcard'),
                userName=decodeURIComponent($.getCookie('userName'),'utf-8'),
                effect_time=$.getCookie('effect_time'),
                log_time=$.getCookie('log_time'),
                edg_no=$.getCookie('edg_no'),
                vin=$.getCookie('vin'),
                car_id=$.getCookie('car_id'),
                car_type=decodeURIComponent($.getCookie('car_type'),'utf-8'),
                purchasePrice=$.getCookie('purchasePrice');
        }
        return (
            <div className="tb-car">
                <Back tit='验证信息'/>
                <ul className="tb-det">
                    <li className="clearfix">
                        <b>姓名</b>
                        <span>
                            <input className="value" ref="nameGet" type="text" placeholder="请输入本人真实姓名" maxLength="10" defaultValue={userName}/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <b>身份证号</b>
                        <span>
                            <input className="value" ref="idcard" type="text" placeholder="请输入本人身份证号" defaultValue={idcard}/>
                        </span>
                    </li>
                </ul>
                <h4 className="se-tit">车辆信息</h4>
                <ul className="tb-det">
                    <li className="clearfix">
                        <b>车型</b>
                        <span id="carMsg" ref="carMsg" className ={seat} data={car_id} value={purchasePrice} >
                            {car_type}
                        </span>
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                    </li>
                    <li className="clearfix">
                        <b>车架号</b>
                        <span class="select-win" id="datesWrap1">
                            <input ref="carCode" className="value" type="text" placeholder="请输入17位车架号" maxLength="17" style={{textTransform:'uppercase'}} defaultValue={vin}/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <b>发动机号</b>
                        <span>
                            <input className="value" ref="engine" type="text" placeholder="请输入发动机号" style={{textTransform:'uppercase'}} defaultValue={edg_no}/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <b>注册日期</b>
                        <span>
                             <input className="value" id="getDate" ref="date" type="text" defaultValue={log_time} readOnly="readonly" name="input_date" placeholder="请输入日期" data-hl-calendar="2000-01-01,2018-01-29" />
                        </span>
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                    </li>
                    <li className="clearfix">
                        <b>保单生效</b>
                        <span>
                             <input className="value" id="getDate3" ref="date2" defaultValue={effect_time} type="text" readOnly="readonly" name="input_date" placeholder="请输入日期" data-hl-calendar="2000-01-01,2018-01-29" />
                        </span>
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                    </li>
                    <li className="clearfix">
                        <b>是否过户</b>
                        <div className="button" style={{width:'1.7rem'}} onClick={this.moveClick}>
                            <span className="circle" id="0" ref="moveCircle">
                            </span>
                        </div>
                    </li>
                    <li className="getTime clearfix" ref="change" style={{display:'none'}}>
                        <b>过户日期</b>
                        <span>
                             <input className="value" ref="changedate" id="transfer" type="text" readOnly="readonly" nly="" name="input_date" placeholder="请输入日期" data-hl-calendar="2000-01-01,2018-01-29" />
                        </span>
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                    </li>
                </ul>


                <Link className="abtn" onTouchStart={this.startMoveClick} onTouchEnd={this.checkMsgClick}>
                    下一步
                </Link>
                <TbcarDe />
                <Load />
            </div>
        )
    }
})
module.exports = Tbcar;