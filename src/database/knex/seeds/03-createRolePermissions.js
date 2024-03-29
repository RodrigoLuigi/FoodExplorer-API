/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('role_permissions').del();
  await knex('role_permissions').insert([
    {
      id: 1,
      permission_id: 1,
      role_id: 1,
    },
    {
      id: 2,
      permission_id: 2,
      role_id: 1,
    },
    {
      id: 3,
      permission_id: 3,
      role_id: 1,
    },
    {
      id: 4,
      permission_id: 4,
      role_id: 1,
    },
    {
      id: 5,
      permission_id: 5,
      role_id: 1,
    },
    {
      id: 6,
      permission_id: 6,
      role_id: 1,
    },
    {
      id: 7,
      permission_id: 7,
      role_id: 1,
    },
    {
      id: 8,
      permission_id: 8,
      role_id: 1,
    },
    {
      id: 9,
      permission_id: 9,
      role_id: 1,
    },
    {
      id: 10,
      permission_id: 10,
      role_id: 1,
    },
    {
      id: 11,
      permission_id: 11,
      role_id: 1,
    },
    {
      id: 12,
      permission_id: 12,
      role_id: 1,
    },
    {
      id: 13,
      permission_id: 13,
      role_id: 1,
    },
    {
      id: 14,
      permission_id: 14,
      role_id: 1,
    },
    {
      id: 15,
      permission_id: 15,
      role_id: 1,
    },
    {
      id: 16,
      permission_id: 16,
      role_id: 1,
    },
    {
      id: 17,
      permission_id: 17,
      role_id: 1,
    },
    {
      id: 18,
      permission_id: 18,
      role_id: 1,
    },
    {
      id: 19,
      permission_id: 19,
      role_id: 1,
    },
    {
      id: 20,
      permission_id: 20,
      role_id: 1,
    },
    {
      id: 21,
      permission_id: 21,
      role_id: 1,
    },
    {
      id: 22,
      permission_id: 22,
      role_id: 1,
    },
    {
      id: 23,
      permission_id: 23,
      role_id: 1,
    },
    {
      id: 24,
      permission_id: 24,
      role_id: 1,
    },
    {
      id: 25,
      permission_id: 1,
      role_id: 2,
    },
    {
      id: 26,
      permission_id: 3,
      role_id: 2,
    },
    {
      id: 27,
      permission_id: 4,
      role_id: 2,
    },
    {
      id: 28,
      permission_id: 6,
      role_id: 2,
    },
    {
      id: 29,
      permission_id: 7,
      role_id: 2,
    },
    {
      id: 30,
      permission_id: 12,
      role_id: 2,
    },
    {
      id: 31,
      permission_id: 14,
      role_id: 2,
    },
    {
      id: 32,
      permission_id: 15,
      role_id: 2,
    },
    {
      id: 33,
      permission_id: 16,
      role_id: 2,
    },
    {
      id: 34,
      permission_id: 21,
      role_id: 2,
    },
    {
      id: 35,
      permission_id: 24,
      role_id: 2,
    },
  ]);
};
