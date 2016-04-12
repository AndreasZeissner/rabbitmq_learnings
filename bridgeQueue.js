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

var ExchangeBuilder = require('forever-rabbit').exchangeBuilder();
var QueryBinder = require('forever-rabbit').queueBinder();

//ExchangeBuilder.bulkCreate('amqp://localhost', 'config/exchange.json');
//setTimeout(function() {
//    QueryBinder.bindQueues('amqp://localhost', 'config/exchange.json');
//}, 1000);
// require('forever-rabbit').kill();

var amqp = require('amqplib/callback_api.js');

var express = require('express');
var bodyParser = require('body-parser');
var service = express();

service.use(bodyParser.urlencoded({ extended: true }));
service.use(bodyParser.json());

var router = express.Router();

router.use(function (req, res, next) {

    next();
});
service.use('/messaging/api', router);

router.route('/postsfromsap')
    .post(function(req, res, next) {
        console.log(req.body);
    });
//amqp.connect('amqp://localhost', function(err, conn) {
//    // creating a channel
//    conn.createChannel(function(err, ch) {
//        var msg = {
//            name: "TEST",
//            version: 1.2
//        };
//        msg = JSON.stringify(msg);
//        ch.publish('collect-all-logs', 'priority.log.machinelogs' , new Buffer(msg));
//        // closing the connection
//        setTimeout(function() {
//            ch.close();
//            process.exit();
//        }, 1000);
//    })
//});

var server = service.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});