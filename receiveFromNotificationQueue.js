/**
 * Created by WangoeWoe on 08.04.16.
 */
var amqp = require('amqplib/callback_api.js');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var notificationQueue = 'notificationQueue';

        ch.assertQueue(notificationQueue, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", notificationQueue);
        ch.consume(notificationQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });
});

