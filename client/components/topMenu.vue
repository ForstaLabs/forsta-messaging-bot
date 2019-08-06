<style>
div [class*="pull left"] {
  float: left;
  margin-left: 0.25em;
}
div [class*="pull right"] {
  float: right;
  margin-right: 0.25em;
}
a{
    color:#ddd;
}
a:hover{
    color:#aaa;
}
.hover-gray:hover{
    cursor: pointer;
    color:#ddd;
}
.header{
    color:white;
    display:inline;
    vertical-align:middle;
    margin-left:12px;
    cursor:pointer;
}

</style>

<template>
    <div>
     <div class="ui inverted menu" style="z-index: 1;">
        <div class="ui container">
            <router-link :to="{name: 'questions'}" class="header item">
                <img class="logo" src="/static/images/forsta-logo-invert.svg"/>
                &nbsp;&nbsp;Forsta Live Chat
            </router-link>
            <div 
                class="header item float right" 
                style="padding:0px;"
                v-if="global.apiToken">
                <div class="ui simple dropdown item" style="margin-top:7px">
                    <i style="color:white" class="large user icon"></i>
                    <i class="dropdown icon"></i>
                    <div class="menu left">
                        <div class="item" @click="goto('dashboard')">
                            <i class="bars horizontal icon tiny"></i> Dashboard 
                        </div>
                        <div class="item" @click="goto('settings')">
                            <i class="cog icon tiny"></i> Settings 
                        </div>
                        <div class="item" @click="() => showingSignOutModal = true">
                            Sign Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div>
            <sui-modal v-model="showingSignOutModal">
                <sui-modal-header>Sign out?</sui-modal-header>
                <sui-modal-content>
                    <sui-modal-description>
                        <p>Any unsaved changes may be lost.</p>
                    </sui-modal-description>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button 
                        class="black" 
                        @click="() => showingSignOutModal = false"
                        content="Cancel" />
                    <sui-button 
                        class="blue" 
                        @click="logout"
                        content="Sign Out" />
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</template>

<script>
const shared = require('../globalState');

module.exports = {
    data: () => ({ 
        global: shared.state,
        showingSignOutModal: false
    }),
    methods: {
        logout () {
            this.global.apiToken = null;
        },
        goto (name) {
            this.$router.push({ name });
        },
    }
}
</script>