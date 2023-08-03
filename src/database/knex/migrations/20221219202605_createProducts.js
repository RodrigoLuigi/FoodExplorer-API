exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.text('description');
    table.string('price').notNullable();
    table.text('imagePath').defaultTo(null);
    table
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('products');
