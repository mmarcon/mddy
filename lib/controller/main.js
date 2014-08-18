var findit = require('findit'),
    Q = require('q'),
    mdfile = require('../io/mdfile');

module.exports = function(config, root){
    return function(req, res){
        var query = req.query,
            index = {
                app: config.app,
                notes: []
            },
            finder = findit(root),
            deferreds = [];

        finder.on('file', function(file, stat){
            config.allowedExtensions.every(function(ext){
                if(file.indexOf(ext, file.length - ext.length) !== -1) {
                    deferreds.push(mdfile.read(file, stat, root));
                    return false;
                }
            });
        });
        finder.on('end', function(){
            Q.all(deferreds).then(function(resolved){
                if(query && query.q) {
                    resolved = resolved.filter(function(note){
                        var regex = new RegExp(query.q, 'ig');
                        console.log(regex);
                        return regex.test(note.md);
                    });
                }
                index.notes = resolved.sort(function(f1, f2){
                    return f2.stat.mtime.getTime() - f1.stat.mtime.getTime();
                });
                res.render('index', index);
            }, function(){
                res.send(500);
            });

        });
    };
};