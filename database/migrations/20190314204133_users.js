

exports.up = function (knex, Promise) {
    return knex.schema.createTable('businesses', (table) => {
        table.increments();
        table.string('business');
    })
};

exports.down = function (knex, Promise) {
<<<<<<< HEAD
    return knex.schema.dropTable('businesses');
};
=======
    return knex.schema.dropTable('users');
};

>>>>>>> devss
