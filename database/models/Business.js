const bookshelf = require('../bookshelf');

class Business extends bookshelf.Model {
  get tableName() { return 'businesses'; }
  get hasTimestamps() { return false; }
}

module.exports = bookshelf.model('Business', Business);
