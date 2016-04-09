# RabbitMQ Learnings
Setting up the project: 
You need vagrant and VirtualBox isntalled

```
# in your root directory run:
vagrant up 
```

Switch to the virtual machine and fill the example queues: 
```
vagrant ssh 
node /var/www/forever-push/index.js 
```

Receive from Queues: 
```
node /var/www/forever-push/getAllNews.js
```


