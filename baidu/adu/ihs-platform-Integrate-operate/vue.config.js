const path = require('path');
// const Mock = require('./mock/mock.js');
const CompressionPlugin = require('compression-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootPath = path.resolve(__dirname);

module.exports = {
    publicPath: './',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        // overlay: {
        //     warnings: false,
        //     errors: true
        // },
        // before(app, s) {
        //     Mock(app)
        // },
        proxy: {
            '/': {
                target: 'http://180.76.60.136:9003/',
                changeOrigin: true,
                pathRewrite: {'': ''},
            },
        },
    },
    pluginOptions: {
        'resolve-alias': {
            alias: {
                '@': path.resolve(rootPath, 'src'),
                src: path.resolve(rootPath, 'src'),
                components: path.resolve(rootPath, 'src/components'),
                utils: path.resolve(rootPath, 'src/utils'),
            },
        },
    },
    configureWebpack: {
        plugins: [
            new StyleLintPlugin({
                files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
            }),
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件名
                threshold: 10240, // 对超过10K的数据进行压缩
                deleteOriginalAssets: false,
            }),
            // new CopyWebpackPlugin([
            //     { from: path.join('', 'assets'), to: 'assets' },
            //     { from: path.join('', 'workers'), to: 'workers' }
            // ]),
        ],
    },
    css: {
        extract: false,
    },
    chainWebpack: config => {
        // // 自动导入样式文件
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
        config.module.rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader');
        config.resolve.symlinks(true); // 修复热更新失效
        // 删除预加载
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    },
};
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/static/css/mixins/element.less'),
                path.resolve(__dirname, './src/static/css/mixins/info-mixins.less'),
                path.resolve(__dirname, './src/static/css/mixins/common-mixins.less'),
                path.resolve(__dirname, './src/static/css/mixins/custom-mixins.less'),
            ],
        });
}
