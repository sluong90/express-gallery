const bookshelf = require('../bookshelf');

class Business extends bookshelf.Model {
  get tableName() { return 'business'; }
  get hasTimestamps() { return true; }

  users() {
    return this.belongsTo('Users', 'user_id');
  }
}

module.exports = bookshelf.model('Business', Business);
