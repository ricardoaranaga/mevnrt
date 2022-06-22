const Redis = require("ioredis");
const redis = new Redis({ host: 'redis' });
const Websocket = require('ws')

const WS_PORT = 7001
const server = new Websocket.Server({ port: WS_PORT })


redis.subscribe("app:notifications", "my-channel-1", (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
            );
        }
    });
    
    server.on('connection', function(ws){
        redis.on("message", (channel, message) => {
            console.log(`${channel} ${message}`);
            ws.send(`${channel} ${message}`)
        });
    })
    
    
    // There's also an event called 'messageBuffer', which is the same as 'message' except
    // it returns buffers instead of strings.
    // It's useful when the messages are binary data.
    // redis.on("messageBuffer", (channel, message) => {
        //   // Both `channel` and `message` are buffers.
        //   console.log(channel, message);
        // });