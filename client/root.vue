<style>
</style>

<template>
    <div>
        <top-menu v-if="global.apiToken && global.onboardStatus == 'complete'"/>
        <router-view />
    </div>
</template>

<script>
shared = require('./globalState');
util = require('./util');
topMenu = require('./components/topMenu.vue');

module.exports = {
    data: () => ({ 
        global: shared.state
    }),
    components: {
        'top-menu': topMenu
    },
    computed: {
        globalApiToken () { return this.global.apiToken; },
    },
    watch: {
        globalApiToken: function (next, prev) {
            if (!next && prev) {
                console.log('reauthenticating for', this.$route.path)
                this.$router.push({ name: 'loginTag', query: { forwardTo: this.$route.path }});
            }
        }
    },
    mounted: function() {
        util.fetch.call(this, '/api/auth/status/v1')
        .then(result => { this.global.passwordSet = result.ok; });
    },
}
</script>