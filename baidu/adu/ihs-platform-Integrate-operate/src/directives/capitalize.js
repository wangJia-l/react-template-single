import Vue from 'vue';

Vue.filter('capitalize', value => {
    let num;
    if (value > 10000) {
        num = `${(value / 10000).toFixed(2) / 1}`;
    }
    else {
        num = value || 0;
    }
    return num;
});

Vue.filter('capunit', value => {
    if (value > 10000) {
        return '/万';
    }
    return '';
});
