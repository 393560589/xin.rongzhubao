/**
 * Created by Administrator on 2016/8/28.
 */
var webpack = require('webpack');

module.exports = {
    entry:[
        'webpack/hot/dev-server',
        './app/app.js'
    ],
    output:{
        path:'build',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,loaders:['react-hot','babel'],exclude:/node_modules/
            },
            {
                test:/\.js$/,exclude:/node_modules/,loader:'babel-loader'
            }
        ]
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}