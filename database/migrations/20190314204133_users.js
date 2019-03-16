exports.up = function (knex, Promise) {
    return knex.schema.createTable('business', (table) => {
        table.increments();
        table.string('business');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('business');
};

