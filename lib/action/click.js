const utils = require('../utils.js');

const click = async () => {
  console.log('Click Action');
  await utils.experienceAdd('clickExperience', 'clickLevel');
  const levelUp = await utils.levelUp('Clicking', 'clickExperience', 'clickLevel');
  const itemAdded = await utils.itemAdd('coin');
  return ({ success: true, levelUp, itemAdded });
};

module.exports.init = click;
