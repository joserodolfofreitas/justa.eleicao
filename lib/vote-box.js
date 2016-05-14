//var redis = require("redis");
//var client = redis.createClient();

var candidatePool = {};

exports.receiveVote = function(top5Candidates, tituloDeEleitor, callback) {

    top5Candidates.map(function(candidate, index){
        var points = (5 - index);
        if (candidatePool[candidate]) {
            candidatePool[candidate] += points;
        } else {
            candidatePool[candidate] = points;
        }
    });
    console.log('tituloDeEleitor');
    console.log(tituloDeEleitor);

    callback(null, candidatePool);
}

exports.getElectionResult = function(callback) {
    var keys = Object.keys(candidatePool);
    var candidateArray = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        candidateArray.push({candidate: key, score: candidatePool[key]});
    }
    candidateArray.sort(function(a, b){
        return b.score - a.score;
    })

    callback(null, candidateArray);
}