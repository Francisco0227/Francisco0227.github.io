const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/astronomia', async (req, res) => {
    try {
        console.log("Recibí un POST con esta info:", req.body);

        const apiKey = process.env.NASA_API_KEY;

        const respuestaNasa = await fetch(urlNasa);
        
        if (!respuestaNasa.ok) {
            throw new Error(`Error NASA: ${respuestaNasa.status}`);
        }

        const data = await respuestaNasa.json();

        const datosLimpios = {
            titulo: data.title,
            urlImagen: data.url,
            descripcion: data.explanation
        };

        res.json(datosLimpios);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Fallo al procesar la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(` Servidor backend corriendo en http://localhost:${PORT}`);
});