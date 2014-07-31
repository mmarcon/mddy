var path = require('path'),
    findit = require('findit');

module.exports = function(config, root){
    return function(req, res){
        var index = {
                user: config.title,
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
            res.render('index', index);
        });
    };
};