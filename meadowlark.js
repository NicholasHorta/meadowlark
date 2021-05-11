const express = require('express');
const app = express();

// Templating
const handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Port
app.set('port', process.env.PORT || 3000);

// Static
app.use(express.static(__dirname + '/public'));

const oceanQuotes = [
    "Because there's nothing more beautiful than the way the ocean refuses to stop kissing the shoreline, no matter how many times it's sent away.",
    "If you want to hear the distant voice of the ocean put your ear to the lips of a seashell.",
    "Those who live by the sea can hardly form a single thought of which the sea would not be part.",
    "In one drop of water are found all the secrets of all the oceans; in one aspect of you are found all the aspects of existence."
];

app.get('/', function(req, res){
    console.log(__dirname)
    res.render('home')
})

app.get('/about', function(req, res){
    const randomOceanQuote = oceanQuotes[Math.floor(Math.random() * oceanQuotes.length)];  
    res.render('about', {quotes: randomOceanQuote});
})









/// ----------------------------------------------------------------------------------------------------------

// Custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404')
});

// Custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500);
    res.render('500')
});

// Initiate Server
app.listen(app.get('port'), function(){
    console.log('Application started on PORT: ' + app.get('port') + ' Press CTRL-C to terminate...');
});
