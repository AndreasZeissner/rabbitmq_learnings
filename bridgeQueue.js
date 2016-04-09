/**
 * Created by WangoeWoe on 09.04.16.
 */
/*
* it should get Messages from a System via post
* it should then put them to specific routes
* by exchanges
* to prioritize messages info log warn
* then it should built a rout specifc for a user
* and store its messages for the user
* 1. Build Producer
*   1.1. It should have a possibiliy to add messages to specific exchanges
*   1.2. exchanges are info log warn
*       // TODO: IT MUST BUILD THE EXCHANGES DYNAMICALLY
*       //  -> MODULE FOR BUILDING THE MODULES
*       //  -> WRAPS THEM BUILDS THEM AND GIVES THEM BACK TO THE PRODUCER
 *  1.3. they give an object to the exchange
 *  1.4. the exchange binds the queues to dynamic routes
* */

/*
* 1. Building the producer
* */

var amqp = require('amqplib/callback_api.js');
// 1.1 Setting up the producer
amqp.connect('amqp://localhost', function(err, conn) {
    // creating a channel
    conn.createChannel(function(err, ch) {
        // 1.2 It should have log info warn exchanges
            // important
        var priortiyInfo = 'collects-all-info-messages';
            // giving the key for the queues
        var priorityInfoKey = 'priority.info';
            // assert a Topic exchange
        ch.assertExchange(
            priortiyInfo,
            'topic',
            {
                durable: false,
                autoDelete: false
            });

            // log
        var priorityLog = 'collects-all-log-messages';
        var priorityLogKey = 'priority.log';
        ch.assertExchange(
            priorityLog,
            'topic',
            {
                durable: false,
                autoDelete: false
            });

            // warn
        var priorityWarn = 'collect-all-warn-messages';
        var priorityWarnKey = 'priortiy.warn';
        ch.assertExchange(
            priorityWarn,
            'topic',
            {
                durable: false,
                autoDelete: false,
            });

        // closing the connection
        setTimeout(function() {
            ch.close();
            process.exit();
        }, 1000);


    })
});