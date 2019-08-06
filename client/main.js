addEventListener('load', main);
function main() {
    const Vue = require('vue');
    const VueRouter = require('vue-router');
    const SuiVue = require('semantic-ui-vue');
    Vue.use(VueRouter);
    Vue.use(SuiVue.default);

    const Root = require('./root.vue');
    const routes = [
        { path: '/welcome', name: 'welcome', component: require('./views/welcome.vue') },
        { path: '/auth/tag', name: 'loginTag', component: require('./views/loginTag.vue') },
        { path: '/auth/auth/:type/:tag', name: 'loginAuth', component: require('./views/loginAuth.vue') },
        { path: '/onboard/tag', name: 'onboardTag', component: require('./views/onboardTag.vue') },
        { path: '/onboard/auth/:type/:tag', name: 'onboardAuth', component: require('./views/onboardAuth.vue') },
        { path: '/onboard/complete/', name: 'onboardComplete', component: require('./views/onboardComplete.vue')},
        { path: '/settings', name: 'settings', component: require('./views/settings.vue') },
        { path: '/dashboard', name: 'dashboard', component: require('./views/dashboard.vue') },
        { path: '*', redirect: '/welcome' },
    ];

    const router = new VueRouter({
        mode: 'history',
        routes
    });

    new Vue({
        el: '#app',
        router,
        render: function (createElement) {
            return createElement(Root);
        }
    });
}