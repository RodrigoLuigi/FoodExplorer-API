npm init -y

npm install express

.editorconfig

npm init @eslint/config

npm install sqlite3 sqlite --save

npm install knex --save

npx knex init

npx knex migrate:make "nome da migrate"

npm install express-async-errors --save

npm install multer

npm install bcryptjs

npm install jsonwebtoken

npm install cors

**importante TO-DO-LIST**
ajustar permissões de acesso às rotas
verificar como é feito o cadastro das 'roles'
refatorar UserRoleCreateService.js
refatorar UserCreateService.js
refatorar UserUpdateService.js

**COMPLETE TASK**

- implements CORS in server.js
- feat: create sessions service
- fix: correcting bug in UserRoleCreateService.js
- fix: correcting bug in UserCreateService.js
- feat: implements error handling in UserUpdateService.js
- feat: create function findById on RoleRepository.js
- refactor: adjust function update on UserRepository.js
- feat: create function showUserRole on UserRoleRepository.js
- refactor: ajusts semantic on function create at UserRoleRepository.js
- refactor: implements dependency injection on SessiosController.js
- refactor: rename 'roles' to 'role' in function Create
