exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('business').del()
    .then(function () {
      // Inserts seed entries
      return knex('business').insert([
        {
          name: 'EARL Kakaako',
          author: 'Kai K.',
          url: 'https://s3-media2.fl.yelpcdn.com/bphoto/uOXDnKO4jOEIjpEQ-ihE_Q/o.jpg',
          description: 'These sandwiches have come from sandwich heaven. I seriously dream about them. Of course the brisket is my favorite. The Italian comes in a very close second, but the Turkey Jam Sam is a definite contender. Every last item they put in every sandwich just builds on the last thing to make every bite sublime. The meat - so tender, and cut to the perfect size and thickness - is flavored throughout. Whatever veggies are used are grilled or roasted to perfection. And the marriage of cheeses (when used) and the balance with bread is just muwaaaah! Really.'
        },
        {
          name: 'REAL Gastropub',
          author: 'Hoku L.',
          url: 'https://s3-media2.fl.yelpcdn.com/bphoto/pnGFONEnkeavOq4CK3HVPQ/o.jpg',
          description: 'This new and larger gastropub has not lost its edge from its original site.  It features a rotation of 30+ taps of hard-to-get brews, several wines, vodkas, rums, tequila/mezcal, bourbons, whiskeys and non-alcoholic beverages.  Its new gastropub menu features delicious eats that pair so well with whatever youre drinking and its expanded menu offers full size meals that will make this place an additional lunch option for downtown workers or after work stop with friends.'
        },
        {
          name: 'Workplay',
          author: 'Mike D.',
          url: 'https://s3-media3.fl.yelpcdn.com/bphoto/w3IjAsNIQ__5AblaWKo-4A/o.jpg',
          description: 'This place is versatile and beautifully designed. I say versatile because, true to its name, it can function as a coffeeshop for working during the day, or a cocktail bar at night, and its main draw are a variety of private rooms that can be "rented" for the night by meeting a food/drink minimum. Their food was excellent - tacos, sliders, charcuterie, artichoke dip. Their drinks are incredible too.'
        }
      ]);
    });
};
