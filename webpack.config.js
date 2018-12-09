const path 				= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack 			= require('webpack');

//模块名
const moduleName = 'index' 

module.exports = {
	entry: `./src/${moduleName}/index.jsx`, //入口文件
	output: {//出口配置
		path: path.resolve(__dirname, `dist/${moduleName}`),
		filename: 'js/[name].js',
	},
	module: {
		rules: [	
			//React语法的处理 env:es6转es5
		  	{
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				use: {
						loader: 'babel-loader',
						options: {
							presets: [['env',{
								"targets": {
									"browsers": ["ie >= 8"]
									},
							}], 'react'],
							"plugins": [
								["import", { "libraryName": "antd", "style": "css" }],
								["transform-runtime", {"regenerator": true,"polyfill": true,"helpers": true}]
							]
						}
				}		
		  	},
		  	//CSS文件的处理 在js文件中引入css	
		  	{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader"
					})
			},
			//图片处理
			{
				test: /\.(png|jpg|gif)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'sources/[hash].[ext]'
					}	
				}
			}
		]
	},
	plugins: [
		//生成Html并自动引入js文件
		new HtmlWebpackPlugin({
			template: `./src/${moduleName}/index.html`
		}),
		//分离CSS文件
		new ExtractTextPlugin("css/index.css"),
		//提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename: 'js/base.js'
	})
	],
	devServer: {
		contentBase: './dist'
	}
};	