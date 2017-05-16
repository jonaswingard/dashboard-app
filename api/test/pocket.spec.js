const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

require('dotenv').load();

import pocket from '../lib/service/pocket';

describe.only('Pocket Service', () => {
  let itemId;
  const tagName = 'test-tag';

  it('Get environment variables', () => {
    should.exist(process.env.POCKET_CONSUMER_KEY);
    should.exist(process.env.POCKET_ACCESS_TOKEN);
    process.env.POCKET_CONSUMER_KEY.should.be.a('string');
    process.env.POCKET_ACCESS_TOKEN.should.be.a('string');
  });

  it('Get 5 items', () => {
    const item = pocket.get(5);
    return expect(item).to.eventually.have.lengthOf(5);
  });

  it('Add new item', () => {
    const url = 'http:\/\/pocket.co\/s8Kga';
    const item = pocket.add(url);

    return item.then((response) => {
      expect(response).to.have.deep.property('item.item_id');
      expect(response.item.title).to.equal('Good night, Posterous');
      itemId = response.item.item_id;
    });
  });

  it('Add a tag to an item', () => {
    const item = pocket.tag(itemId, tagName);

    return expect(item).to.eventually.have.property('status', 1);
  });

  it('Remove a tag from an item', () => {
    const item = pocket.tag(itemId, tagName, true);

    return expect(item).to.eventually.have.property('status', 1);
  });

  it('Archive an item', () => {
    const item = pocket.archive(itemId);

    return expect(item).to.eventually.have.property('status', 1);
  });

  it('Delete an item', () => {
    const item = pocket.delete(itemId);
    return expect(item).to.eventually.have.property('status', 1);
  })
});

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
});
