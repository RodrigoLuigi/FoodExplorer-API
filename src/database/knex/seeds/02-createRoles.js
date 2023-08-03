/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    {
      id: 1,
      name: 'ROLE_ADMIN',
      description: 'Administrador',
    },
    {
      id: 2,
      name: 'ROLE_USER',
      description: 'Usuário',
    },
  ]);
};
