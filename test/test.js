var request = require('supertest');
var loopback = require('loopback');
var expect = require('chai').expect;
var fixturesComponent = require('../');
var app;
var Item;

describe('loopback fixtures component', function () {
  beforeEach(function(){
    app = loopback();
    app.set('legacyExplorer', false);
    var dataSource = loopback.createDataSource('memory');
    Item = dataSource.createModel('item', {
      id: {type: Number, id: true},
      name: String,
      description: String
    });
    app.model(Item);
    app.use(loopback.rest());
  });

  describe('when using defaults', function () {
    it('shouldn\'t load fixtures on startup ', function(done){
      options = {};
      fixturesComponent(app, options);
      request(app).get('/items')
        .expect(200)
        .end(function(err, res){
          expect(err).to.equal(null);
          expect(res.body).to.be.an('Array');
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });
});