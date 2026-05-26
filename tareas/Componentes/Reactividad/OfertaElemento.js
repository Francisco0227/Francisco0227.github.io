const template = document.createElement("template");
template.innerHTML = "<div><h1>Oferta: <span id='nombreOferta'></span></h1></div><input type='text' id='myInput'>";

class OfertaElemento extends HTMLElement {

   constructor() {
    super();
     const shadow = this.attachShadow({ mode: "open" });
     const templateContent = template.content.cloneNode(true);
     shadow.append(templateContent);

     const span = shadow.getElementById('nombreOferta');
     if (span) span.textContent = this.getAttribute("nombre");

     this.input = shadow.querySelector("#myInput");
     
     // CAMBIO: Guardamos referencia al span para usarlo en el evento
     this.span = span; 

     this.input.addEventListener("input", (e) => this.handleInput(e));
   }

   // Ya no necesitas observedAttributes ni attributeChangedCallback para esto

   handleInput(e) {
       console.log("Tecleaste...");
       
       // CAMBIO CRÍTICO (2 líneas): Actualizamos el span directamente con lo escrito
       this.span.textContent = e.target.value; 
       this.setAttribute("value", e.target.value); // Opcional: si necesitas el atributo también
   }

}

customElements.define("oferta-elemento", OfertaElemento);
