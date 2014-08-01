var fs = require('fs'),
    path = require('path'),
    findit = require('findit'),
    highlight = require('highlight.js'),
    marked = require('marked'),
    fm = require('front-matter');

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

module.exports = function(config, root){
    return function(req, res){
        var fileName = req.params[0],
        filePath = path.join(root, 'notes', fileName);

        fs.readFile(filePath, {encoding: 'utf-8'}, function(err, markdown){
            if(err) {
                return res.send(404);
            }
            var fmedMarkdown = fm(markdown);
            var note = {
                app: config.app,
                title: fmedMarkdown.attributes.title || fileName,
                body: fmedMarkdown.body && marked(fmedMarkdown.body) || ''
            };
            res.render('note', note);
        });
    };
};