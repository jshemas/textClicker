const db = require('../db.js');

const inventory = async () => {
  const user = await db.getUserInfo();
  console.log('Inventory:');
  Object.entries(user.items).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  return null;
};

module.exports.init = inventory;
