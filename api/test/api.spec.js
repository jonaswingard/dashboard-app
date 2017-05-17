import chai from 'chai';
import chaiHttp from 'chai-http';

const { should } = chai;

chai.should();
chai.use(chaiHttp);

describe('API Tests', () => {
  it('Should list 5 items on /pocket GET', done => {
    const app = require('../lib/app');
    chai.request(app)
      .get('/api/pocket?limit=5')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('item_id');
        res.body.should.have.lengthOf(5);
        done();
      });
  });

  it('Should get a response from /dayinfo', done => {
    const app = require('../lib/app');
    chai.request(app)
      .get('/api/dayinfo')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('dagar');
        done();
      });
  });
});
