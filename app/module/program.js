/**
 * Created by gongchuangshidai on 16/10/28.
 */
var React = require('react');
var {Route,Router,Link,browserHistory} = require('react-router');
var url = require('./item/item');
var reqwest = require('reqwest');
var allWay = require('./item/publicFun.js');
var Back = require('./lib/goback.js');

var Load = require('./lib/Nextpage.js');

var Prolist = require('./lib/programchild.js');
var Monlist = require('./lib/monlist.js');

var  $ = new allWay();

var Program = React.createClass({
    getInitialState:function(){
        return {
            isjson:false,
            json:null,
            isheight:false,
            mondata:[],
            ismondata:false,
            innrData:null,
            isdata:false,
            Apre:'',
            Bpre:'',
            D3pre:'',
            D4pre:'',
            G1pre:'',
            Fpre:'',
            Lpre:'',
            Zpre:'',
            Mpre:'',
            A4pre:'',
            BZ:'',
            TAX:''

        }
    },
    componentDidMount:function(){
        var _this = this;
        var chanceId = $.getCookie('chanceId'),
            getDate1 = $.id('getDate1');

        getDate1.onclick = function(){
            editDate(event)
        };

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);


        function c(id){
            return document.getElementsByClassName(id)
        }


        var dataJson = {},
            amountB = [],
            amountD4 = [],
            modeCodeF=[],
            checkbox=[],
            amountL=[],
            amountD3=[];


        reqwest({
            url:'http://api.rongzhubao.cn/V1/insurance',
            method:'post',
            data:{
                chanceId:chanceId,
                _action:'calculationHtml'
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                $.id('getvalInthis').innerHTML = xrh;
                for(var i = 0,len = $.id('amount_B').children.length;i<len;i++){
                    amountB.push($.id('amount_B').children[i].value);
                }
                for(var j = 0,leng = $.id('amount_D4').children.length;j<leng;j++){
                    amountD4.push($.id('amount_D4').children[j].value);
                }
                for(var h = 0,lengs = $.id('modeCode_F').children.length;h<lengs;h++){
                    modeCodeF.push($.id('modeCode_F').children[h].innerHTML);
                }
                for(var s = 0,le = c('checkbox').length;s<le;s++){
                    checkbox.push(
                        {
                            tit:c('checkbox')[s].innerHTML.replace(/<.+?>/gim,''),
                            value:c('checkbox')[s].getElementsByTagName('input')[0].value
                        }
                    );
                }
                for(var p = 0,leg = $.id('amount_L').length;p<leg;p++){
                    amountL.push($.id('amount_L')[p].value)
                }
                for(var q = 0,leq = $.id('amount_D3').length;q<leg;q++){
                    amountD3.push($.id('amount_D3')[q].value)
                }
                $.id('load').style.display='none';

                dataJson={
                    tishi_A:$.id('tishi_A').innerHTML,//车辆损失险
                    amount_A:$.id('amount_A').value,//车辆损失险的预算价位30%浮动
                    tishi_B:$.id('tishi_B').innerHTML,//第三人责任保险
                    amount_B:amountB,//第三人责任险价位
                    tishi_G1:$.id('tishi_G1').innerHTML,//全车盗抢保险
                    amount_G1:$.id('amount_G1').value,//全车盗抢保险估算
                    tishi_D3:$.id('tishi_D3').innerHTML,//车上人员责任保险(司机)
                    amount_D3:amountD3,//车上人员责任险(司机)
                    tishi_D4:$.id('tishi_D4').innerHTML,//车上人员责任险(乘客)
                    amount_D4:amountD4,//车上人员责任险(乘客)金额
                    tishi_F:$.id('tishi_F').innerHTML,//单独玻璃险
                    modeCode_F:modeCodeF,//玻璃险的内容
                    tishi_Z:$.id('tishi_Z').innerHTML,//自燃损失险
                    amount_Z:$.id('amount_Z').value,//自然损失价位
                    tishi_L:$.id('tishi_L').innerHTML,//车身划痕损失险
                    amount_L:amountL,//车身划痕险损失险价格
                    tishi_M:$.id('tishi_M').innerHTML,//不计责任车辆损失险
                    tishi_A4:$.id('tishi_A4').innerHTML,//指定修理厂险
                    checkbox:checkbox//第三方不计责任车辆损失险
                }
                if(_this.isMounted()){
                    _this.setState({
                        json:dataJson,
                        isjson:true
                    })
                }

            },
            error:function(){}
        })
    },

    moreClick:function(){
        var insuranList = React.findDOMNode(this.refs.insuranList),
            icon = React.findDOMNode(this.refs.icon);
        var more = '<pre class="iconfont">&#xe63c;</pre>';
        var less = '<pre class="iconfont">&#xe634;</pre>';
        if(this.state.isheight){
            insuranList.style.height = 6.1+'rem';
            icon.innerHTML = more
        }else{
            insuranList.style.height = 27.6+'rem';//总高度.可以计算.第二版更新
            icon.innerHTML = less
        }
        this.setState({
            isheight:!this.state.isheight
        })

    },
    moreChoose:function(){
        var prolist = document.getElementById('prolist');
        prolist.style.left = 0;
    },
    disBlock:function(){

        var monli = $.id('monlist'),
            moWr = $.id('moWr'),
            icon = document.getElementsByClassName('icon');
        for(var i=0,len=icon.length;i<len;i++){
            icon[i].innerHTML = ''
        }
        function move(){
            monli.style.opacity = 1;
            moWr.style.bottom = 0;

        }
        function nonePlay(){
            monlist.style.display='block';
        }
        setTimeout(move,400)
        setTimeout(nonePlay,200)
    },
    amountBCLick:function(event){
        var inner = event.currentTarget.getElementsByClassName('inner');
        this.setState({
            mondata:this.state.json.amount_B,
            ismondata:true,
            innrData:inner
        })
        this.disBlock();
    },
    amountD3Click:function(event){
        var inner = event.currentTarget.getElementsByClassName('inner');
        this.setState({
            mondata:this.state.json.amount_D3,
            ismondata:true,
            innrData:inner
        })
        this.disBlock();
    },
    amountD4Click:function(event){
        var inner = event.currentTarget.getElementsByClassName('inner');
        this.setState({
            mondata:this.state.json.amount_D4,
            ismondata:true,
            innrData:inner
        })
        this.disBlock();
    },
    amountL1Click:function(event){
        var inner = event.currentTarget.getElementsByClassName('inner');
        this.setState({
            mondata:this.state.json.amount_L,
            ismondata:true,
            innrData:inner
        })
        this.disBlock();
    },
    modeCodeClick:function(event){
        var inner = event.currentTarget.getElementsByClassName('inner');
        this.setState({
            mondata:this.state.json.modeCode_F,
            ismondata:true,
            innrData:inner
        })
        this.disBlock();
    },
    changeClick:function(event){
        var tar = event.currentTarget,
        data = tar.parentNode.getAttribute('data');


        if(data == 0){
            tar.style.color = '#5A7CDD';
            tar.parentNode.setAttribute('data',1);
        }else{
            tar.style.color = '#e9e9e9';
            tar.parentNode.setAttribute('data',0);
        }
    },
    moreCheckone:function(event){
        var tar = event.currentTarget,
            kindflag = tar.parentNode.getAttribute('name'),
            data = tar.parentNode.getAttribute('data');

        if(kindflag == 1){
            tar.parentNode.setAttribute('name',0);
        }else{
            tar.parentNode.setAttribute('name',1);
        }
        var chil = document.getElementsByClassName(tar.parentNode.id)[0];
        var icon = chil.getElementsByClassName('iconfont')[0];



        if(data == 0){
            tar.style.color = '#5A7CDD';
            tar.parentNode.setAttribute('data',1);
            icon.style.color='#5A7CDD';
            chil.setAttribute('data',1);
        }else{
            tar.style.color = '#e9e9e9';
            tar.parentNode.setAttribute('data',0);
            icon.style.color='#eaeaea';
            chil.setAttribute('data',0);
        }
    },
    addLessClick:function(){

        var checkIn = document.getElementsByClassName('eve-list'),
            charr=[],kindArray=[],_this = this;
        var chanceId = $.getCookie('chanceId');
        $.id('load').style.display = 'block';


        for(var i=0,len=checkIn.length;i<len;i++){
            if(checkIn[i].getAttribute('data') == '1'){
                charr.push(checkIn[i])
            }
        }
        for(var j=0,leng=charr.length;j<leng;j++){
            if(charr[j].getAttribute('itemID') != ''){
                kindArray.push(
                    {
                        kindCode:charr[j].getAttribute('value'),
                        amount:0,//钱1
                        unitAmount:0,//钱2
                        serialNo : 1,//无用
                        quantity:parseFloat(charr[j].getAttribute('accept')),//accept 只有D4是7
                        deductibleRate:0,
                        value:0,
                        kindFlag: parseFloat(charr[j].getAttribute('name')),//只有B有1 name=kindflag
                        modeCode:charr[j].getAttribute('itemID')//玻璃才有
                    }
                )
            }else{
                kindArray.push(
                    {
                        kindCode:charr[j].id,
                        amount:parseFloat(charr[j].getElementsByClassName('amount')[0].innerHTML)*charr[j].getAttribute('accept'),//钱1
                        unitAmount:charr[j].getElementsByClassName('amount')[0].innerHTML,//钱2
                        serialNo : 1,//无用
                        quantity:parseFloat(charr[j].getAttribute('accept')),//accept 只有D4是7
                        deductibleRate:charr[j].getAttribute('accept'),
                        value:0,
                        kindFlag: parseFloat(charr[j].getAttribute('name')),//只有B有1 name=kindflag
                        modeCode:charr[j].getAttribute('itemID')//玻璃才有
                    }
                )
            }

        }
        kindArray.push(
            {
                kindCode:'BZ',
                amount:122000,//钱1
                unitAmount:122000,//钱2
                serialNo : 1,//无用
                quantity:1,
                deductibleRate:0,
                kindFlag: 0,//只有B有1 name=kindflag
                value:0,
                modeCode:''
            },{
                kindCode:'M',
                amount:0,//钱1
                unitAmount:0,//钱2
                serialNo : 1,//无用
                quantity:1,
                deductibleRate:0,
                kindFlag: 0,//只有B有1 name=kindflag
                value:0,
                modeCode:''
            }
        )

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);


        reqwest({
            url:url+'V1/insurance',
            method:'post',
            data:{
                answer:'&',
                chanceId:chanceId,
                kindArray:kindArray,
                _action:'insuranceCalculate',
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                $.id('load').style.display = 'none';
                var json =xrh
                var jsondata = eval('['+json+']');

                console.log(jsondata)
                if(jsondata[0].ckinds == undefined){
                    alert(xrh)
                    return
                }
                _this.setState({
                    isdata:false,
                    Apre:'',
                    Bpre:'',
                    D3pre:'',
                    D4pre:'',
                    G1pre:'',
                    Fpre:'',
                    Lpre:'',
                    Zpre:'',
                    Mpre:'',
                    BZ:'',
                    TAX:''
                })
                for(var i=0,len = jsondata[0].ckinds.length;i<len;i++){

                    if(jsondata[0].ckinds[i].kindCode =='A'){
                        _this.setState({
                            isdata:true,
                            Apre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='B'){
                        _this.setState({
                            isdata:true,
                            Bpre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='D3'){
                        _this.setState({
                            isdata:true,
                            D3pre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='L'){
                        _this.setState({
                            isdata:true,
                            Lpre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='Z'){
                        _this.setState({
                            isdata:true,
                            Zpre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='F'){
                        _this.setState({
                            isdata:true,
                            Fpre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='G1'){
                        _this.setState({
                            isdata:true,
                            G1pre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='D4'){
                        _this.setState({
                            isdata:true,
                            D4pre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='M'){
                        _this.setState({
                            isdata:true,
                            Mpre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='A4'){
                        _this.setState({
                            isdata:true,
                            A4pre:jsondata[0].ckinds[i].premium
                        })
                    }
                    if(jsondata[0].ckinds[i].kindCode =='BZ'){
                        _this.setState({
                            isdata:true,
                            BZ:jsondata[0].ckinds[i].premium
                        })
                    }
                    _this.setState({
                        isdata:true,
                        TAX:jsondata[0].cpayTax
                    })

                }
            }
        })

    },
    getMsgClick:function(event){

         var Bcal = $.id('Bcal'),
            checkIn = document.getElementsByClassName('eve-list'),
            arr=[],
            all_fee = parseFloat(Bcal.innerHTML),
            _this = this,
            tar = event.currentTarget;

        tar.style.backgroundColor='#5A7CDD';

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        if(all_fee == 0){
            alert('请先计算保费');
            return
        }
        $.id('load').style.display='block';

        var B = function(id,value){
            return id.getElementsByClassName(value)[0].innerHTML
        };

        for(var i=0,len = checkIn.length;i<len;i++){
            if(checkIn[i].getAttribute('data')==1){
                arr.push(
                    {
                        name:B(checkIn[i],'this_Name'),
                        limit:B(checkIn[i],'amount'),
                        prMon:B(checkIn[i],'pr-mon')
                    }
                );
                //总保费all_fee,id,arr
            }
        }//数据获取
        arr.push(
            {
                name:'不计免赔特约',
                limit:'',
                prMon:$.id('three').innerHTML
            }
        )
        arr.push(
            {
                name:'交强险',
                limit:'122000',
                prMon:$.id('BZ').innerHTML
            }
        );
        arr.push(
            {
                name:'车船线',
                limit:'',
                prMon:$.id('TAX').innerHTML
            }
        )
        reqwest({
            url:url+'V1/order',
            method:'post',
            data:{
                arr:arr,
                one_id:$.getCookie('chanceId'),
                all_fee:all_fee
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code == 0 ){
                    browserHistory.push('/imme/'+xrh.list);
                }
            },
        })

    },
    changecolor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor = '#5576d4'
    },
    resetData:function(event){
        var date = React.findDOMNode(this.refs.date);

        var tar = event.currentTarget;
        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        reqwest({
            url:url+'V1/insurance',
            method:'post',
            data:{
                chanceId:$.getCookie('chanceId'),
                effectDate:date.value,
                _action:'saveChanceInfo'
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code == 0){
                    $.cookie('chanceId',xrh.list)
                    alert('保单生效时间修改成功!')
                }else{
                    alert(xrh.msg)
                }
            }
        })
    },
    render:function(){
        var _this = this,
            $ = new allWay(),
            all = 0,
            BZ=0,
            alltop=0,
            TAX=0,
            seat = $.getCookie('seat'),
            effect_time = $.getCookie('effect_time');

        function N(num){
            if(num == ''){
                return num=0
            }
            return parseFloat(num)
        };
        if(this.state.isdata == true){

            var A = this.state.Apre,
                B = this.state.Bpre,
                D3 = this.state.D3pre,
                D4 = this.state.D4pre,
                G1 = this.state.G1pre,
                F = this.state.Fpre,
                Z = this.state.Zpre,
                L = this.state.Lpre,
                M = this.state.Mpre,
                A4 = this.state.A4pre;

            TAX=this.state.TAX;
           BZ=this.state.BZ;
            alltop= N(A)+N(B)+N(D3)+N(D4)+N(G1)+N(F)+N(Z)+N(Z)+N(L)+N(M)+N(A4)
           all = alltop+N(BZ)+N(TAX);
        }
        if(this.state.ismondata){
            var monlist = <Monlist ismon={this.state.ismondata} Mon={this.state.mondata} inner={this.state.innrData}/>
        }
        if(this.state.isjson){
            var allData = _this.state.json,
                props = <Prolist datajson={allData}/>,
                people_T = <span className="pull-left">{allData.tishi_M}</span>;
            var compont = <div>
                                <li className="eve-list clearfix" data="1" id="A" name="1" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose check" onClick={this.moreCheckone}>
                                        &#xe600;
                                    </i>
                                    <div className="tit-name pull-left">
                                        <p className="this_Name" id="this_A" data="A">
                                            车辆损失险
                                        </p>
                                        <p>保额<span className="amount">{allData.amount_A}</span>元</p>
                                    </div>
                                    <i className="iconfont pull-right">

                                    </i>
                                    <span className="pr-mon pull-right">{A}</span>
                                </li>
                                <li className="eve-list clearfix" data="1" id="B" name="1" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose check" onClick={this.moreCheckone}>
                                        &#xe600;
                                    </i>
                                    <div className="wrap clearfix" onClick={this.amountBCLick}>
                                        <div className="tit-name pull-left">
                                            <p className="this_Name" data="B">第三者责任险</p>
                                            <p className="inner">保额
                                                <span className="amount">
                                                    {allData.amount_B[2]}
                                                </span>
                                                元</p>
                                        </div>
                                        <i className="iconfont pull-right">
                                            &#xe602;
                                        </i>
                                        <span className="pr-mon pull-right">{B}</span>
                                    </div>


                                </li>
                                <li className="eve-list clearfix" data="0" id="D3" name="0" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose" onClick={this.changeClick}>
                                        &#xe600;
                                    </i>
                                    <div className="wrap clearfix" onClick={this.amountD3Click}>
                                        <div className="tit-name pull-left">
                                            <p className="this_Name" data="D3">车上人员险(司机)</p>
                                            <p className="inner">保额
                                                <span className="amount">
                                                    {allData.amount_D3[2]}
                                                </span>元
                                            </p>
                                        </div>
                                        <i className="iconfont pull-right">
                                            &#xe602;
                                        </i>
                                        <span className="pr-mon pull-right">
                                            {D3}
                                        </span>
                                    </div>

                                </li>
                                <li className="eve-list clearfix" data="0" id="D4" name="0" accept={seat} itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose " onClick={this.changeClick}>
                                        &#xe600;
                                    </i>
                                    <div className="wrap clearfix" onClick={this.amountD4Click}>
                                        <div className="tit-name pull-left">
                                            <p className="this_Name" data="D4">车上人员险(乘客)</p>
                                            <p className="inner">保额
                                                <span className="amount">
                                                    {allData.amount_D4[1]}
                                                </span>元
                                            </p>

                                        </div>
                                        <i className="iconfont pull-right">
                                            &#xe602;
                                        </i>
                                        <span className="pr-mon pull-right">
                                            {D4}
                                        </span>
                                    </div>


                                </li>
                                <li className="eve-list clearfix" data="0" value="F" id="F" name="0" accept="1" itemID="1" action="0">
                                    <i className="iconfont pull-left grayChoose" onClick={this.changeClick}>
                                        &#xe600;
                                    </i>
                                    <div className="tit-name pull-left" onClick={this.modeCodeClick}>
                                        <p className="this_Name" data="F">玻璃单独破碎险</p>
                                        <p data="1" className="inner">
                                            <span className="amount">
                                                {allData.modeCode_F[0]}
                                            </span>
                                            <span></span>
                                        </p>

                                    </div>

                                    <span className="pr-mon pull-right">{F}</span>
                                </li>
                                <li className="eve-list clearfix" data="0" id="G1" name="0" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose" onClick={this.moreCheckone}>
                                        &#xe600;
                                    </i>
                                    <div className="tit-name pull-left">
                                        <p className="this_Name" data="G">全车盗抢险</p>
                                        <p className="inner">保额
                                            <span className="amount">
                                                {allData.amount_G1}
                                            </span>元
                                        </p>

                                    </div>

                                    <span className="pr-mon pull-right">{G1}</span>
                                </li>
                                <li className="eve-list clearfix" data="0" id="L" name="0" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose" onClick={this.moreCheckone}>
                                        &#xe600;
                                    </i>
                                    <div className="wrap clearfix" onClick={this.amountL1Click}>
                                        <div className="tit-name pull-left">
                                            <p className="this_Name" data="L">车身划痕险</p>
                                            <p className="inner">保额
                                                <span className="amount">
                                                    {allData.amount_L[1]}
                                                </span>元
                                            </p>
                                        </div>
                                        <i className="iconfont pull-right">
                                            &#xe602;
                                        </i>
                                        <span className="pr-mon pull-right">{L}</span>
                                    </div>


                                </li>
                                <li className="eve-list clearfix" data="0" id="Z" name="0" accept="1" itemID="" action="0">
                                    <i className="iconfont pull-left grayChoose" onClick={this.moreCheckone}>
                                        &#xe600;
                                    </i>
                                    <div className="tit-name pull-left">
                                        <p className="this_Name" data="Z">自燃损失险</p>
                                        <p>保额
                                            <span className="amount">
                                                {allData.amount_Z}
                                            </span>元
                                        </p>
                                    </div>

                                    <span className="pr-mon pull-right">{Z}</span>
                                </li>
                                <li className="eve-list clearfix" data="0" id="A4" name="0" accept="1" itemID="" action="20">
                                    <i className="iconfont pull-left grayChoose" onClick={this.changeClick}>
                                        &#xe600;
                                    </i>
                                    <div className="tit-name pull-left">
                                        <p className="this_Name" data="Z" style={{lineHeight:'1.8rem'}}>指定修理厂险</p>
                                        <p style={{display:'none'}}>
                                            <span className="amount">0</span>
                                        </p>
                                    </div>

                                    <span className="pr-mon pull-right">{A4}</span>
                                </li>
                            </div>
        }
        return (
            <div className="program" id="program">
                <div className="getvalInthis" id="getvalInthis" style={{overflow: 'hidden',width: 0,height: 0}}>

                </div>
                <Back tit="投保方案" url={"/car/"+this.props.params.userId}/>
                <div className="dateTime clearfix">
                    <h4 className="pull-left">商业险</h4>
                    <div className="pull-right">
                        <span>
                            保单生效:
                        </span>
                        <span>
                            <input className="value" id="getDate1" ref="date"
                                   type="text" readOnly="readonly" name="input_date"
                                   defaultValue={effect_time} data-hl-calendar="2000-01-01,2018-01-29"/>
                        </span>
                        <span onTouchEnd={this.resetData}>
                            更改
                        </span>
                    </div>

                </div>
                <ul className="insuranceList anim" ref="insuranList">
                    {compont}
                </ul>
                <div className="moreChoose" onClick={this.moreClick}>
                    <i id="icon" ref="icon">
                       <pre className="iconfont">
                           &#xe63c;
                       </pre>
                    </i>
                    <span>收起更多保险保障</span>
                </div>
                <ul>
                    <li className="pro-li clearfix" onClick={this.moreChoose}>
                        {people_T}
                        <i className="iconfont pull-right">
                            &#xe602;
                        </i>
                        <span id="three" className="pull-right">{M}</span>
                    </li>
                    <li className="clearfix pro-li">
                        <span className="pull-left">商业险合计:</span>
                        <b className="pull-right">
                            {alltop.toFixed(2)}
                        </b>
                    </li>
                </ul>
                <div className="dateTime clearfix">
                    <h4 className="pull-left">交强险</h4>

                </div>
                <ul>
                    <li className="pro-li clearfix">
                        <span className="pull-left">交强险</span>
                        <b className="pull-right" id="BZ">{BZ}</b>
                    </li>
                    <li className="pro-li clearfix">
                        <span className="pull-left">车船险</span>
                        <b className="pull-right" id="TAX">{TAX}</b>
                    </li>
                </ul>
                <div className="calMon clearfix">
                    <button className="pull-left" onClick={this.addLessClick}>保费计算</button>
                    <div className="pull-right">
                        <span>总计</span>
                        <b id="Bcal" className="or" style={{color:'#FF9600;'}}>{all.toFixed(2)}</b>
                        <span>元</span>
                    </div>
                </div>
                <Link className="abtn" onTouchStart={this.changecolor} onTouchEnd={this.getMsgClick}>确认投保</Link>
                {props}
                {monlist}
                <Load />
            </div>
        )
    }
})
module.exports = Program;

