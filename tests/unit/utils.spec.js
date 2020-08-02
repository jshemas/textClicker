/* eslint-disable mocha/no-hooks-for-single-case */
const utils = require('../../lib/utils');
const db = require('../../lib/db.js');

const sandbox = sinon.createSandbox();

describe('utils', function () {
  afterEach(function () {
    sandbox.restore();
  });
  context('addExperience', function () {
    context('using a new skill', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 1,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.addExperience('fooExperience', 'fooLevel');
        return expect(this.updateSpy)
          .to.have.been.calledWith({
            experience: 2,
            fooExperience: 1,
            fooLevel: 1,
            level: 1,
            name: 'foo',
          })
          .and.to.be.calledOnce;
      });
    });
    context('using an existing skill', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 1,
          fooExperience: 1,
          fooLevel: 1,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.addExperience('fooExperience', 'fooLevel');
        return expect(this.updateSpy)
          .to.have.been.calledWith({
            experience: 2,
            fooExperience: 2,
            fooLevel: 1,
            level: 1,
            name: 'foo',
          })
          .and.to.be.calledOnce;
      });
    });
  });
  context('levelUp', function () {
    context('when the user should level up', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 100,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.levelUp('foo', 'bar', 'foobar');
        return expect(this.updateSpy)
          .to.have.been.calledWith({ experience: 100, level: 2, name: 'foo' })
          .and.to.be.calledOnce;
      });
    });
    context('when the user should not level up', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 0,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.levelUp('foo', 'bar', 'foobar');
        return expect(this.updateSpy)
          .to.have.been.calledWith({ experience: 0, level: 1, name: 'foo' })
          .and.to.be.calledOnce;
      });
    });
    context('when the skill should level up', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 0,
          fooExperience: 100,
          fooLevel: 1,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.levelUp('foo', 'fooExperience', 'fooLevel');
        return expect(this.updateSpy)
          .to.have.been.calledWith({
            experience: 0,
            fooExperience: 100,
            fooLevel: 2,
            level: 1,
            name: 'foo',
          })
          .and.to.be.calledOnce;
      });
    });
    context('when the skill should not level up', function () {
      before(function () {
        sandbox.stub(db, 'getUserInfo').resolves({
          name: 'foo',
          level: 1,
          experience: 0,
          fooExperience: 0,
          fooLevel: 1,
        });
        this.updateSpy = sandbox.stub(db, 'updateUser').returns(true);
      });
      it('they leveled up', async function () {
        await utils.levelUp('foo', 'fooExperience', 'fooLevel');
        return expect(this.updateSpy)
          .to.have.been.calledWith({
            experience: 0,
            fooExperience: 0,
            fooLevel: 1,
            level: 1,
            name: 'foo',
          })
          .and.to.be.calledOnce;
      });
    });
  });
});
