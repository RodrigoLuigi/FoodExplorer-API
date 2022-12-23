exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.text('name');
    table.text('description');
    table.text('price');
    table.text('imagePath').default(null);
    table.integer('category_id').references('id').inTable('category').onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('dishes');
