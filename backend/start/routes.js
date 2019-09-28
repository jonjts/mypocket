'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  //User
  Route.post('users', 'UserController.store').validator('User')

  //Sessions
  Route.post('sessions', 'SessionController.store').validator('Session')

  //Check User email
  Route.get('check-user-email/:email', 'ChekUserEmailController.show')

  //Categorias
  Route.get('categorias', 'CategoriaController.get')

}).prefix('api')

//auth...
Route.group(() => {

  Route.delete('sessions', 'SessionController.delete')
  //User
  Route.put('users/:id', 'UserController.update')

  //Password
  Route.put('password/', 'PasswordController.update')

}).prefix('api').middleware('auth')