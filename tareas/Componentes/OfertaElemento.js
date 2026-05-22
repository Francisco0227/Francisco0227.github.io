const template = document.createElement("template");
template.innerHTML = "<h1>--------</h1><div><h1>Oferta: <span id='nombreOferta'></span></h1></div>";

class OfertaElemento extends HTMLElement {

   constructor() {
    super();
     const shadow = this.attachShadow({ mode: "open" });
     //this.textContent="oferta";
     //this.append(template.content);
     const templateContent = template.content.cloneNode(true);
     shadow.append(templateContent);

     const span = shadow.getElementById('nombreOferta');
     if (span) span.textContent = this.getAttribute("nombre");

    console.log("Constructor ", this);
   }

}

customElements.define("oferta-elemento", OfertaElemento);

