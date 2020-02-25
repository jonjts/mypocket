const Route = use('Route')

Route.group(() => {
    //User
    Route.post('users', 'Security/UserController.store').validator('User')
    //Check User email
    Route.get('users/emails/:email', 'Security/ChekUserEmailController.show')
}).prefix('api')

Route.group(() => {

    Route.delete('sessions', 'Security/SessionController.delete')
    //User
    Route.put('users/:id', 'Security/UserController.update')
    //Password
    Route.put('password/', 'Security/PasswordController.update')
    //Itens
    Route.get('users/:id/itens', 'Financial/ItemController.index').middleware('userInParam')
    Route.post('users/:user_id/itens', 'Financial/ItemController.store').validator('Item').middleware('userInParam')
    Route.put('users/:user_id/itens/:id', 'Financial/ItemController.update').validator('Item').middleware('userInParam')
    Route.delete('users/:user_id/itens/:id', 'Financial/ItemController.delete').middleware('userInParam')

}).prefix('api').middleware('auth')