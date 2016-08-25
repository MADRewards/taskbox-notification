const serve = require('koa-static');
const koa = require('koa');
const route = require('koa-route');
const app = koa();
const config = require('./config.js');
const notification = require('./controllers/notification');
const cron = require('cron');


app.use(serve(__dirname + '/public'));
app.use(serve(config.get('path_data')));
app.use(route.get('/data.js', notification.generate));

app.listen(3000);

var cronJob = cron.job(config.get('schedule_to_generate'), function(){
    console.log('cron job started ')
    notification.generate().next();
    console.log('cron job ended '+new Date())
});
cronJob.start();

console.log('listening on port 3000');