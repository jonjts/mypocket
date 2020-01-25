const Route = use('Route')

Route.group(() => {
    //User
    Route.post('users', 'Security/UserController.store').validator('User')
    //Check User email
    Route.get('users/emails/:email', 'Security/ChekUserEmailController.show')    
    //Tipos
    Route.get('tipos', 'TipoController.get')

}).prefix('api')

Route.group(() => {

    Route.delete('sessions', 'SessionController.delete')
    //User
    Route.put('users/:id', 'UserController.update')
    //Password
    Route.put('password/', 'PasswordController.update')
    //Itens
    Route.get('users/:id/itens', 'Financial/ItemController.index').middleware('userInParam')
    Route.post('users/:id/itens', 'Financial/ItemController.store')
        .validator('Item').middleware('userInParam')

}).prefix('api').middleware('auth')