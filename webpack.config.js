const path = require("path");
const htmlwp = require("html-webpack-plugin");
var webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "/dist"),
        filename: 'build.js'
    },
    resolve: {
        alias: {
            // webpack 使用 jQuery，如果是自行下载的
            // 'jquery': path.join(__dirname, 'jquery所在的目录/jquery.min'),
            // 如果使用NPM安装的jQuery
            'jquery': 'jquery'
        }
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: ['url-loader?limit=10240']
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index.html'
        }),
        // 配置$指向 jquery对象的,在任何组件中均可以使用 $()和jQuery()两种写法
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}