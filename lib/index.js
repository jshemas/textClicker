const help = require('./action/help.js');
const inventory = require('./action/inventory.js');
const click = require('./action/click.js');

const router = {
  help,
  inventory,
  click,
};

module.exports = router;
