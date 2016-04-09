/**
 * Created by WangoeWoe on 09.04.16.
 */
var amqp = require('amqplib/callback_api.js');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var topicQueue_news = 'topicQueue_news';

        ch.assertQueue(topicQueue_news, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", topicQueue_news);
        ch.consume(topicQueue_news, function(msg) {
            console.log(" [x] Main News: %s", msg.content.toString());
        }, {noAck: true});
    });
});