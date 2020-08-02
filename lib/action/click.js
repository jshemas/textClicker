const utils = require('../utils.js');

const click = async () => {
  console.log('Click Action');
  await utils.addExperience('clickExperience', 'clickLevel');
  await utils.levelUp('Clicking', 'clickExperience', 'clickLevel');
  const itemAdded = await utils.itemAdd('coin');
  return ({ success: true, itemAdded });
};

module.exports.init = click;
