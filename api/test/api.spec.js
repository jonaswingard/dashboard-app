import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
  const mockUserName = 'testuser1';

  it('Should be able to add a new user', (done) => {
    chai.request(app)
      .post('/api/user/add')
      .send({
        username: mockUserName,
        name: 'test user 1',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should be able to add a new widget', (done) => {
    const mockWidget1 = {
      componentName: 'testwidget1',
      settings: [{ ComponentTitle: 'testwidget title 1' }],
    };

    chai.request(app)
      .post('/api/user/widget/add')
      .send({
        username: mockUserName,
        widget: mockWidget1,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should get a list of user widgets', (done) => {
    chai.request(app)
      .post('/api/user/widgets')
      .send({
        username: mockUserName,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.widgetList).to.be.an('array');
        expect(res.body.widgetList).to.have.length.above(0);
        expect(res.body.widgetList[0]).to.have.property('componentName');
        done();
      });
  });

  it('Should be able to delete newly added user', (done) => {
    chai.request(app)
      .post('/api/user/delete')
      .send({
        username: mockUserName,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

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

  it('Should get a response from real time information', (done) => {
    chai.request(app)
      .post('/api/traffic/realtime')
      .send({ siteid: '1550', timewindow: '5' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.ResponseData.Buses).to.have.length.above(0);
        done();
      });
  });
});
