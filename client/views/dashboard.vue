<style>
</style>

<template>
<div>
    <div class="ui container center aligned">
        <div class="ui basic segment huge">
            <h1 class="ui header">
                <i class="large circular asterisk loading icon"></i>
                Messaging Bot Running
            </h1>
        </div>
        
        <sui-list>
            <sui-list-item v-for="(command, index) in commands" :key="index">
                {{ `${command.name} - ${command.response}` }}
            </sui-list-item>
        </sui-list>
        <sui-input v-model="newCommandName" />
        <sui-input v-model="newCommandResponse" />
        <sui-button @click="submitNewCommand()">Submit Command</sui-button>
    </div>
</div>
</template>

<script>
const util = require('../util');

module.exports = {
    data: () => ({
        global: shared.state,
        newCommandName: '',
        newCommandResponse: '',
        commands: []
    }),
    methods: {
        loadCommands () {
            //retrieve all commands from the server
            util.fetch('/api/admins/commands/')
            .then(res => this.commands = res.theJson.commands)
        },
        submitNewCommand () {
            //send the set of commands to the server
            this.commands.push({ name: this.newCommandName, response: this.newCommandResponse });
            this.newCommandName = '';
            this.newCommandResponse = '';
            const options = { method: 'POST', body: { commands: this.commands }};
            util.fetch('/api/admins/commands/', options)
            .then(res => this.commands = res.theJson.commands)
        }
    },
    mounted () {
        this.loadCommands();
        if (this.global.onboardStatus !== 'complete') {
            this.$router.push({ name: 'welcome' });
            return;
        }
        util.fetch.call(this, '/api/auth/status/v1')
        .then(result => { 
            this.global.onboardStatus = result.theJson.status;
            if (this.global.onboardStatus !== 'complete') {
                this.$router.push({ name: 'welcome' });
            }
        });
        if (!this.global.apiToken) {
            this.$router.push({ name: 'loginTag', query: { forwardTo: this.$router.path }});
            return;
        }
    }
}
</script>