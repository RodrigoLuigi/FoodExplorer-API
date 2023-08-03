/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('permissions').del();
  await knex('permissions').insert([
    {
      id: 1,
      name: 'update_user',
      description: 'Update user',
    },
    {
      id: 2,
      name: 'index_users',
      description: 'Index users',
    },
    {
      id: 3,
      name: 'create_user',
      description: 'Create user',
    },
    {
      id: 4,
      name: 'create_session',
      description: 'Create session',
    },
    {
      id: 5,
      name: 'create_role',
      description: 'Create role',
    },
    {
      id: 6,
      name: 'index_products',
      description: 'Index products',
    },
    {
      id: 7,
      name: 'show_product',
      description: 'Show product',
    },
    {
      id: 8,
      name: 'update_product',
      description: 'Update product',
    },
    {
      id: 9,
      name: 'delete_product',
      description: 'D product',
    },
    {
      id: 10,
      name: 'create_product',
      description: 'Create product',
    },
    {
      id: 11,
      name: 'create_permissions',
      description: 'Create permissions',
    },
    {
      id: 12,
      name: 'create_order',
      description: 'Create permissions',
    },
    {
      id: 13,
      name: 'update_order',
      description: 'Update order',
    },
    {
      id: 14,
      name: 'index_order',
      description: 'Index order',
    },
    {
      id: 15,
      name: 'show_order',
      description: 'Show order',
    },
    {
      id: 16,
      name: 'index_ingredients',
      description: 'Index ingredients',
    },
    {
      id: 17,
      name: 'update_ingredients',
      description: 'Update ingredient',
    },
    {
      id: 18,
      name: 'delete_ingredient',
      description: 'Delete ingredient',
    },
    {
      id: 19,
      name: 'create_ingredient',
      description: 'Create ingredient',
    },
    {
      id: 20,
      name: 'patch_ingredient',
      description: 'Patch ingredient image',
    },
    {
      id: 21,
      name: 'index_categories',
      description: 'Index categories',
    },
    {
      id: 22,
      name: 'create_categorie',
      description: 'Create categories',
    },
    {
      id: 23,
      name: 'delete_category',
      description: 'Delete category',
    },
    {
      id: 24,
      name: 'indexProductsBy_categories',
      description: 'Index products by categories',
    },
  ]);
};
