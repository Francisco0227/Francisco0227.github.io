<!-- VideoElemento.svelte -->
<script>
let { id = '' } = $props()
let embedUrl = $derived(`https://www.youtube.com/embed/${id}?rel=0`);

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
