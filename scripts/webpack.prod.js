/* eslint-disable */
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清空build目录文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度条美化
const chalk = require('chalk');
const commonConfig = require('./webpack.common.js');
const paths = require('./paths');
// 设置 常量
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
module.exports = (env = {}) => {
    return merge(commonConfig(env), {
        mode: 'production',
        devtool: 'source-map',
        // devtool: 'inline-source-map',
        output: {
            publicPath: '/',
            path: paths.appBuild,
            filename: `${paths.appStaticPath}/[name].[contenthash:8].js`,
            chunkFilename: `${paths.appStaticPath}/[name].[contenthash:8].chunk.js`,
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                                    },
                                },
                                'postcss-loader',
                            ],
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ProgressBarPlugin({
                format: `${chalk.green.bold('build[:bar]')} ` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                clear: false,
                width: 60,
            }),
            new MiniCssExtractPlugin({
                filename: `${paths.appStaticPath}/[name].[contenthash:8].css`,
                chunkFilename: `${paths.appStaticPath}/[name].[contenthash:8].chunk.css`,
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimizer: [
                new TerserPlugin({
                    // do not extract comment to another file
                    extractComments: false,
                    // use multi-process parallel running to improve the build speed
                    parallel: true,
                    // reference: https://github.com/terser-js/terser#minify-options
                    terserOptions: {
                        output: {
                            // emoji and regex is not minified properly when false
                            // https://github.com/facebook/create-react-app/issues/2488
                            // eslint-disable-next-line fecs-camelcase
                            ascii_only: true,
                            // remove copyright comments, just to hide modules we use
                            comments: false,
                        },
                    },
                }),
                // 用于优化css文件
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessorOptions: {
                        safe: true,
                        autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
                        mergeLonghand: false,
                        discardComments: {
                            removeAll: true, // 移除注释
                        },
                    },
                    canPrint: true,
                }),
            ],
        },
        stats: 'normal', // 标准输出
    });
};
