// vim: ts=4:sw=4:expandtab

'use strict';

const BotAtlasClient = require('./atlas_client');
const cache = require('./cache');
const relay = require('librelay');
const cleverbot = require("cleverbot.io");
const bot = new cleverbot(process.env.CBOT_API_USER,process.env.CBOT_API_KEY);

class ForstaBot {

    async start() {
        const ourId = await relay.storage.getState('addr');
        if (!ourId) {
            console.warn("bot is not yet registered");
            return;
        }
        console.info("Starting message receiver for:", ourId);
        this.atlas = await BotAtlasClient.factory();
        this.getUsers = cache.ttl(60, this.atlas.getUsers.bind(this.atlas));
        this.resolveTags = cache.ttl(60, this.atlas.resolveTags.bind(this.atlas));
        this.msgReceiver = await relay.MessageReceiver.factory();
        this.msgReceiver.addEventListener('keychange', this.onKeyChange.bind(this));
        this.msgReceiver.addEventListener('message', ev => this.onMessage(ev), null);
        this.msgReceiver.addEventListener('error', this.onError.bind(this));

        this.msgSender = await relay.MessageSender.factory();

        this.bot = await bot.create(function (err, session){
          err ? console.log("cleverbot error:", err) : console.info("bot session:", session);
          return bot;
        });

        await this.msgReceiver.connect();

    }




    stop() {
        if (this.msgReceiver) {
            console.warn("Stopping message receiver");
            this.msgReceiver.close();
            this.msgReceiver = null;
        }
    }

    async restart() {
        this.stop();
        await this.start();
    }

    async onKeyChange(ev) {
        console.warn("Auto-accepting new identity key for:", ev.addr);
        await ev.accept();
    }

    onError(e) {
        console.error('Message Error', e, e.stack);
    }

    async onMessage(ev) {
        const message = ev.data.message;
        const msgEnvelope = JSON.parse(message.body);
        let msg;
        for (const x of msgEnvelope) {
            if (x.version === 1) {
                msg = x;
                break;
            }
        }
        if (!msg) {
            console.error("Received unsupported message:", msgEnvelope);
            return;
        }
        const dist = await this.resolveTags(msg.distribution.expression);

        const query = msg.data.body[0].value;
        bot.ask(query, (err, response) => {
            if (!err) {
                ;
                console.info("you:", query);
                console.info("cleverbot:", response);
                this.msgSender.send({
                    distribution: dist,
                    threadId: msg.threadId,
                    html: `${ response }`,
                    text: response
                });
            } else {
            console.info("error:", err);
          }
        });

    }
}
module.exports = ForstaBot;
