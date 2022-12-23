exports.up = (knex) =>
  knex.schema.createTable('order_product', (table) => {
    table.increments('id');
    table.integer('quantity');
    table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('dishes');
