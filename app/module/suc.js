/**
 * Created by gongchuangshidai on 16/11/8.
 */
var React = require('react');
var Back = require('./lib/goback.js');
var allWay = require('./item/publicFun');
var $ = new allWay();

var Suc = React.createClass({
    render:function(){
        return (
            <div style={{height:'100%',overflow:'hidden'}}>
                <Back url={'/?opid='+$.getCookie('opid')+'&token='+$.getCookie('token')+'&channel='+$.getCookie('channel')} tit="返回首页"/>
                <div className="suc">
                    <h4>提交成功</h4>
                    <p>
                        恭喜您提交成功！待审核完成后，融助保会尽快安排客服人员与您取得联系～
                    </p>
                </div>
            </div>

        )
    }
})
module.exports = Suc;