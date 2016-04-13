var amqp = require('amqplib/callback_api.js');

// Example to build multiple Queues and stuff them with data
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


// Setting up exchanges to different queues
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        // Die queues benennen:
        var topicQueue_news = 'topicQueue_news';
        var topicQueue_boullevard = 'topicQueue_boullevard';
        var subTopic_regional = 'subTopic_regional';
        var subTopic_urban = 'subTopic_urban';

        // Die Queues bauen:
        ch.assertQueue(topicQueue_news, {durable: false});
        ch.assertQueue(topicQueue_boullevard, {durable: false});
        ch.assertQueue(subTopic_regional, {durable: false});
        ch.assertQueue(subTopic_urban, {durable: false});
        ch.assertQueue('all_news', {durable: false});
        /*
        * Es soll später folgenden Exchanges geben:
        *   importantNews: Gibt alles an news regional und urban
        *   regionalBoullevard: Gibt alles an boullevard und regional
        *   urbanNews: Gibt alles an urban und news
        * */
        // Den Topic Exchange bauen:
        var importantNews = 'important_news';
        var importantInfoKey = 'important.info';
        ch.assertExchange(importantNews, 'topic' ,{durable: false, autoDelete: false});

        // Queues an Topic Exchange binden
        ch.bindQueue(subTopic_regional, importantNews, importantInfoKey);
        ch.bindQueue(subTopic_urban, importantNews, importantInfoKey);
        ch.bindQueue(topicQueue_news, importantNews, importantInfoKey);
        // An alle gebindeten Topics etwas versenden:
        /*
        * Der Timeout ist notwendig, da sonst node noch nicht fertig ist mit dem Exchange bauen
        * bevor er published
        * */
        setTimeout(function() {
            ch.publish(importantNews, importantInfoKey, new Buffer("Bundesnews"));
            ch.publish(importantNews, importantInfoKey, new Buffer("Ländernews"));
            ch.publish(importantNews, importantInfoKey, new Buffer("Städtenews"));
        }, 1000);

        var boullevardNews = 'boulevard_news';
        var boullevardNewsKey = 'boulevard.news';
        ch.assertExchange(boullevardNews, 'topic', {durable: true, autoDelete: true});

        ch.bindQueue(topicQueue_news, boullevardNews, boullevardNewsKey);
        ch.bindQueue(topicQueue_boullevard, boullevardNews, boullevardNewsKey);

        setTimeout(function() {
            ch.publish(boullevardNews, boullevardNewsKey, new Buffer('Michael Jackson wieder auferstanden!'));
            ch.publish(boullevardNews, boullevardNewsKey, new Buffer('3 Weltkrieg ausgebrochen'));
        }, 2000);

        setTimeout(function() {
            conn.close();
        }, 2200);
    });
});
require('getAllNews.js');
