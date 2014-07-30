var express = require('express'),
    marked = require('marked'),
    sass = require('node-sass'),
    highlight = require('highlight.js'),
    fs = require('fs'),
    path = require('path'),
    findit = require('findit'),
    config = require('./config.json');

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
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code){
        return highlight.highlightAuto(code).value;
    }
});

var app = express();
app.engine('.html', require('ejs').__express);
app.use(sass.middleware({
    src: __dirname + '/static',
    dest: __dirname + '/static',
    debug: false,
    outputStyle: 'compressed'
}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

app.get('/', function(req, res){
    var index = {
        user: config.title,
        notes: []
    };

    var notesPath = path.join(__dirname, 'notes');

    var finder = findit(notesPath);
    finder.on('file', function(file, stat){
        index.notes.push({
            name: path.relative(notesPath, file),
            url: '/' + path.relative(notesPath, file)
        });
    });
    finder.on('end', function(){
        res.render('index', index);
    });
});

app.get('/*', function(req, res){
    var fileName = req.params[0],
        filePath = path.join(__dirname, 'notes', fileName);

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
        if(err) {
            return res.send(404);
        }
        var repo = {
            title: fileName,
            body: marked(data)
        };
        res.render('repo', repo);
    });
});

app.listen(process.env.PORT || process.env.VCAP_APP_PORT || 3000);