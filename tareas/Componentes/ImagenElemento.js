const template = document.createElement("template");
// Estructura simple: Un título y la imagen
template.innerHTML = `
  <h1>Imagen: <span id='tituloImagen'></span></h1>
  <div>
    <img 
      id='miImagen' 
      width="560" 
      height="315" 
      alt="Imagen cargada desde componentes"
      style="object-fit: cover;"
    />
  </div>
`;

class ImagenElemento extends HTMLElement {
  constructor() {
    super();
    
    // 1. Crear el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });
    
    // 2. Clonar el contenido de la plantilla
    const templateContent = template.content.cloneNode(true);
    shadow.append(templateContent);

    // 3. Obtener el atributo 'url' de la imagen (o 'fuente', como prefieras)
    // Ejemplo de uso: <imagen-elemento url="https://ejemplo.com/foto.jpg"></imagen-elemento>
    const urlImagen = this.getAttribute("url");
    
    // 4. Configurar la etiqueta img con la URL obtenida
    const img = shadow.getElementById('miImagen');
    if (img && urlImagen) {
      img.src = urlImagen;
    }

    // 5. Poner un título dinámico
    const spanTitulo = shadow.getElementById('tituloImagen');
    if (spanTitulo) {
        // Mostramos la URL o un texto genérico si no hay atributo
        spanTitulo.textContent = urlImagen ? "Cargada desde URL" : "Sin URL";
    }

    console.log("Constructor ImagenElemento ", this);
  }
}

// 6. Definir el componente
customElements.define("imagen-elemento", ImagenElemento);