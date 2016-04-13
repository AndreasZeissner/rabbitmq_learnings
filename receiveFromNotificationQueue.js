/**
 * Created by WangoeWoe on 08.04.16.
 */
var amqp = require('amqplib/callback_api.js');

//var secAMQP = require('amqplib/callback_api.js').connect('amqp://localhost', function() {
//
//});
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var notificationQueue = 'Machine Warnings';
        ch.assertQueue(notificationQueue, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", notificationQueue);
        ch.consume(notificationQueue, function(msg) {
            var msg = JSON.parse(msg.content.toString());
            console.log(msg);
        }, {noAck: true});
    });
});

