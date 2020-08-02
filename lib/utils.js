const db = require('./db.js');

exports.addExperience = async (skillExperience, skillLevel) => {
  const user = await db.getUserInfo();
  // updates experience
  user.experience += 1;
  if (user[skillExperience]) {
    user[skillExperience] += 1;
  } else {
    user[skillExperience] = 1;
  }
  if (!user[skillLevel]) user[skillLevel] = 1;

  // update user info
  await db.updateUser(user);
  return null;
};

exports.levelUp = async (skillName, skillExperience, skillLevel) => {
  const user = await db.getUserInfo();
  // check user level
  if (user.experience >= 2 ** (user.level - 1)) {
    user.level += 1;
    console.log(`Your user level has been increased to level ${user.level}`);
  }

  // check user skill level
  if (user[skillExperience] >= 2 ** (user[skillLevel] - 1)) {
    user[skillLevel] += 1;
    console.log(`${skillName} skill has been increased to level ${user[skillLevel]}`);
  }

  // update user info
  await db.updateUser(user);
  return null;
};

exports.itemAdd = async (itemName) => {
  const user = await db.getUserInfo();
  const itemRandom = Math.random();
  let itemAdded = false;

  // check to see if a item should be added
  if (itemRandom >= 0.75) {
    if (user.items[itemName]) user.items[itemName] += 1;
    if (!user.items[itemName]) user.items[itemName] = 1;
    itemAdded = true;
    console.log(`${itemName} has been added to your inventory`);
  }

  // update user info
  db.updateUser(user);
  return itemAdded;
};

exports.itemRemove = async (itemName) => {
  const user = await db.getUserInfo();
  // remove one of the item
  user.items[itemName] -= 1;
  // update user info
  await db.updateUser(user);
  return true;
};
