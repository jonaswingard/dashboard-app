import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';

const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('Should list 5 items on pocket', (done) => {
    chai.request(app)
      .get('/api/pocket?limit=5')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('item_id');
        expect(res.body).to.have.lengthOf(5);
        done();
      });
  });

  it('Should get a response from day info', (done) => {
    chai.request(app)
      .get('/api/dayinfo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('dagar');
        done();
      });
  });

  it('Should get a response from traffic info', (done) => {
    chai.request(app)
      .get('/api/traffic/info')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('TrafficStatus');
        done();
      });
  });

  it('Should get a response from traffic location lookup', (done) => {
    chai.request(app)
      .post('/api/traffic/location')
      .send({ query: 'tegnergatan' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length.above(0);
        done();
      });
  });

  it.only('Should get a response from real time information', (done) => {
    chai.request(app)
      .post('/api/traffic/realtime')
      .send({ siteid: '1550' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.ResponseData.Buses).to.have.length.above(0);
        done();
      });
  });
});
