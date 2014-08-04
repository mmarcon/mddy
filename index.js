var express = require('express'),
    marked = require('marked'),
    middleware = require('./lib/middleware'),
    config = require('./config.json'),
    controller = require('./lib/controller');

var app = express();
var root = __dirname;

app.engine('.html', require('ejs').__express);
app.use(middleware.sass(root));
app.use(express.static(root + '/static'));
app.set('views', root + '/templates');
app.set('view engine', 'html');

app.get('/', controller.main(config, root));
app.get('/presentation/*', controller.note(config, root, true));
app.get('/note/*', controller.note(config, root));

app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);