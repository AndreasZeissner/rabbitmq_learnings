var amqp = require('amqplib/callback_api.js');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, new Buffer('Hallo Welt'));
        console.log(" [x] Sent 'Hello World!'");
        setTimeout(function() {
            conn.close();
        }, 500);
    });
});
