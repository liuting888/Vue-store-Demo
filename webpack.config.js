const path = require("path");
const htmlwp = require("html-webpack-plugin");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        build: './src/main.js',
        vue: ['vue', 'vuex', 'axios', 'vue-router'],
        element: ['element-ui'],
        jquery: ['jquery', 'v-distpicker', 'vue-quill-editor']
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: '[name].js'
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
                // loader: ['style-loader', 'css-loader']
                // css分离打包
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }, {
                test: /\.less$/,
                // loader: ['style-loader', 'css-loader', 'less-loader']
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })

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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vue', 'element', 'jquery']
        }),
        new ExtractTextPlugin("[name].css"),
        // 将.vue组件中的css提取到公共style里
        new webpack.LoaderOptionsPlugin({
            test: /\.vue$/,
            options: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: 'css-loader',
                            publicPath: "../"
                        }),
                    }
                }
            }
        })
    ]
}