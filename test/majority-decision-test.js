var assert = require('assert');
var voteBox = require('../lib/vote-box');

var candidatePool =  [
    {candidate:'dilma', possibility: 20},
    {candidate:'aecio_neves', possibility: 20},
    {candidate:'marina', possibility: 20},
    {candidate:'eduardo_george', possibility: 10},
    {candidate:'luciana_genro', possibility: 10},
    {candidate:'ze_maria', possibility: 5},
    {candidate:'pastor_everaldo', possibility: 5},
    {candidate:'eymael', possibility: 5},
    {candidate:'rui_costa', possibility: 5}
];
//var candidatePool =  ['dilma', 'eduardo_george', 'aecio_neves', 'luciana_genro', 'marina', 'ze_maria', 'pastor_everaldo', 'eymael', 'rui_costa'];


var getCandidatesForPriority = function(priority) { //priority one to five
    var baseRef = Math.random() * 100;

    var votedCandidate;
    for(var i = 0; i < candidatePool.length; i++) {
        var candidate = candidatePool[i];
        var candidateRangeMin = function(i) {
            var min = 0;
            for (var j = i-1; j >= 0; j--) {
                min += candidatePool[j].possibility;
            }
            return min;
        }(i);
        var candidateRangeMax = candidateRangeMin + candidate.possibility;
        if (baseRef >= candidateRangeMin && baseRef <= candidateRangeMax) {
            votedCandidate = candidate.candidate;
            break;
        }
    }
    return votedCandidate;
}

var getCandidatesFromPool = function() {
    var candidates = [];
    for (var i = 1; i <= 5; i++) {
        candidates.push(getCandidatesForPriority(i));
    }
    return candidates;
}

describe('Majority Decision Test', function() {
    it('should give points to the top 5 candidates', function(done) {
        var candidates = ['dilma', 'eduardo_george', 'aecio_neves', 'luciana_genro', 'marina'];

        voteBox.receiveVote(candidates, function(err, result) {
            assert.equal(result.dilma, 5);
            assert.equal(result.eduardo_george, 4);
            assert.equal(result.aecio_neves, 3);
            assert.equal(result.luciana_genro, 2);
            assert.equal(result.marina, 1);
        });
        done();
    });


    it('should be close to the majority decision', function(done) {
        //100000000
        var maxVotes = 100000000;

        var simulateVote = function(currentVote, maxVotes) {
            var candidates = getCandidatesFromPool();
            console.log('nextTick' + currentVote);
            voteBox.receiveVote(candidates, function(err, result) {
                if (err) {
                    throw err
                }
                if (currentVote < maxVotes) {
                    process.nextTick (function (){
                        simulateVote(++currentVote, maxVotes);
                    });
                } else {
                    done();
                }
            });
        };

        simulateVote(0, maxVotes);
    });
});