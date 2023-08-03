/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('product_ingredients').del();
  await knex('product_ingredients').insert([
    {
      id: 1,
      product_id: 1,
      ingredient_id: 1,
    },
    {
      id: 2,
      product_id: 1,
      ingredient_id: 2,
    },
    {
      id: 3,
      product_id: 1,
      ingredient_id: 3,
    },
    {
      id: 4,
      product_id: 1,
      ingredient_id: 4,
    },
    {
      id: 5,
      product_id: 1,
      ingredient_id: 5,
    },
    {
      id: 6,
      product_id: 1,
      ingredient_id: 6,
    },
    {
      id: 7,
      product_id: 2,
      ingredient_id: 2,
    },
    {
      id: 8,
      product_id: 2,
      ingredient_id: 5,
    },
    {
      id: 9,
      product_id: 2,
      ingredient_id: 6,
    },
    {
      id: 10,
      product_id: 2,
      ingredient_id: 7,
    },
    {
      id: 11,
      product_id: 2,
      ingredient_id: 8,
    },
    {
      id: 12,
      product_id: 3,
      ingredient_id: 1,
    },
    {
      id: 13,
      product_id: 3,
      ingredient_id: 2,
    },
    {
      id: 14,
      product_id: 3,
      ingredient_id: 8,
    },
    {
      id: 15,
      product_id: 3,
      ingredient_id: 9,
    },
    {
      id: 16,
      product_id: 4,
      ingredient_id: 1,
    },
    {
      id: 17,
      product_id: 4,
      ingredient_id: 2,
    },
    {
      id: 18,
      product_id: 4,
      ingredient_id: 4,
    },
    {
      id: 19,
      product_id: 4,
      ingredient_id: 5,
    },
    {
      id: 20,
      product_id: 4,
      ingredient_id: 6,
    },
    {
      id: 21,
      product_id: 4,
      ingredient_id: 10,
    },
    {
      id: 22,
      product_id: 5,
      ingredient_id: 11,
    },
    {
      id: 23,
      product_id: 5,
      ingredient_id: 12,
    },
    {
      id: 24,
      product_id: 6,
      ingredient_id: 13,
    },
    {
      id: 25,
      product_id: 6,
      ingredient_id: 14,
    },
    {
      id: 26,
      product_id: 7,
      ingredient_id: 15,
    },
    {
      id: 27,
      product_id: 7,
      ingredient_id: 16,
    },
    {
      id: 28,
      product_id: 7,
      ingredient_id: 17,
    },
    {
      id: 29,
      product_id: 8,
      ingredient_id: 15,
    },
    {
      id: 30,
      product_id: 8,
      ingredient_id: 16,
    },
    {
      id: 31,
      product_id: 8,
      ingredient_id: 17,
    },
    {
      id: 32,
      product_id: 8,
      ingredient_id: 18,
    },
    {
      id: 33,
      product_id: 9,
      ingredient_id: 19,
    },
    {
      id: 34,
      product_id: 9,
      ingredient_id: 20,
    },
    {
      id: 35,
      product_id: 10,
      ingredient_id: 17,
    },
    {
      id: 36,
      product_id: 10,
      ingredient_id: 21,
    },
    {
      id: 37,
      product_id: 11,
      ingredient_id: 22,
    },
    {
      id: 38,
      product_id: 11,
      ingredient_id: 23,
    },
    {
      id: 39,
      product_id: 11,
      ingredient_id: 24,
    },
    {
      id: 40,
      product_id: 12,
      ingredient_id: 25,
    },
    {
      id: 41,
      product_id: 12,
      ingredient_id: 26,
    },
  ]);
};
