const Route = use('Route')

Route.group(() => {
    Route.post('/sessions', 'Security/SessionController.store').validator('Session');
}).prefix('/api/')
