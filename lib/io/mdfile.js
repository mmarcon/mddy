var fs = require('fs'),
    path = require('path'),
    fm = require('front-matter'),
    Q = require('q');

module.exports = {
    read: function read(file, notesPath){
        var deferred = Q.defer();
        fs.readFile(file, {encoding: 'utf-8'}, function(err, markdown){
            if(err) {
                deferred.reject(err);
            }
            var fmedMarkdown = fm(markdown), parsedFile;
            parsedFile = {
                title: fmedMarkdown.attributes.title || path.relative(notesPath, file),
                path: path.relative(notesPath, file),
                url: '/' + path.relative(notesPath, file),
                md: fmedMarkdown.body
            };
            deferred.resolve(parsedFile);
        });
        return deferred.promise;
    }
};