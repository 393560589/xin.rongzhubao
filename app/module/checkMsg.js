/**
 * Created by gongchuangshidai on 16/11/3.
 */
var React = require('react');
var Back =require('./lib/goback');
var {Router,Route,Link,browserHistory} = require('react-router');
var allWay = require('./item/publicFun.js');
var reqwest = require('reqwest');
var url = require('./item/item.js');
var Load = require('./lib/Nextpage');

var $ =new allWay();

var CheckMsg = React.createClass({
    imgUrlget:function(event){
        var tar = event.currentTarget;

        if(tar.value != ''){
            var data = tar.files;
            var formData = new FormData();
            formData.append('upfile',data[0])
            reqwest({
                url: 'http://www.rongzhubao.cn/upload.php',
                method: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (xrh) {
                    var xrh = eval('['+xrh+']');
                    console.log(xrh[0].img);

                    tar.parentNode.children[0].src=xrh[0].img;
                }
            })
        }
    },
    NextClick:function(){
        var card_img = $.id('card_img').getAttribute('src'),
            card_img2 = $.id('card_img2').getAttribute('src'),
            dri_img = $.id('dri_img').getAttribute('src'),
            dri_img2 = $.id('dri_img2').getAttribute('src'),
            bank_card = $.id('bank_card').value,
            order_id = this.props.params.userId;

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        if(card_img == ''){
            alert('请上传身份证正面')
            return
        }
        if(card_img2 == ''){
            alert('请上传身份证反面')
            return
        }
        if(dri_img == ''){
            alert('请上传行驶证正本')
            return
        }
        if(dri_img2 == ''){
            alert('请上传行驶证副本')
            return
        }
        if(bank_card == ''){
            alert('请输入银行卡')
            return
        }
        if(!$.bankCheck(bank_card)){
            alert('请输入正确的银行卡号')
            return
        }
        $.id('load').style.display='block'
        var data = {
            card_img:card_img,
            card_img2:card_img2,
            dri_img:dri_img,
            dri_img2:dri_img2,
            bank_card:bank_card,
            order_id:order_id
        }


        reqwest({
            url:url+'V1/orderinfo',
            method:'post',
            data:data,
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                $.id('load').style.display='none';
                if(xrh.code == 0){
                    browserHistory.push('/order/'+order_id)
                }else{
                    alert(xrh.msg)
                }

            },
            error:function(){}
        })


    },
    render:function(){
       var data={};
        data.name = $.getCookie('userName');
        data.phone = $.getCookie('userPhone');
        data.idcard = $.getCookie('idcard');
        var userName = decodeURIComponent(data.name,"utf-8");

        return (
            <div className="checkMsg">
                <Back url={"/order/"+this.props.params.userId} tit="信息审核"/>
                <h4 className="toops">
                    为了确保此次为您的本人操作，以及保险业务顺利办理，需要您按照提示，上传身份证正、反照以及您名下的常用借记卡；
                </h4>
                <div className="ph-wp">
                    <ul className="clearfix ">
                        <li className="pull-left">
                            <div className="imgbox">
                                <img src='' alt="" id="card_img"/>
                                <input type="file" name="idcard1" className="comcss" onChange={this.imgUrlget}/>
                            </div>
                            <p>身份证正面</p>
                        </li>
                        <li className="pull-left mid">
                            <div className="imgbox">
                                <img src='' alt="" id="card_img2"/>
                                <input type="file" name="idcard2" className="comcss" onChange={this.imgUrlget} />
                            </div>
                            <p>身份证反面</p>
                        </li>
                        <li className="pull-left">
                            <div className="imgbox">
                                <img src="" alt="" id="dri_img"/>
                                    <input type="file" name="bank" className="comcss" onChange={this.imgUrlget} />
                            </div>
                            <p>行驶证正本</p>
                        </li>
                        <li className="pull-left mid">
                            <div className="imgbox">
                                <img src="" alt="" id="dri_img2"/>
                                <input type="file" name="bank" className="comcss" onChange={this.imgUrlget} />
                            </div>
                            <p>行驶证副本</p>
                        </li>
                    </ul>
                    <p style={{textAlign:'center',lineHeight:'1.5rem',color:'#ccccc9'}}>请上传小于1M/张的图片</p>
                </div>
                <h4 className="se-tit">
                    绑定常用借记卡
                </h4>
                <ul className="eve-li">
                    <li className="clearfix">
                        <span className="pull-left">姓名</span>
                        <span className="pull-right">
                            <input type="text" placeholder="姓名" value={userName} />
                        </span>
                    </li>
                    <li className="clearfix">
                        <span className="pull-left">身份证号</span>
                        <span className="pull-right" style={{width:'70%'}}>
                            <input type="text" placeholder="请输入身份证号" value={data.idcard}  style={{width:'100%'}}/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <span className="pull-left">银行卡号</span>
                        <span className="pull-right" style={{width:'70%'}}>
                            <input type="text" placeholder="请输入银行卡号" id="bank_card" style={{width:'100%'}}/>
                        </span>
                    </li>
                    <li className="clearfix">
                        <span className="pull-left">手机号</span>
                        <span className="pull-right">
                            <input type="text" placeholder="请输入手机号" value={data.phone}/>
                        </span>
                    </li>
                </ul>
                <Link className="abtn" onTouchEnd={this.NextClick}>
                    提交审核
                </Link>
                <Load />
            </div>
        )
    }
})
module.exports = CheckMsg
