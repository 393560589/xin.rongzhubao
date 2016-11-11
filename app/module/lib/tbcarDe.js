/**
 * Created by gongchuangshidai on 16/10/10.
 */
var React =require('react');

var {Router,Link,browserHistory} = require('react-router');

var reqwest = require('reqwest');
var GoBack = require('./back');
var url = require('../item/item');
var allWay = require('../item/publicFun.js');


var cars=[
    '大众','奔驰','宝马','凯迪拉克','奥迪','福特','别克','雪弗兰','捷豹','马自达'
]
var TbcarDe = React.createClass({
    getInitialState:function(){
        return {
            iscarName:false,
            carName:null,
            carload:null,
            iscar:false
        }
    },
    componentDidMount:function(){
        var $ = new allWay();

        var tbcarDe = $.id('tbcarDe'),
            carWrap = $.id('carWrap'),
            tTop = $.id('tTop'),
            searchId = $.id('searchId');
        tTop.onclick = function(){
            tTop.style.display='none'
            carWrap.style.bottom = 100+'%';
        }


        carWrap.style.bottom = 100+'%';

        searchId.onsearch = function(){
            this.clickCarName()
        }

    },
    clickCarName:function(event){
        var car = React.findDOMNode(this.refs.search),
            _this = this,
            $ = new allWay();

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        var modelName = car.value;
        reqwest({
            url:url+'V1/insurance',
            method:'post',
            data:{
                modelName:modelName,
                comCode:$.getCookie('comcode'),
                _action:'queryJyVehicleConfiguration'
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                var carMsg= eval(xrh);
                if(_this.isMounted()){
                    _this.setState({
                        carload:carMsg,
                        iscar:true
                    })
                }
            }
        })

    },
    searchCarClick:function(event){
        var car = event.target,
            _this = this;
        var carChild = car.parentNode.children,
            $ = new allWay(),
            comcode = $.getCookie('comcode'),
            modelName = car.innerHTML;
        for(var i=0,len=carChild.length;i<len;i++){
            carChild[i].style.backgroundColor='#fff'
        }

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);

        car.style.backgroundColor='#eaeaea';

        reqwest({
            url:url+'V1/insurance',
            method:'post',
            data:{
                modelName:modelName,
                comCode:comcode,
                _action:'queryJyVehicleConfiguration'
            },
            headers:{
                'Authorization':'Basic '+base,
                'Accept':'application/json, text/plain, */*'
            },
            success:function(xrh){
                var carMsg= eval(xrh);

                if(_this.isMounted()){
                    _this.setState({
                        carload:carMsg,
                        iscar:true
                    })
                }
            }
        })
    },
    getValue:function(event){
        var $ =new allWay();

        var liVal =event.currentTarget;
        var carMsg = $.id('carMsg'),
            carWrap =$.id('carWrap'),
            tTop = React.findDOMNode(this.refs.tTop);
        carMsg.innerHTML = liVal.id;
        tTop.style.display='none';
        carMsg.setAttribute('data',liVal.getAttribute('data'));
        carMsg.setAttribute('value',liVal.className);
        carMsg.className = liVal.getAttribute('value');
        carWrap.style.bottom = 100+'%';


    },
    render:function(){
        var _this = this;
        if(_this.state.iscar){
            var carList = _this.state.carload.map(function(item){
                return (
                    <li onClick={this.getValue} ref="cars"
                        id={item.vehicleName}
                        data={item.vehicleCode}
                        value={item.seat}
                        className={item.purchasePrice}
                    >
                        {item.vehicleName}
                        {item.carRemark}
                        {item.seat}座
                        {item.purchasePrice/10000}万元
                    </li>
                )
            },_this)
        }

        return (
            <div className="carWrap" id="carWrap" ref="carWrap">
                <GoBack tit="投保车型" id="tTop" ref="tTop"/>
                <div className="tbcarDe" id="tbcarDe" style={{paddingTop:'2rem'}}>
                    <div className="serch clearfix">
                        <i className="iconfont" onTouchEnd={this.clickCarName}>&#xe605;</i>
                        <input type="search" placeholder="请输入品牌车名称搜索" id="searchId" ref="search" onTouchEnd={this.clickCarName} />

                    </div>
                    <h4 className="se-tit">
                        热门品牌
                    </h4>
                    <ul className="hot-li clearfix">
                        {
                            cars.map(function(item){
                                return (
                                    <li onClick={this.searchCarClick}>{item}</li>
                                )
                            },this)
                        }
                    </ul>
                    <h4 className="se-tit">
                        车型检索
                    </h4>
                    <ul className="eve-li">
                        {carList}
                    </ul>
                </div>
            </div>
        )
    }
})
module.exports = TbcarDe;