#!/usr/bin/env node
var Mddy = require('../'),
    minimist = require('minimist');

var cwd = process.cwd(),
    argv = minimist(process.argv.slice(2));

if(argv._.length > 0) {
    cwd = argv._[0];
}

var mddy = new Mddy(cwd);
mddy.start();
