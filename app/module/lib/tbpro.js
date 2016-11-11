/**
 * Created by gongchuangshidai on 16/10/10.
 */


var data =[
    {
        value:'110100',
        city:'北京',
        car:'京'
    },
    {
        value:'120100',
        city:'天津',
        car:'津'
    },
    {
        value:'310100',
        city:'上海',
        car:'沪'
    },
    {
        value:'500100',
        city:'重庆',
        car:'渝'
    },
    {
        value:'130000',
        city:'河北',
        car:'冀'
    },
    {
        value:'140000',
        city:'山西',
        car:'晋'
    },
    {
        value:'150000',
        city:'内蒙古',
        car:'蒙'
    },
    {
        value:'210000',
        city:'辽宁',
        car:'辽'
    },
    {
        value:'220000',
        city:'吉林',
        car:'吉'
    },
    {
        value:'230000',
        city:'黑龙江'
    },
    {
        value:'320000',
        city:'江苏',
        car:'苏'
    },
    {
        value:'330000',
        city:'浙江',
        car:'浙'
    },
    {
        value:'340000',
        city:'安徽',
        car:'皖'
    },
    {
        value:'350000',
        city:'福建',
        car:'闽'
    },
    {
        value:'360000',
        city:'江西',
        car:'赣'
    },
    {
        value:'370000',
        city:'山东',
        car:'鲁'
    },
    {
        value:'410000',
        city:'河南',
        car:'豫'
    },
    {
        value:'420000',
        city:'湖北',
        car:'鄂'
    },
    {
        value:'430000',
        city:'湖南',
        car:'湘'
    },
    {
        value:'440000',
        city:'广东',
        car:'粤'
    },
    {
        value:'450000',
        city:'广西',
        car:'桂'
    },
    {
        value:'460000',
        city:'海南',
        car:'琼'
    },
    {
        value:'510000',
        city:'四川',
        car:'川'
    },
    {
        value:'520000',
        city:'贵州',
        car:'贵'
    },
    {
        value:'530000',
        city:'云南',
        car:'云'
    },
    {
        value:'540000',
        city:'西藏',
        car:'藏'
    },
    {
        value:'610000',
        city:'陕西',
        car:'陕'
    },
    {
        value:'620000',
        city:'甘肃',
        car:'甘'
    },
    {
        value:'630000',
        city:'青海',
        car:'青'
    },
    {
        value:'640000',
        city:'宁夏',
        car:'川'
    },
    {
        value:'650000',
        city:'新疆',
        car:'新'
    },

];

var React =require('react');
var {Router,Link,browserHistory} = require('react-router');


var url = require('../item/item.js');
var reqwest = require('reqwest');
var GoBack = require('./back');
var allWay = require('../item/publicFun.js');

var Load = require('../lib/Nextpage.js');

var Tbpro = React.createClass({
    getInitialState:function(){
        return {
            isCity:false,
            citys:null,
            icon:0,
            cityName:null
        }
    },
    componentDidMount:function(){
        var $ = new allWay();
        var tTop = $.id('tTop'),
            proWrap = $.id('proWrap'),
            h = -proWrap.offsetHeight+'px',
            sure = $.id('sure'),
            nextPage = $.id('nextPage');

        proWrap.style.bottom = h;

        tTop.onclick = function(){
            close()
        }
        sure.onclick = function(){
            var cityval = $.id('cityval');
            var cityClass,cName,comcode;
            cityClass = $.id('checked');
            if(cityClass!=null){
                cName=cityClass.parentNode.childNodes[0].innerHTML;
                comcode = cityClass.parentNode.getAttribute('data');
            }else{
                alert('请选择城市')
            }

            if(cName != undefined){
                cityval.innerHTML = cName;
                cityval.setAttribute('data',comcode)
                close()
            }

        }

        function close(){
            tTop.style.position='relative';
            proWrap.style.bottom = h;
            sure.style.display = 'none'
            nextPage.style.display='block'
        }

    },
    proClick:function(event){
        var $ = new allWay();
        var pro = event.currentTarget,
            ph = pro.parentNode.style.height,
            city = pro.parentNode.getAttribute('value'),
            _this = this,
            allpro = $.id('allpro').children;

        var opid = $.getCookie('opid'),
            token = $.getCookie('token'),
            base=btoa( opid+':'+token);


        for(var i=0,len=allpro.length;i<len;i++){
            allpro[i].style.height = 2.2+'rem';
            allpro[i].childNodes[1].innerHTML = '<pre class="iconfont">&#xe603;</pre>'
        }

        if(ph == 'auto'){
            pro.parentNode.style.height = 2.2+'rem';

            pro.parentNode.childNodes[1].innerHTML = '<pre class="iconfont">&#xe603;</pre>';
        }else {
            $.id('load').style.display='block';
            pro.parentNode.childNodes[1].innerHTML = '<pre class="iconfont">&#xe604;</pre>';

            reqwest({
                url:url+'V1/city',
                method:'get',
                data:{
                    city_name:city
                },
                headers:{
                    'Authorization':'Basic '+base,
                    'Accept':'application/json, text/plain, */*'
                },
                success:function(xrh){
                    $.id('load').style.display='none';
                    if(_this.isMounted()){
                        _this.setState({
                            isCity:true,
                            citys:xrh.list.menu
                        })
                    }
                }
            })
            pro.parentNode.style.height ='auto';
        }
    },
    checkCity:function(event){
        var ch = event.currentTarget;
        var sure = React.findDOMNode(this.refs.sure);
        var gou = document.getElementsByClassName('gou');

        for(var i=0,len = gou.length;i<len;i++){
            gou[i].innerHTML = '';
            gou[i].id = ''
        }

        var val = ch.parentNode.parentNode.getAttribute('data');
        var carId = document.getElementById('carId');

        carId.value = val;

        ch.childNodes[1].innerHTML = '<pre class="iconfont check">&#xe600;</pre>';
        ch.childNodes[1].id = 'checked';

    },
    moveColor:function(event){
        var tar = event.currentTarget;
        console.log(tar)
        tar.style.backgroundColor='#5576d4';

    },
    leaveColor:function(event){
        var tar = event.currentTarget;
        tar.style.backgroundColor='#5A7CDD';
    },
    render:function(){
        var _this = this;
        if(this.state.isCity){
           var allcity =  _this.state.citys.map(function(item){
                    return (
                        <dd onClick={_this.checkCity} data={item.comcode}>
                            {item.comname}
                            <i className="pull-right gou">

                            </i>
                        </dd>
                    )
            },_this)
        }
        return (
            <div className="proWrap" id="proWrap">
                <div className="tb-carlist" id="prolist" ref='prolist'>
                    <GoBack tit="投保城市" id='tTop'/>

                    <h4 className="se-tit" style={{paddingTop:'2rem'}}>
                        现已开通投保城市及地区如下：
                    </h4>

                    <ul className="tb-allpro" id="allpro">
                        {
                            data.map(function(item){
                                return (
                                    <li className="clearfix tb-pro" id="pro" ref="pro" data={item.car} value={item.city} >
                                        <h4 onClick={this.proClick}>{item.city}</h4>
                                        <i className="pull-right" ref="more" id="more">
                                            <pre className="iconfont">&#xe603;</pre>
                                        </i>
                                        <dl>
                                            {allcity}
                                        </dl>
                                    </li>
                                )
                            },this)
                        }
                    </ul>

                </div>
                <Link className="abtn" ref="sure" id="sure" onTouchStart={this.moveColor}
                onTouchEnd={this.leaveColor}
                >
                     确定
                </Link>
                <Load/>
            </div>

        )
   }
})
module.exports = Tbpro;