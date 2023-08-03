exports.up = (knex) =>
  knex.schema.createTable('product_ingredients', (table) => {
    table.increments('id');
    table
      .integer('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table
      .integer('ingredient_id')
      .references('id')
      .inTable('ingredients')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('product_ingredients');
