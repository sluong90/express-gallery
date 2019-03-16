
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        { business: 'earls' },
        { business: 'workPlay' },
        { business: 'realGas' }
      ]);
    });
};
