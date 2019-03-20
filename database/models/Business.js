const bookshelf = require('../bookshelf');

class Business extends bookshelf.Model {
  get tableName() { return 'business'; }
  get hasTimestamps() { return false; }
}

module.exports = bookshelf.model('Business', Business);
