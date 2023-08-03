/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      id: 1,
      name: 'Salada Ravanello',
      description:
        'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
      price: '49,97',
      imagePath: 'ed3c1135f89f41c614d9-dishe-1.png',
      category_id: 1,
    },
    {
      id: 2,
      name: 'Spaguetti Gambe',
      description: 'Massa fresca com camarões e pesto.',
      price: '79,97',
      imagePath: '7de04c01f7f1b1bef4db-dishe-3.png',
      category_id: 1,
    },
    {
      id: 3,
      name: 'Torradas de Parma',
      description:
        'Presunto de parma e rúcula em um pão com fermentação natural.',
      price: '25,97',
      imagePath: '0af65aa710d1d8df5c2b-dishe-2.png',
      category_id: 1,
    },
    {
      id: 4,
      name: 'Salada Vegana',
      description:
        ' Folhas verdes crocantes, tomates suculentos, pepinos refrescantes, cenouras raladas e gergelim. ',
      price: '25,97',
      imagePath: '146b8bd273c5d7061a66-dishe-4.png',
      category_id: 1,
    },
    {
      id: 5,
      name: 'Prugna Pie',
      description: 'Torta de ameixa com massa amanteigada, polvilho em açúcar.',
      price: '79,97',
      imagePath: '3faf8f815dcd98434c90-dessert-1.png',
      category_id: 2,
    },
    {
      id: 6,
      name: 'Peachy pastrie',
      description: 'Delicioso folheado de pêssego com folhas de hortelã.',
      price: '32,97',
      imagePath: '6df22d1c3f512a964d97-dessert-2.png',
      category_id: 2,
    },
    {
      id: 7,
      name: 'Macarons',
      description: 'Farinha de amêndoas, manteiga, claras e açúcar.',
      price: '79,97',
      imagePath: '887d06a5fdee9049257d-dessert-3.png',
      category_id: 2,
    },
    {
      id: 8,
      name: 'Bolo de Damasco',
      description: 'Damascos frescos em uma massa sem glúten.',
      price: '19,97',
      imagePath: 'e68a4ba9c13b230b199f-dessert-4.png',
      category_id: 2,
    },
    {
      id: 9,
      name: 'Espresso',
      description: 'Café cremoso feito na temperatura e pressões perfeitas.',
      price: '15,97',
      imagePath: '232b7a66bc67a802b070-drink-2.png',
      category_id: 3,
    },
    {
      id: 10,
      name: 'Suco de maracujá',
      description: 'Suco de maracujá gelado, cremoso, docinho.',
      price: '13,97',
      imagePath: '54b29a6f626b99d97f84-drink-1.png',
      category_id: 3,
    },
    {
      id: 11,
      name: "Tè d'autunno",
      description: 'Chá de anis, canela e limão. Sinta o outono italiano.',
      price: '19,97',
      imagePath: 'ff77e903169e86aa0aab-drink-3.png',
      category_id: 3,
    },
    {
      id: 12,
      name: 'Pomo bourbon',
      description: 'Maçã, whisky, canela. On the rocks.',
      price: '79,97',
      imagePath: '02ac343bdf12220b0915-drink-4.png',
      category_id: 3,
    },
  ]);
};
