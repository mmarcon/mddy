var findit = require('findit'),
    path = require('path'),
    Q = require('q'),
    mdfile = require('../io/mdfile');

module.exports = function(config, root){
    return function(req, res){
        var index = {
                app: config.app,
                notes: []
            },
            finder = findit(root),
            deferreds = [];

        finder.on('file', function(file/*, stat*/){
            deferreds.push(mdfile.read(file, root));
        });
        finder.on('end', function(){
            Q.all(deferreds).then(function(resolved){
                index.notes = resolved.sort(function(f1, f2){
                    return f1.path.localeCompare(f2.path);
                });
                res.render('index', index);
            }, function(){
                res.send(500);
            });

        });
    };
};