exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);
    })
        .createTable('business', table => {
            table.increments()
            table.string('name');
            table.string('author');
            table.text('description');
            table.text('url');
            table.integer('user_id').references('users.id')
            table.timestamps(true, true);
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('business')
        .dropTable('users');
};

