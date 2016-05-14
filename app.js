var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    voteBox = require('./lib/vote-box');

app.use(bodyParser.json());

app.post('/vote', function(req, res) {
    var vote = req.body;
    console.log(vote);
    var top5Candidates = vote.top5;
    var tituloDeEleitor = vote.titulo;

    voteBox.receiveVote(top5Candidates, tituloDeEleitor, function(err, result) {
        if(err) {
            res.status(500).json({err: err});
        }
        res.status(200).json({success: true});
    });
});

app.listen(8080, function() {
    console.log('listening on port 3000')
});