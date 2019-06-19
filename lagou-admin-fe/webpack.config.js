const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode : 'development',
    entry:'./src/app.js',
    output :{
        filename : 'app.js',
        path:path.resolve(__dirname,'./dev')
    },
    devServer:{
        contentBase:path.join(__dirname,'./dev'),
        compress:true,
        proxy: {
            '/api': 'http://localhost:3000',
            changeOrigin: true
          }
    },
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                        }
                    },
                ],
            },
            {
                test: /\.(scss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/i,
                use: {
                    loader: 'string-loader'
                }
            },
            {
                test: /\.hbs$/i,
                use: {
                  loader: 'handlebars-loader'
                }
            }
        ]
    },
     // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
        filename: 'index.html', // 目标文件名
        template: './index.html' // 源文件路径
        }),
        new CopyPlugin([
        { from: './src/public', to: './public' }
        ])
    ]
}