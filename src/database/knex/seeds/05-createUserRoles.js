/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_roles').del();
  await knex('user_roles').insert([
    {
      id: 1,
      user_id: 1,
      role_id: 1,
    },
    {
      id: 2,
      user_id: 2,
      role_id: 2,
    },
  ]);
};
