import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (data) => {
        console.log('Recibido:'+ data);
       
       
     
        wss.clients.forEach((client) => {
           
            if (client.readyState === 1) { // 1 significa OPEN
                client.send(data.toString());
            }
        });
    });

    ws.on('close', () => console.log('off'));
});

console.log('Supporting each other from wherever we are, according to our skills and abilities to subvert the socio-ecological catastrophe that is well in process, should remain thehighest priority—and really concerns everyone.');