<script>
import Counter from './lib/Counter.svelte';
import VideoElemento from './lib/VideoElemento.svelte';

let idVideo = $state('CVwZfRO6tbc');

import MiMapa from './lib/MiMapa.svelte';
</script>

<main>
Hola

<h1>Titulo</h1>

<h2>Subtitulos</h2>

<Counter />

<input type="text" bind:value={idVideo} placeholder="Ingresa el ID del video">

<VideoElemento id={idVideo} />

<MiMapa />
</main>