/**
 * Created by gongchuangshidai on 16/10/10.
 */
var React =require('react');
var {Router,Link,browserHistory} = require('react-router');
var url = require('./item/item');

var allWay =require('./item/publicFun.js');
var Back = require('./lib/goback.js');//slider广告banner
var TbPro = require('./lib/tbpro');
var reqwest = require('reqwest');
var Load = require('./lib/Nextpage');
var $ = new allWay();




var dateTime=30;
var TbMsg = React.createClass({
    getInitialState:function(){
        return {
            city:null,
            carId:null,
            phone:null,
            isUserid:false,
            userid:null
        }
    },
    componentDidMount:function(){


        var opid = $.getCookie('opid');
        var token = $.getCookie('token');

        var proWrap = $.id('proWrap'),
                pro =$.id('pro'),
                    h = -proWrap.offsetHeight+'px',
            tTop = $.id('tTop'),
            sure = $.id('sure'),
            nextPage = $.id('nextPage');//下一页

        $.id('load').style.display='none';

        pro.onclick = function(){
            tTop.style.position='fixed';
            tTop.style.top=0;
            proWrap.style.bottom = 0;
            sure.style.display = 'block';
            nextPage.style.display='none';
        }



    },
    saveData:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5A7CDD';


        var cityval = React.findDOMNode(this.refs.cityval),
            carId = React.findDOMNode(this.refs.carId),
            iphoneNum =React.findDOMNode(this.refs.iphoneNum),
            data={},_this = this;

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);


        if(cityval.innerHTML == ''){
            alert('请输入投保城市')
            return
        }
        if(!$.isLicenseNo(carId.value.toUpperCase())){
            alert('请输入正确的车牌号');
            return
        }
        if(!$.isPhone(iphoneNum.value)){
            alert('请输入正确的手机号')
            return
        }
        if($.id('recode').value == ''){
            alert('请输入验证码');
        }
        data.opid =opid;
        data.code = $.id('recode').value;
        data.city = cityval.getAttribute('data');
        data.cityName = cityval.innerHTML;
        data.car_no = carId.value.toUpperCase();
        data.phone = iphoneNum.value;
        data.ins_id = '1';

        $.cookie('comcode',data.city,{path:'/'})
        reqwest({
            url:url+'V1/carone',
            method:'post',
            data:data,
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code == 0){
                    $.id('load').style.display='block';
                    $.cookie('cityName',data.cityName,{path:'/',expires:dateTime});
                    $.cookie('city',data.city,{path:'/',expires:dateTime});
                    $.cookie('carId',data.car_no,{path:'/',expires:dateTime});
                    $.cookie('userPhone',data.phone,{path:'/',expires:dateTime});
                    browserHistory.push('/car/'+xrh.id)
                }else{
                    alert(xrh.msg)
                }
            }
        })

    },
    getcodeClick:function(){
        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);
        var phone = $.id('iphoneNum').value;
        if(phone == ''){
            alert('请输入手机号')
            return
        }
        reqwest({
            url:url+'V1/code',
            method:'post',
            data:{
                type:'reg',
                phone:phone
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                if(xrh.code == 0){
                    $.time($.id('getcode'))
                }else{
                    alert(xrh.msg)
                }
            }
        })
    },
    moveColor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5576d4';
    },
    render:function(){
        if(this.state.isUserid){
            var id = this.state.userid
        };
        var cityName='',city ='', carId='',userPhone = '';
        if($.getCookie('cityName') != null){
            cityName = decodeURIComponent($.getCookie('cityName'),'utf-8');
            city = $.getCookie('city');
            carId = decodeURIComponent($.getCookie('carId'),'utf-8');
            userPhone = $.getCookie('userPhone');
        }
        return (
            <div className="tb-msg">

                <Back tit='投保信息' url="/"/>

                <ul className="tb-det">
                    <li className="clearfix" id="pro">
                        <b>投保城市</b>
                        <span id="cityval" ref="cityval" data={city}>{cityName}</span>
                        <i className="iconfont" style={{float:'right'}}>
                            &#xe602;
                        </i>
                    </li>
                    <li>
                        <b>车牌号</b>
                        <span>
                            <input id="carId" ref="carId" defaultValue={carId} className="value" type="text" placeholder="请输入车牌信息" maxLength="7" style={{textTransform:'uppercase'}}  />
                        </span>
                    </li>
                    <li>
                        <b>手机号</b>
                        <span>
                            <input id="iphoneNum" ref="iphoneNum" defaultValue={userPhone} className="value" type="tel" placeholder="请输入11位手机号码" maxLength="11" />
                        </span>
                    </li>
                    <li className="clearfix">
                        <b>验证码</b>
                        <span style={{width:'9rem'}}>
                            <input id="recode" ref="recode" className="value" type="tel" placeholder="请输入收到的验证码" />
                        </span>
                        <input type="button" id="getcode" value="获取验证码" className="button pull-right" onTouchEnd={this.getcodeClick}/>
                    </li>

                </ul>
                <h4 className="se-tit">保险公司</h4>
                <ul className="companys">
                    <li>
                        <b>大地保险</b>
                        <i className="iconfont pull-right">
                            &#xe600;
                        </i>
                    </li>
                </ul>
                <Link className="abtn fixfor" id="nextPage"
                      onTouchStart={this.moveColor}
                      onTouchEnd={this.saveData}>
                    下一步
                </Link>
                <Load />
                <TbPro />
            </div>
        )
   }
});
module.exports = TbMsg;