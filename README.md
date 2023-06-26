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

npm install dovtenv --save

npx pm2 init
https://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/#set-your-ecosystem-file

npm install pm2

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

**PERMISSIONS**
_**PERMISSÔES EXISTENTES PARA PENEIRA**_

- 1 update_user - ADM - USER
- 2 index_user - ADM
- 3 create_user

- 4 create_session

- 5 create_role - ADM

- 6 index_product - ADM - USER
- 7 show_product - ADM - USER
- 8 update_product - ADM
- 9 delete_product - ADM
- 10 create_product - ADM

- 11 create_permissions - ADM

- 12 create_order - ADM - USER
- 13 update_order - ADM
- 14 index_order - ADM - USER
- 15 show_order - ADM - USER

- 16 index_ingredients - ADM - USER
- 17 update_ingredient - ADM
- 18 delete_ingredient - ADM
- 19 create_ingredient - ADM
- 20 patch_ingredient - ADM

- 21 index_categories - ADM - USER
- 22 create_category - ADM
- 23 delete_category - ADM
- 24 indexProductsBy_categorie - ADM - USER

user 1 , 3 , 4 , 6 , 7 , 12 , 14 , 15 , 16 , 21 , 24
