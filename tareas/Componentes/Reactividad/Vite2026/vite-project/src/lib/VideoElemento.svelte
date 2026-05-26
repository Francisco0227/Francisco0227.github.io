<!-- VideoElemento.svelte -->
<script>
  // 1. Definimos la propiedad que recibirá el ID del video
  export let id = '';
  
  // Construímos la URL completa del video
  const embedUrl = `https://www.youtube.com/embed/${id}?rel=0`;
</script>

<div class="video-container">
  <iframe 
    src={embedUrl} 
    title="YouTube video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
  >
  </iframe>
</div>
