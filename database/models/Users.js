
// class Users extends bookshelf.Model {
//   get tableName() {return 'user'}
//   get idAttribute() {return 'user_id'}
//   get hasTimestamps() {return true}
// }
const bookshelf = require('../bookshelf');

class Users extends bookshelf.Model {
  get tableName() { return 'users'; }
  get hasTimestamps() { return true; }

  users() {
    return this.hasMany('Business', 'user_id');
  }
}




module.exports = bookshelf.model('Users', Users);

