# xCloud Turbo React前端脚手架
## 设计原则
- #### JS组件化原则
  - 多抽象可单元测试的纯组件和纯函数，以达到可测试、可复用目标
  - 页面按照组件化配置，路由按照组件化层级管理
- #### CSS模块化原则
  - 让CSS开发对象化，增强CSS可用性验证，提高CSS的后期维护效率
## 设计要素
- 优雅的SPA设计
- 全局Style
- 多种Layout布局
- 统一UI组件库
- 授权的AuthRoute
- 分层的全局Store
- 结合业务封装的工具库
- 多环境配置
- Mock机制
- 高效的打包构建和CDN部署
- 稳定的单元测试
- 晰的文档说明
## 前端技术选型

- React Hooks

- React-Router-Dom

- Redux

- Ant-Design

- Webpack5

- Webpack-dev-server-proxy

- Less

- Postcss

- classnames

- Axios

- Lodash

## 搭建过程

- 初始化工程

```shell
npm init -y
```

- 引入React框架

```
npm i -S react react-dom prop-types react-redux react-router-dom redux redux-thunk
```

- 创建目录和文件
  
  - src目录，用于项目开发的源码主目录
  
  - public目录，用于放置页面模板的目录
  
  - scripts目录，用于放置webpack脚本的目录
  
  - build目录，用于放置agile打包的shell脚本目录
  
  - debug目录，用于放置mock数据的目录
  
  - .gitignore文件，用于存储忽略文件
  
  - .npmrc文件，用于存储npm远程库
  
  - ci.yml文件，用于agile构建的入口文件
  
  - postcss.config.js文件，用于处理浏览器场景标识头

- Webpack实现构建

```
npm i -D webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin babel-loader path mini-css-extract-plugin @babel/core @babel/preset-env @babel/preset-react clean-webpack-plugin progress-bar-webpack-plugin chalk
```

- Webpack-dev-server-proxy实现mock

- 基础loader配置

```shell
npm i -D style-loader file-loader css-loader less less-loader postcss postcss-loader postcss-preset-env


// postcss.config.js
module.exports = {
    plugins: {
        "postcss-preset-env": {},
    },
};
```

- 增加react hooks热更新调试

```
npm i -D react-hot-loader
npm i -D @hot-loader/react-dom
```

```jsx
import { hot } from 'react-hot-loader/root'

function App() {
  return (
    <>
        {/* ... */}
    </>
  );
}

export default hot(App);
```

```
// webpack.dev.js
resolve: {
    alias: {
        'react-dom': '@hot-loader/react-dom'
    }
}

// webpack.common.js
rules: [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
            paths.appSrc,
            // using babel to replace `import 'core-js/stable'` in react-app-polyfill
            /react-app-polyfill/
        ],
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        isDev && 'react-hot-loader/babel'
                    ]
                },
            },
        ]
    }
]
```

- 引入UI组件库

- 工程调试运行

- 工程打包

- issue问题
  
  - history版本太高，会引起warning：“# 'createLocation' is not exported from 'history'.”，建议使用 ^4.10.1版本
  
  -  js使用async报错：Uncaught ReferenceError: regeneratorRuntime is not defined。   原因：这个regeneratorRuntime在浏览器上是不认识的，安装一个@babel/polyfill
    
    然后在babel-loader文件中配置preset-env中的参数"useBuiltIns":"usage"，让babel按需引入需要的补充模块：
    
    ```json
    {
        "presets":[
            ["@babel/preset-env",{
                "useBuiltIns":"usage"
            }],
            "@babel/preset-react"
        ]
    }
    ```
    
    






## 版本迭代

- 1.2.10 fix: bug （线上集成测试）
- 1.2.11 兼容大屏样式、系统title
- 1.2.12 fix: bug （线上集成测试_路网专题_排名联动查询）
- 1.2.13 feat: 样式优化
- 1.2.14 fix: bug (2530)
- 1.2.16 fix: bug IDG-IHS-BUG-2575
- 1.2.17 fix: 导出
- 1.2.18 fix: 导出数据
- 1.2.19 fix: 导出数据(参数日期变更)
- 1.2.20 feat: 删除生产环境的source-map
- 1.2.21 fix: 智能报表导出样式、标题层级、隐藏卡片数据源
- 1.2.22 feat: 鉴权、用户名、退出登录、返回门户
- V1.2.23 feat: 卡片名称校验
