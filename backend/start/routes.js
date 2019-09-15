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

}).prefix('api')

//auth...
Route.group(() => {

  Route.delete('sessions', 'SessionController.delete')

}).prefix('api').middleware('auth')