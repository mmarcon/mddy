#!/usr/bin/env node
var Mddy = require('../'),
    path = require('path');

var mddy = new Mddy(path.join(__dirname, 'example'));
mddy.start();
