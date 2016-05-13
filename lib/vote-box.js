var redis = require("redis");
var client = redis.createClient();


var candidatePool = {};
exports.receiveVote = function(top5Candidates, callback) {

    top5Candidates.map(function(candidate, index){
        var points = (5 - index);
        if (candidatePool[candidate]) {
            candidatePool[candidate] += points;
        } else {
            candidatePool[candidate] = points;
        }
    });

    console.log(candidatePool);

    callback(null, candidatePool);
}