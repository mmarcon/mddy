var path = require('path'),
    highlight = require('highlight.js'),
    marked = require('marked'),
    mdfile = require('../io/mdfile');

var markedRenderer = new marked.Renderer();

markedRenderer.image = function(href, title, altText){
    var html = '';
    html += '<div class="image-wrapper">';
    html += '<img src="' + href + '" ';
    if(title) {
        html += 'title="' + title + '" ';
    }
    html += 'alt="' + altText + '"/>';
    html += '</div>';
    return html;
};

marked.setOptions({
    renderer: markedRenderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code){
        return highlight.highlightAuto(code).value;
    }
});

module.exports = function(config, root, presentation){
    return function(req, res){
        var fileName = req.params[0],
        filePath = path.join(root, fileName);

        mdfile.read(filePath, root).then(function(note){
            note.app = config.app;
            note.body = marked(note.md);
            if(presentation) {
                return res.render('presentation', note);
            }
            return res.render('note', note);
        });
    };
};