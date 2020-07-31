const db = require('../../lib/db');

describe('db', function () {
  describe('newUser', function () {
    context('should be able to make a new user', function () {
      it('was able to make a new user', function () {
        return db.newUser()
          .then(function ({ name, level, experience }) {
            expect(name).to.eql('main');
            expect(level).to.eql(1);
            expect(experience).to.eql(0);
          });
      });
    });
  });
  describe('updateUser', function () {
    context('should be able to update a user', function () {
      it('was able to update user', function () {
        return db.updateUser({
          name: 'main',
          level: 99,
          experience: 0,
        })
          .then(function ({ name, level, experience }) {
            expect(name).to.eql('main');
            expect(level).to.eql(99);
            expect(experience).to.eql(0);
          });
      });
    });
  });
  describe('getUserInfo', function () {
    context('should be able to get user', function () {
      it('was able to get user', function () {
        return db.getUserInfo()
          .then(function ({ name, level, experience }) {
            expect(name).to.eql('main');
            expect(level).to.eql(99);
            expect(experience).to.eql(0);
          });
      });
    });
  });
  describe('deleteUser', function () {
    context('should be able to remove user', function () {
      it('was able to remove user', function () {
        return db.deleteUser()
          .then(function (res) {
            expect(res).to.eql(true);
          });
      });
    });
  });
  describe('getUserInfo - after', function () {
    context('should not be able to find user so it makes one', function () {
      it('was able to make user', function () {
        return db.getUserInfo()
          .then(function ({ name, level, experience }) {
            expect(name).to.eql('main');
            expect(level).to.eql(1);
            expect(experience).to.eql(0);
          });
      });
    });
  });
  describe('deleteUser - after', function () {
    context('should be able to remove user', function () {
      it('was able to remove user', function () {
        return db.deleteUser()
          .then(function (res) {
            expect(res).to.eql(true);
          });
      });
    });
  });
});
