/**
 * Created by WangoeWoe on 09.04.16.
 */
var amqp = require('amqplib/callback_api.js');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var subTopic_urban = 'subTopic_urban';

        ch.assertQueue(subTopic_urban, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", subTopic_urban);
        ch.consume(subTopic_urban, function(msg) {
            console.log(" [x] Urban News: %s", msg.content.toString());
        }, {noAck: true});
    });
});