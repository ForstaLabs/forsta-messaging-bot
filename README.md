Forsta Messaging Bot
========
Secure autonomous message receipt, processing, storage, and/or transmission on the Forsta messaging platform.

[License](https://github.com/ForstaLabs/forsta-messaging-bot/blob/master/LICENSE)


About
-------
This repository is a (skeleton) Node.js-based Forsta end-to-end-encrypted messaging client.
It allows for autonomous receipt, processing, storage, and/or transmission of messaging 
data to perform some useful task. Please fork it or one of our several projects based 
off of it!

 * [Live Chat Bot](https://github.com/ForstaLabs/forsta-live-chat-bot)
 * [Translation Bot](https://github.com/ForstaLabs/forsta-translation-bot)
 * [Compliance Monitor](https://github.com/ForstaLabs/forsta-compliance-monitor)
 * [Message Vault](https://github.com/ForstaLabs/forsta-message-vault)

A Forsta messaging bot can be set up to receive messages sent to a particular user, 
**or** (if you are an organization administrator) it can be set up as a special 
organization "monitor" which will receive copies of *all* messaging traffic to, from, 
or among users in your organization.

The Why &mdash; Decentralized Data Security
--------

What is important to Forsta is that **your messaging data** is only accessible to messaging 
clients that **you are in control** of, whether the client is an app running on 
the phone in your pocket, or a bot that is running on a server in your
datacenter or the compute cloud of your choice. 

Some organizations need to be able perform forensic e-discovery on past 
messages. Others may need to be able to automatically monitor for 
transmission of sensitive information. Or maybe they want something to 
automatically deliver sensitive information, or answer 
help-desk questions and handle after-hours inquires. Or individual users 
might want to be able to securely access their own message histories after 
buying a new phone and reinstalling their messaging client.

There are countless needs like these, and typically they are satisfied using 
**centrally-managed** infrastructure that can receive, store, process, and respond 
to messages as needed. Even systems that have pluggable architectures 
to facilitate outside development of these sorts of capabilities usually rely on a 
centralized approach. Unfortunately, the centralized approach provides a 
tempting, centralized target for outside 
attackers -- and it also requires users to trust that *insiders* won't abuse 
their access to all messages. Forsta is different.

Forsta does not offer anything that depends on centralized receipt, storage, or 
processing of users’ messaging data.  Instead, Forsta makes it trivial for 
*others* to run messaging “bots” to perform these functions. These bots are just 
another kind of messaging client, like the messaging clients running in users’ 
browsers and on their phones. And just like the other messaging clients, Forsta 
bots send and receive end-to-end encrypted messages to do their work **while 
running in a context controlled by the user**.


Quick Start
--------
These deployment buttons can be used to validate that this messaging bot
will meet your organizations needs with as little setup pain as possible.  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ForstaLabs/forsta-messaging-bot)

Install Requirements
--------
 * Node.js 8 (or newer)
 * Ruby
   * sass (`gem install sass`)
   

Developer Install
--------
If you want to build upon the Forsta Messaging Bot
you can install and run directly from the source code.

    git clone https://github.com/ForstaLabs/forsta-messaging-bot.git
    cd messaging-bot
    make run


Usage
--------
Once running, the default port and listening address are `0.0.0.0:4096`.  If
you are running locally you can access the web interface by opening
*http://localhost:4096*.

You can change the listening address by setting `LISTEN_ADDR` to a valid host
address for your server, E.g. something like `localhost` or `127.0.0.1` to only
accept local connections.

The default listening port can be changed by setting `PORT` to any valid
numeric port, e.g. `8000`.

Storage is managed through Forsta
[librelay](https://github.com/ForstaLabs/librelay-node) which currently
supports local filesystem and Redis.  For more information about setting
up custom storage see: https://github.com/ForstaLabs/librelay-node#storage.


License
--------
Licensed under the GPLv3: http://www.gnu.org/licenses/gpl-3.0.html

* Copyright 2015-2016 Open Whisper Systems
* Copyright 2017-2018 Forsta Inc.
