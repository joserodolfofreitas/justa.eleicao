var assert = require('assert');
var voteBox = require('../lib/vote-box');

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
});