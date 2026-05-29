<script>
    import { onMount } from 'svelte';
    import * as L from 'leaflet';

    // Referencia al contenedor HTML donde vivirá el mapa
    let mapContainer;
    let mapa;

    onMount(async () => {
        // 1. Inicializamos el mapa y lo centramos en unas coordenadas iniciales (zoom nivel 12)
        mapa = L.map(mapContainer).setView([20.659698, -103.349609], 12);

        // 2. Agregamos la "piel" visual del mapa usando OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapa);

        // 3. Consumimos los datos de nuestro propio servidor local
        try {
            const respuesta = await fetch('http://localhost:3001/api/ubicaciones');
            const datosServidor = await respuesta.json();

            // 4. Iteramos sobre los datos e inyectamos un pin (marker) por cada uno
            datosServidor.forEach(ubicacion => {
                L.marker([ubicacion.lat, ubicacion.lng])
                 .addTo(mapa)
                 .bindPopup(`<b>${ubicacion.nombre}</b>`); // Pequeño globo de texto al hacer clic
            });

        } catch (error) {
            console.error("Error conectando con el servidor local:", error);
        }

        // Función de limpieza: destruye el mapa si cambiamos de página
        return () => {
            mapa.remove();
        };
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div class="contenedor-mapa" bind:this={mapContainer}></div>

<style>
    .contenedor-mapa {
        height: 500px;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1; /* Previene que el mapa se sobreponga a otros menús */
    }
</style>