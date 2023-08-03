/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ingredients').del();
  await knex('ingredients').insert([
    {
      id: 1,
      name: 'alface',
    },
    {
      id: 2,
      name: 'cebola',
    },
    {
      id: 3,
      name: 'pão naan',
    },
    {
      id: 4,
      name: 'pepino',
    },
    {
      id: 5,
      name: 'rabanete',
    },
    {
      id: 6,
      name: 'tomate',
    },
    {
      id: 7,
      name: 'camarão',
    },
    {
      id: 8,
      name: 'rúcula',
    },
    {
      id: 9,
      name: 'bacon',
    },
    {
      id: 10,
      name: 'cenoura',
    },
    {
      id: 11,
      name: 'ameixa',
    },
    {
      id: 12,
      name: 'povilho',
    },
    {
      id: 13,
      name: 'pêssego',
    },
    {
      id: 14,
      name: 'hortelã',
    },
    {
      id: 15,
      name: 'amêndoas',
    },
    {
      id: 16,
      name: 'manteiga',
    },
    {
      id: 17,
      name: 'açúcar',
    },
    {
      id: 18,
      name: 'damasco',
    },
    {
      id: 19,
      name: 'café',
    },
    {
      id: 20,
      name: 'leite em pó',
    },
    {
      id: 21,
      name: 'maracujá',
    },
    {
      id: 22,
      name: 'canela',
    },
    {
      id: 23,
      name: 'limão',
    },
    {
      id: 24,
      name: 'anis',
    },
    {
      id: 25,
      name: 'maçã',
    },
    {
      id: 26,
      name: 'whisky',
    },
  ]);
};
