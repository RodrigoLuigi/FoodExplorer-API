const knex = require('../database/knex');

class OrdersRepository {
  async create(user_id, code) {
    const order_id = await knex('orders').insert({
      code,
      user_id,
    });

    return order_id;
  }

  async findByUserId(user_id) {
    const orders = await knex('orders').where({ user_id });

    return orders;
  }

  async findById(id, user_id) {
    const order = await knex('orders').where({ id, user_id }).first();

    return order;
  }

  async update(order_id, status) {
    await knex('orders').where({ id: order_id }).update('status', status);
  }
}

module.exports = OrdersRepository;
