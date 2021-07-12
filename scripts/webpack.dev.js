/* eslint-disable */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const paths = require('./paths.js');
const PORT = 3002;
const rdProxy = {
    '/api': {
        target: 'https://offlinetest.xcloud.baidu-int.com/api',
        secure: false, // 跳过https安全证书校验
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
        onProxyReq(proxyReq, req, res) {
            proxyReq.setHeader('Connection', 'keep-alive');
            proxyReq.setHeader('host', 'offlinetest.xcloud.baidu-int.com');
        },
    },
};
module.exports = (env = {}) => {
    return merge(commonConfig(env), {
        mode: 'development',
        devtool: 'inline-source-map',
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
        },
        output: {
            // include comments in bundles with information about the contained modules
            pathinfo: true,
            filename: `${paths.appStaticPath}/[name].js`,
            chunkFilename: `${paths.appStaticPath}/[name].chunk.js`,
        },
        plugins: [
            // add in plugins manually instead of using webpack-dev-server CLI --hot
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            // 因 @baidu/webpack-dev-server-proxy 不支持 proxy online/offline server 时的 content-type 与 method 自定义
            // 仅用在 本地 mock
            // ...webpackDevServerProxy(proxyConfig),
            // open: false,
            contentBase: paths.appBuild,
            // disable gzip
            compress: false,
            port: PORT,
            host: '0.0.0.0',
            // local dev may use specific domain with hosts config
            disableHostCheck: true,
            // support browserhistory
            historyApiFallback: {
                index: paths.appStaticFileUrlPrefix,
            },
            inline: true,
            hot: true,
            proxy: {
                // ...rdProxy
                ...(!process.env.MOCK ? rdProxy : {}),
            },
        },
        stats: 'errors-only', // 只在发生错误或有新的编译时输出
    });
};