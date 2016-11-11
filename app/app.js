var React = require('react');
var {Route,Router,browserHistory} = require('react-router');
require('./config/base');

var newFastClick = require('fastclick');
document.ready = function(){
        newFastClick(document.body);
}

//module
var Index = require('./module/index.js');
var Tbmsg = require('./module/tbmsg');
var Tbcar = require('./module/tbcar');
var Program = require('./module/program');
var Imme = require('./module/immediately');
var Order = require('./module/orde.js');
var CheckMsg = require('./module/CheckMsg.js');
var Suc = require('./module/suc.js');





var routes = (
        <Router history={browserHistory}>
            <Route name="index" path="/" component={Index} />
            <Route name="tbmsg" path="/msg" component={Tbmsg} />
            <Route name="car" path="/car/:userId" component={Tbcar} />
            <Route name="program" path="/program/:userId" component={Program} />
            <Route name="imme" path="/imme/:userId" component={Imme} />
            <Route name="chmsg" path="/chmsg/:userId" component={CheckMsg} />
            <Route name="order" path="/order/:userId" component={Order} />
            <Route name="suc" path="/suc" component={Suc} />
        </Router>
)
React.render((
    <Router routes={routes} history={browserHistory} />),
    document.body
)