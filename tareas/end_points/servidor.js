import http from 'http';

// ---- DATOS -
const tiendas = {
    amazon: 5,
    temu: 8,
    shein: 10,
    walmart: 3,
    mercadolibre: 6
};

const limites = {
    punk: 0,
    peter: 5000,
    david: 12000
};

const cupones = {
    A1234: 15,
    B4892: 23,
    C329048: 50
}

// ---- ENDPOINTS ----

// ENDPOINT 1: GET /api/convenio?tienda=amazon
function getConvenio(req, res) {
    // leer parametros
    const urlObj = new URL(req.url, 'http://localhost');
    const tienda = urlObj.searchParams.get('tienda');

    // Si no mandaron el parámetro tienda
    if (!tienda) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Falta el parámetro tienda' }));
        return;
    }

    const cashback = tiendas[tienda.toLowerCase()];

    // Si la tienda no existe en nuestra lista
    if (!cashback) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Tienda no encontrada' }));
        return;
    }

    // Todo salió bien
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        tienda: tienda,
        cashback: `${cashback}%`
    }));
}

// ENDPOINT 2: GET /api/limite?nombre=peter
function getLimite(req, res) {
    const urlObj = new URL(req.url, 'http://localhost');
    const nombre = urlObj.searchParams.get('nombre');

    if (!nombre) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Falta el parámetro nombre'}));
        return;
    }

    const limiteCredito = limites[nombre.toLowerCase()];

    if (!limiteCredito){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'limite de credito no encontrado'}));
        return; 
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        nombre: nombre,
        limiteCredito: `$${limiteCredito}` 
    }));
}

// ENDPOINT 3: POST /api/registro
function registrarUsuario(req, res) {
    let body = '';

    req.on('data', (chunk)=> {
        body += chunk;
    });

    req.on('end', () => {
        const datos = JSON.parse(body);

        const correo = datos.correo;
        const contrasena = datos.contrasena;

        if (!correo || !contrasena){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Falta correo o contraseña'}));
            return;
        }

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            mensaje: 'Usuario creado con exito',
            usuario: {correo} 
        }));
    });
}

// ENDPOINT 4: POST /api/pago
function realizarPago(req, res) {
    let body = '';

    req.on('data', (chunk) =>{
        body += chunk;
    });

    req.on('end', ()=>{
        const datos = JSON.parse(body);

        const tienda = datos.tienda;
        const cantidad = datos.cantidad;
        const producto = datos.producto;

        if (!tienda || !cantidad || !producto){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error:'No se encontraron todos los datos'}));
            return;
        }

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            mensaje: 'Pago realizado exitosamente',
            monto: {cantidad}
        }))
    })
}

// MIS DOS ENDPOINTS
// ENDPOINT 5: POST /api/v1/cuentas  (acceder a cuenta)
function accederCuenta(req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () =>{
        const datos = JSON.parse(body);

        const email = datos.email;
        const contrasena = datos.contrasena;

        if (!email || !contrasena){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end (JSON.stringify({
                error: 'hace falta email o contrasena'
            }));
            return;
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            mensaje: 'Entraste a tu cuenta exitosamente'
        }))
    })
}

// ENDPOINT 6: GET /api/v1/cupones
function getCupones(req, res) {
    const urlObj = new URL(req.url, 'http://localhost');
    const cupon = urlObj.searchParams.get('cupon');

    if (!cupon){
        res.writeHead (400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            error: 'Falta parametro cupon'
        }));
        return;
    }

    const porcentaje_descuento = cupones[cupon];

    if (!porcentaje_descuento) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end (JSON.stringify({
            error: 'No es un cupon valido'
        }));
        return
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        cupon: cupon,
        porcentaje_descuento: `${porcentaje_descuento}%`
        
    }));

}


// ---- SERVIDOR ----
const servidor = http.createServer((req, res) => {
    const url = req.url;
    const metodo = req.method;

    if (url.startsWith('/api/convenio') && metodo === 'GET') {
        getConvenio(req, res);
    } else if (url.startsWith('/api/limite') && metodo === 'GET') {
        getLimite(req, res);
    } else if (url === '/api/registro' && metodo === 'POST') {
        registrarUsuario(req, res);
    } else if (url === '/api/pago' && metodo === 'POST') {
        realizarPago(req, res);
    } else if (url === '/api/v1/cuentas' && metodo === 'POST') {
        accederCuenta(req, res);
    } else if (url.startsWith('/api/v1/cupones') && metodo === 'GET') {
        getCupones(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
});

const puerto = 1984;
servidor.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});