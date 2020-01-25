const Route = use('Route')

Route.group(() => {
    Route.get('/categorias', 'Common/CategoriaController.index')
}).prefix('api')