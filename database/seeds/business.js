exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('business').del()
    .then(function () {
      // Inserts seed entries
      return knex('business').insert([
        { 
          author: 'author1',
          url: 'https://s3-media2.fl.yelpcdn.com/bphoto/uOXDnKO4jOEIjpEQ-ihE_Q/o.jpg',
          description: 'descript1'
        },
        {
          author: 'author2',
          url: 'https://s3-media2.fl.yelpcdn.com/bphoto/pnGFONEnkeavOq4CK3HVPQ/o.jpg',
          description: 'descript2'
        },
        {
          author: 'author3',
          url: 'https://s3-media3.fl.yelpcdn.com/bphoto/w3IjAsNIQ__5AblaWKo-4A/o.jpg',
          description: 'descript3'
        }
      ]);
    });
};
