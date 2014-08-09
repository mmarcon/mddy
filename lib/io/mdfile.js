var fs = require('fs'),
    path = require('path'),
    fm = require('front-matter'),
    Q = require('q'),
    ejs = require('ejs');


var TAGS = {
    actions: /@(action)\:/ig,
    done: /@(done)\:/ig,
};

var templates = {
    actions: ejs.compile(fs.readFileSync(path.join(__dirname, '../../templates/action.html'), {encoding: 'utf-8'})),
    done: ejs.compile(fs.readFileSync(path.join(__dirname, '../../templates/done.html'), {encoding: 'utf-8'}))
};

module.exports = {
    read: function read(file, stat, notesPath){
        var deferred = Q.defer();
        fs.readFile(file, {encoding: 'utf-8'}, function(err, markdown){
            if(err) {
                deferred.reject(err);
            }
            var fmedMarkdown = fm(markdown), parsedFile, actions, done;
            actions = fmedMarkdown.body.match(TAGS.actions);
            done = fmedMarkdown.body.match(TAGS.done);
            if(actions && actions.length > 0) {
                fmedMarkdown.body = fmedMarkdown.body.replace(TAGS.actions, templates.actions({action: '$1'}));
            }
            if(done && done.length > 0) {
                fmedMarkdown.body = fmedMarkdown.body.replace(TAGS.done, templates.done({done: '$1'}));
            }
            parsedFile = {
                title: fmedMarkdown.attributes.title || path.relative(notesPath, file),
                tags: fmedMarkdown.attributes.tags && fmedMarkdown.attributes.tags.split(/,\s*?/) || [],
                date: fmedMarkdown.attributes.date,
                path: path.relative(notesPath, file),
                url: '/' + path.relative(notesPath, file),
                actions: (actions && actions.length) || 0,
                done: (done && done.length) || 0,
                md: fmedMarkdown.body,
                stat: stat
            };
            deferred.resolve(parsedFile);
        });
        return deferred.promise;
    }
};