import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

require('dotenv').load();

import pocket from '../lib/service/pocket';

describe('Pocket Service', () => {
  let itemId;
  const tagName = 'test-tag';

  it('Get environment variables', () => {
    expect(process.env.POCKET_CONSUMER_KEY).to.be.a('string');
    expect(process.env.POCKET_ACCESS_TOKEN).to.be.a('string');
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
