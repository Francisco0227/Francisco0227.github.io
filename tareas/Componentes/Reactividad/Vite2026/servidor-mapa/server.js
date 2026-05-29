const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Usamos el 3001 para que no choque con tu frontend

app.use(cors());

// Nuestro endpoint que enviará las coordenadas al mapa
app.get('/api/ubicaciones', (req, res) => {
    // Simulamos datos que vienen de tu base de datos local
    const puntosEnElMapa = [
        { id: 1, nombre: "Sucursal Centro", lat: 20.659698, lng: -103.349609 },
        { id: 2, nombre: "Punto de Entrega", lat: 20.680000, lng: -103.380000 },
        { id: 3, nombre: "Oficina Norte", lat: 20.700000, lng: -103.400000 }
    ];
    
    res.json(puntosEnElMapa);
});

app.listen(PORT, () => {
    console.log(`📡 Servidor de mapas activo en http://localhost:${PORT}`);
});