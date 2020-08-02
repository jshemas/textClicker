/* eslint-disable mocha/no-hooks-for-single-case */
const click = require('../../../lib/action/click');
const db = require('../../../lib/db');

const sandbox = sinon.createSandbox();

describe('click action', function () {
  afterEach(function () {
    sandbox.restore();
  });
  context('should be able to click', function () {
    before(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 3,
        experience: 1,
        items: {
          coin: 1,
        },
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });

    it('was able to click', function () {
      return click.init()
        .then(function ({ success }) {
          expect(success).to.eql(true);
        });
    });
  });
  context('should be able to click and not get a item', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        clickLevel: 3,
        clickExperience: 2,
        items: {
          coin: 1,
        },
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(0);
    });
    it('was able to click', function () {
      return click.init()
        .then(function ({ success, itemAdded }) {
          expect(success).to.eql(true);
          expect(itemAdded).to.eql(false);
        });
    });
  });
  context('should be able to click and get item', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        clickLevel: 3,
        clickExperience: 2,
        items: {
          coin: 1,
        },
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to click and got item', function () {
      return click.init()
        .then(function ({ success, itemAdded }) {
          expect(success).to.eql(true);
          expect(itemAdded).to.eql(true);
        });
    });
  });
  context('should be able to click and get item when user has none', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 1,
        clickLevel: 3,
        clickExperience: 2,
        items: {},
      });
      sandbox.stub(db, 'updateUser').resolves(true);
      sandbox.stub(Math, 'random').returns(1);
    });
    it('was able to click and got item', function () {
      return click.init()
        .then(function ({ success, itemAdded }) {
          expect(success).to.eql(true);
          expect(itemAdded).to.eql(true);
        });
    });
  });
  context('should be able to level up from clicking', function () {
    beforeEach(function () {
      sandbox.stub(db, 'getUserInfo').resolves({
        name: 'main',
        level: 1,
        experience: 2,
        clickLevel: 1,
        clickExperience: 5,
        items: {
          coin: 1,
        },
      });
      sandbox.stub(db, 'updateUser').resolves(true);
    });
    it('was able to click', function () {
      return click.init()
        .then(function ({ success }) {
          expect(success).to.eql(true);
        });
    });
  });
});
