import Vue from 'vue';
import App from './App.vue';
import router from './router';
import echarts from 'echarts';
import './plugins';
import './directives';
import './static/css/index.less';
import moment from 'moment';
// import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
