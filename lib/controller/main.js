var path = require('path'),
    findit = require('findit');

module.exports = function(config, root){
    return function(req, res){
        var index = {
                app: config.app,
                notes: []
            },
            notesPath = path.join(root, 'notes'),
            finder = findit(notesPath);

        finder.on('file', function(file, stat){
            index.notes.push({
                name: path.relative(notesPath, file),
                url: '/' + path.relative(notesPath, file)
            });
        });
        finder.on('end', function(){
            index.notes = index.notes.sort(function(f1, f2){
                return f1.name.localeCompare(f2.name);
            });
            res.render('index', index);
        });
    };
};