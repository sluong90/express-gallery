exports.up = function (knex, Promise) {
    return knex.schema.createTable('user', table => {
        table.increments('user_id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.timestamps(true, true);
    })
        .createTable('business', table => {
            table.increments('business_id').primary();
            table.string('name').notNullable();
            table.string('author').notNullable();
            table.text('description').notNullable();
            table.text('url').notNullable();
            table.integer('user_id').references('user_id').inTable('user').onDelete('cascade');
            table.timestamps(true, true);
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('business')
        .dropTable('user');
};

