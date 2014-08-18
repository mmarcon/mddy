var express = require('express'),
    config = require('./config.json'),
    package = require('./package.json'),
    controller = require('./lib/controller'),
    path = require('path'),
    ip = require('ip');

var MDDY = function(root){
    this.root = root;
    this.port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
};

MDDY.prototype.start = function() {
    var app = express();
    app.engine('.html', require('ejs').__express);
    app.use(express.static(path.join(__dirname, 'static')));
    app.set('views', path.join(__dirname, 'templates'));
    app.set('view engine', 'html');

    app.get('/', controller.main(config, this.root));
    app.get('/presentation/*', controller.note(config, this.root, true));
    app.get('/note/*', controller.note(config, this.root));

    console.log('MDDY version: ' + package.version);
    console.log('Working directory: ' + this.root);
    console.log('Running at http://' + ip.address() + ':' + this.port);

    app.listen(this.port);
};

module.exports = MDDY;