const log = require('gutil-color-log')
const NODE_ENV = require('./build_helpers/nodeEnv')
log('blue', NODE_ENV);

const config = require('./build_helpers/config');

const buildFolder = config.paths.dist;

const version = require('./build_helpers/version.js')();

const HTMLCompressionPlugin = require("html-compression-webpack-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const writeFileWebpackPlugin = require('write-file-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

const path = require('path');
// const srcPath = path.join(__dirname, '/src');

const isDevMode = NODE_ENV === 'development';
const isProdMode = NODE_ENV === 'production';

const extractCSS = new ExtractTextPlugin({
	filename: 'css/[name].min.css',
	allChunks: true
});

const setLocalhost = require('./build_helpers/setLocalhost');
setLocalhost();

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		'script': './js/script.js',
		'index': './pages/index.js',
		'item': './pages/item.js',
		'catalog': './pages/catalog.js',
		'basket': './pages/basket.js',
		'store': './pages/store.js',
	},
	output: {
		path: path.resolve(__dirname, buildFolder),
		filename: 'js/[name].min.js'
	},
	resolve: {

	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "node_modules/contain-cover")
				],
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'string-replace-loader',
						query: {
							search: 'mosRuVersionControlFlag',
							replace: `${version}`,
							flags: 'g'
						}
					}
				]
			},
			{
				test: /\.(pug|jade)$/,
				use: [
					{
						loader: 'pug-loader'
					},
					{
						loader: 'string-replace-loader',
						query: {
							search: 'mosRuVersionControlFlag',
							replace: `${version}`,
							flags: 'g'
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				loader: extractCSS.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: isProdMode,
							}
						},
						{
							loader: 'autoprefixer-loader'
						},
						{
							loader: 'postcss-loader',
							options: {}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						},
					],
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico|svg|ttf|woff|eot|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					publicPath: '/front/markup/maps/'
				}
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(['dist']),
		extractCSS,
		new webpack.BannerPlugin(`${version}`),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2,
			async: true
		}),
		new HtmlWebpackPlugin({
			template: 'pages/index.pug',
			filename: '../dist/index.html',
			inject: false,
			NODE_ENV: NODE_ENV
		}),
		new HtmlWebpackPlugin({
			template: 'pages/item.pug',
			filename: '../dist/item.html',
			inject: false,
			NODE_ENV: NODE_ENV
		}),
		new HtmlWebpackPlugin({
			template: 'pages/catalog.pug',
			filename: '../dist/catalog.html',
			inject: false,
			NODE_ENV: NODE_ENV
		}),
		new HtmlWebpackPlugin({
			template: 'pages/basket.pug',
			filename: '../dist/basket.html',
			inject: false,
			NODE_ENV: NODE_ENV
		}),
		new HtmlWebpackPlugin({
			template: 'pages/store.pug',
			filename: '../dist/store.html',
			inject: false,
			NODE_ENV: NODE_ENV
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/assets'),
				to: path.resolve(__dirname, buildFolder + '/assets')
			},
			{
				from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/jquery')
			},
			{
				from: path.resolve(__dirname, 'node_modules/svg4everybody/dist/svg4everybody.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/svg4everybody')
			},
			{
				from: path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/slick')
			},
			{
				from: path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.css'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/slick')
			},
			{
				from: path.resolve(__dirname, 'node_modules/swiper-thumbnails/js/swiper.thumbnails.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/swiper-thumbnails')
			},
			{
				from: path.resolve(__dirname, 'node_modules/masonry-layout/dist/masonry.pkgd.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/masonry')
			},
			{
				from: path.resolve(__dirname, 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/mCustomScrollbar')
			},
			{
				from: path.resolve(__dirname, 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/mCustomScrollbar')
			},
			{
				from: path.resolve(__dirname, 'src/js/jquery.maskedinput.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/jquery-maskedinput')
			},
			{
				from: path.resolve(__dirname, 'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/scrollmagic')
			},
			{
				from: path.resolve(__dirname, 'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/scrollmagic')
			},
			{
				from: path.resolve(__dirname, 'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/scrollmagic')
			},
			{
				from: path.resolve(__dirname, 'node_modules/scrollreveal/dist/scrollreveal.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/scrollreveal')
			},
			{
				from: path.resolve(__dirname, 'node_modules/current-device/umd/current-device.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/current-device')
			},
			{
				from: path.resolve(__dirname, 'node_modules/swiper/dist/js/swiper.min.js'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/swiper')
			},
			{
				from: path.resolve(__dirname, 'node_modules/swiper/dist/css/swiper.min.css'),
				to: path.resolve(__dirname, buildFolder + '/assets/js/swiper')
			}
		]),
		new webpack.NoEmitOnErrorsPlugin(),
		new writeFileWebpackPlugin(),
		new UnminifiedWebpackPlugin(),
		// new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', "window.jQuery": "jquery" }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
	],

	// webpack dev server configuration
	devServer: {
		host: '0.0.0.0',
		public: config.server.localhost + ':8000',
		contentBase: path.join(__dirname, buildFolder),
		port: config.server.port,
		historyApiFallback: {
			index: '/'
		},
		// hot: true,
		noInfo: false,
		stats: {
			color: true
		},
		disableHostCheck: true
	},

	// support source maps
	devtool: isDevMode ? "source-map" : 'false',
	watch: isDevMode,
	watchOptions: {
		aggregateTimeout: 100
	}
}

if (isProdMode) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			compress: {
				drop_console: true,
				drop_debugger: true,
				unsafe: true
			},
			sourceMap: isDevMode
		})
	);
	module.exports.plugins.push(
		new HTMLCompressionPlugin()
	);
}
