var fs = require('fs'),
    path = require('path'),
    fm = require('front-matter'),
    Q = require('q');


var TAGS = {
    actions: /@action\:/igm
};

module.exports = {
    read: function read(file, notesPath){
        var deferred = Q.defer();
        fs.readFile(file, {encoding: 'utf-8'}, function(err, markdown){
            if(err) {
                deferred.reject(err);
            }
            var fmedMarkdown = fm(markdown), parsedFile, actions;
            actions = fmedMarkdown.body.match(TAGS.actions);
            parsedFile = {
                title: fmedMarkdown.attributes.title || path.relative(notesPath, file),
                tags: fmedMarkdown.attributes.tags && fmedMarkdown.attributes.tags.split(/,\s*?/) || [],
                date: fmedMarkdown.attributes.date,
                path: path.relative(notesPath, file),
                url: '/' + path.relative(notesPath, file),
                actions: (actions && actions.length) || 0,
                md: fmedMarkdown.body
            };
            deferred.resolve(parsedFile);
        });
        return deferred.promise;
    }
};