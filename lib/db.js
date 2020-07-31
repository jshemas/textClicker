const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
  users: [],
}).write();

exports.deleteUser = async () => {
  await db.get('users').remove({ name: 'main' }).write();
  return true;
};

exports.getUserInfo = async () => {
  const user = await db.get('users').find({ name: 'main' }).write();
  if (user === undefined) {
    const newUser = await this.newUser();
    return newUser;
  }
  return user;
};

exports.newUser = async () => {
  await db.get('users').remove({ name: 'main' }).write();
  await db.get('users').push({
    name: 'main',
    level: 1,
    experience: 0,
    items: {},
  }).write();
  const user = await db.get('users').find({ name: 'main' }).write();
  return user;
};

exports.updateUser = async (args) => {
  await db.get('users').find({ name: 'main' }).assign(args).write();
  const user = await this.getUserInfo();
  return user;
};
