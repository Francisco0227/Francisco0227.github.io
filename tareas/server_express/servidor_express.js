// Importaciones necesarias
import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para que __dirname funcione con módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// express.static le dice a Express qué carpeta tiene los archivos públicos (imágenes, css)
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
    port: 20902,
    user: "avnadmin",
    password: "AVNS_GJwkU29Bq2KswwA_MOt",
    database: "defaultdb"
});

connection.query('SELECT * FROM donantes;', (error, resultados) => {
    if (error) throw error;
    console.log(resultados);
    connection.end();
});

// ---- RUTAS ----

app.get('/bienvenida', (req, res) => {
    res.send('Esto no es una página html');
});

app.get('/otraBienvenida', (req, res) => {
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});


app.get('/equipo', (req, res)=>{
    res.sendFile(path.join(__dirname, 'equipo.html'))
});


app.get('/opinion', (req, res)=>{
    res.sendFile(path.join(__dirname, 'opinion.html'))
})


// Ruta para JSON de usuarios
app.get('/api/usuarios', (req, res) => {
    const usuarios = [
        { nombre: "Punk", saldo: "0" },
        {nombre: "Rosa", saldo: "20"}
    ];
    res.json(usuarios);
});

app.get('/api/movimientos', (req, res)=>{
    const movimientos = [
        {nombre: 'Punk', tipo: 'Deposito', cantidad: '10'},
        {nombre: 'Rosa', tipo: 'Retiro', cantidad: '5'}
    ];
    res.json(movimientos);
});


app.use((req, res) => {
    res.status(404).send('No lo he podido encontrar :(');
});

app.listen(1984, () => {
    console.log('Servidor Express corriendo en puerto 1984');
});

//Express me ha parecido una herramienta 
// interesante hasta el momento y muy practica 
// tomando en cuenta que no hay que escribir tantas 
// lineas de codigo.