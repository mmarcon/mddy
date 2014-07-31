var sass = require('node-sass');

module.exports = function(root){
    return sass.middleware({
        src: root + '/static',
        dest: root + '/static',
        debug: false,
        outputStyle: 'compressed'
    });
};