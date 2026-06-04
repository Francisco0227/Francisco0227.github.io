// foto-componente.js

class FotoGaleria extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Obtener las fotos desde los atributos o datos internos
    const fotos = JSON.parse(this.getAttribute('fotos') || '[]');
    
    this.shadowRoot.innerHTML = `
      <style>
        .galeria {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* 2 columnas */
          gap: 20px;
          padding: 20px;
        }

        .tarjeta {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .tarjeta img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .descripcion {
          padding: 15px;
          font-family: sans-serif;
          font-size: 14px;
          color: #333;
        }

        @media (max-width: 600px) {
          .galeria {
            grid-template-columns: 1fr; /* 1 columna en móviles */
          }
        }
      </style>

      <div class="galeria">
        ${fotos.map(foto => `
          <div class="tarjeta">
            <img src="${foto.url}" alt="${foto.descripcion}">
            <div class="descripcion">
              <p>${foto.descripcion}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('foto-galeria', FotoGaleria);