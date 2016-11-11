var React = require('react');
var {Router,Route,Link} = require('react-router');
var style = require('./../css/navbar.css')



var item = [
    {
        icon:<pre className="iconfont">&#xe603;</pre>,
        item:'游戏',
        Link:'/play'
    },
    {
        icon:<pre className="iconfont">&#xe604;</pre>,
        item:'兑换',
        Link:'/cash'
    },
    {
        icon:<pre className="iconfont">&#xe60e;</pre>,
        item:'资讯',
        Link:'/Advert'
    },
    {
        icon:<pre className="iconfont">&#xe605;</pre>,
        item:'账户',
        Link:'/'
    }
];

var Navbar = React.createClass({
    render:function(){
        var navs = item.map(function(item){
            return(
                    <li>
                        <Link to={item.Link}>
                            {item.icon}
                            {item.item}
                        </Link>
                    </li>
                )
        })
        return (
            <div className={style.fixednav}>
                <ul className="clearfix">
                    {navs}
                </ul>
            </div>
        )
    }
})
module.exports = Navbar;
