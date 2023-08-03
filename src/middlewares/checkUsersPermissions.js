const knex = require('../database/knex');

async function getUser(request) {
  const user_id = request.user.id;

  const user = await knex('users').where({
    id: user_id,
  });

  const roles = await knex('user_roles')
    .select(['roles.id', 'roles.name', 'roles.description'])
    .where('user_roles.user_id', user_id)
    .innerJoin('roles', 'roles.id', 'user_roles.role_id');

  return {
    ...user,
    roles,
  };
}

function is(role) {
  const roleAuthorized = async (request, response, next) => {
    const user = await getUser(request);

    const userRoles = user.roles.map((role) => role.name);

    const existsRoles = userRoles.some((r) => role.includes(r));

    if (existsRoles) {
      return next();
    }

    return response.status(401).json({
      message: 'Not authorized!',
    });
  };

  return roleAuthorized;
}

module.exports = is;
