import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';

const { expect } = chai;

chai.use(chaiHttp);

describe.only('API Tests', () => {
  it('Should list 5 items on /pocket GET', (done) => {
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

  it('Should get a response from /dayinfo', (done) => {
    chai.request(app)
      .get('/api/dayinfo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('dagar');
        done();
      });
  });
});
