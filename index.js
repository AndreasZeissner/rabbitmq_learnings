var amqp = require('amqplib/callback_api.js');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var alertQueue = 'alertQueue';
        var notificationQueue = 'notificationQueue';

        ch.assertQueue(alertQueue, {durable: false});
        ch.sendToQueue(alertQueue, new Buffer('Halle A Stromausfall'));
        ch.sendToQueue(alertQueue, new Buffer('Alle Stapler belegt'));
        ch.sendToQueue(alertQueue, new Buffer('Maschine XYZ brennt'));
        ch.sendToQueue(alertQueue, new Buffer('Bier ist aus'));

        ch.assertQueue(notificationQueue, {durable: false});
        ch.sendToQueue(notificationQueue, new Buffer('Wareneingang xyz'));
        ch.sendToQueue(notificationQueue, new Buffer('Lieferung xyz ausgeliefert'));
        ch.sendToQueue(notificationQueue, new Buffer('Lieferung A zeitlich rechtzeitig eingetroffen'));
        ch.sendToQueue(notificationQueue, new Buffer('Wareneingang hat verspätung'));

        setTimeout(function() {
            conn.close();
        }, 500);
    });
});
