const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userConnect, userDisconnect, saveMessage } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) =>  {
    const [ valido, uid ] = checkJWT( client.handshake.headers['x-token'] )

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }
    
    // Cliente autenticado
    userConnect( uid );

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f298534ad4169714548b785
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
        // TODO: Grabar mensaje
        await saveMessage( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    })
    

    client.on('disconnect', () => {
        userDisconnect(uid);
    });

    

    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
