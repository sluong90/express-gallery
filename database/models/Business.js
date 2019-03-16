const bookshelf = require('../bookshelf');

class Business extends bookshelf.Model {
<<<<<<< HEAD
  get tableName() { return 'businesses'; }
=======
  get tableName() { return 'business'; }
>>>>>>> devss
  get hasTimestamps() { return false; }
}

module.exports = bookshelf.model('Business', Business);
