exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('business').del()
    .then(function () {
      // Inserts seed entries
      return knex('business').insert([
        { 
          author: 'author1',
          url: 'url1',
          description: 'descript1'
        },
        {
          author: 'author2',
          url: 'url2',
          description: 'descript2'
        },
        {
          author: 'author3',
          url: 'url3',
          description: 'descript3'
        }
      ]);
    });
};
