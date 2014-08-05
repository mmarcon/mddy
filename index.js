var express = require('express'),
    middleware = require('./lib/middleware'),
    config = require('./config.json'),
    controller = require('./lib/controller'),
    path = require('path');

var MDDY = function(root){
    this.root = root;
};

MDDY.prototype.start = function() {
    var app = express();
    app.engine('.html', require('ejs').__express);
    app.use(middleware.sass(__dirname));
    app.use(express.static(path.join(__dirname, 'static')));
    app.set('views', path.join(__dirname, 'templates'));
    app.set('view engine', 'html');

    app.get('/', controller.main(config, this.root));
    app.get('/presentation/*', controller.note(config, this.root, true));
    app.get('/note/*', controller.note(config, this.root));

    app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);
};

module.exports = MDDY;