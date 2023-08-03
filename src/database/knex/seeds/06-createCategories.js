/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    {
      id: 1,
      name: 'Refeições',
      icon: '🍲',
    },
    {
      id: 2,
      name: 'Sobremesas',
      icon: '🍦',
    },
    {
      id: 3,
      name: 'Bebidas',
      icon: '🍹',
    },
  ]);
};
