// Base de datos panamericana de Enciclonario Americano
const database = [
  // --- ARTÍCULOS ENCICLOPÉDICOS ---
  {
    id: 1,
    mode: "wiki",
    country: "uru",
    title: "Río de la Plata",
    category: "Geografía e Hidrografía",
    body: "Estuario del cono sur de América formado por la confluencia de los ríos Paraná y Uruguay. Representa la frontera fluvial entre Uruguay y Argentina y constituye una vía de navegación de vital importancia continental."
  },
  {
    id: 2,
    mode: "wiki",
    country: "arg",
    title: "Cordillera de los Andes",
    category: "Geografía Continental",
    body: "Extensa cadena montañosa que bordea la costa occidental de América del Sur. Alberga una gigantesca biodiversidad, glaciares estratégicos y los picos más elevados del continente, como el Aconcagua."
  },
  {
    id: 3,
    mode: "wiki",
    country: "mex",
    title: "Cultura Maya",
    category: "Historia Precolombina",
    body: "Civilización mesoamericana célebre por haber desarrollado uno de los sistemas de escritura más avanzados de las Américas precolombinas, además de impresionantes avances en arquitectura, matemáticas y astronomía."
  },
  {
    id: 4,
    mode: "wiki",
    country: "col",
    title: "Río Amazonas",
    category: "Geografía y Naturaleza",
    body: "El río más caudaloso y largo del planeta, cuyo cuenca hidrográfica alberga el bosque tropical más extenso de la Tierra. Cruza gran parte de América del Sur alimentando una inmensa riqueza biológica."
  },
  {
    id: 5,
    mode: "wiki",
    country: "per",
    title: "Machu Picchu",
    category: "Arqueología e Historia",
    body: "Antigua ciudadela inca construida a mediados del siglo XV en la cresta de una montaña en los Andes peruanos. Es considerada una obra maestra de la arquitectura e ingeniería incaica."
  },
  {
    id: 6,
    mode: "wiki",
    country: "chi",
    title: "Desierto de Atacama",
    category: "Geografía y Astronomía",
    body: "Ubicado en el norte de Chile, es reconocido como el desierto no polar más árido de la Tierra. Gracias a sus cielos despejados, aloja los observatorios astronómicos más potentes del mundo."
  },
  {
    id: 7,
    mode: "wiki",
    country: "ven",
    title: "Salto Ángel",
    category: "Geografía y Paisajes",
    body: "La caída de agua ininterrumpida más alta del mundo, con una altura de 979 metros. Se localiza en el Parque Nacional Canaima, sobre la meseta del Auyantepuy en Venezuela."
  },
  {
    id: 8,
    mode: "wiki",
    country: "ecu",
    title: "Islas Galápagos",
    category: "Biodiversidad y Ecología",
    body: "Archipiélago volcánico del océano Pacífico perteneciente a Ecuador. Famoso por su amplia variedad de especies endémicas que sirvieron de base para la teoría de la evolución de Charles Darwin."
  },

  // --- DICCIONARIO HISPANOAMERICANO ---
  {
    id: 101,
    mode: "rae",
    country: "uru",
    title: "Bo",
    category: "interj. urug. coloq.",
    body: "1. Vocativo utilizado para dirigirse cordialmente a una persona o llamar su atención. Usado frecuentemente de forma equivalente a 'che'."
  },
  {
    id: 102,
    mode: "rae",
    country: "arg",
    title: "Che",
    category: "interj. arg. y urug. coloq.",
    body: "1. Expresión afectuosa que se emplea para llamar la atención de un interlocutor, saludar o enfatizar una frase entre amigos o conocidos."
  },
  {
    id: 103,
    mode: "rae",
    country: "mex",
    title: "Chavo, va",
    category: "sust. m. y f. mex. coloq.",
    body: "1. Persona joven, niño o adolescente. Utilizado habitualmente en el habla cotidiana e infantil en México."
  },
  {
    id: 104,
    mode: "rae",
    country: "col",
    title: "Parce / Parcero, ra",
    category: "sust. m. y f. col. coloq.",
    body: "1. Amigo entrañable, compañero de clases o conocido cercano. Modismo de uso muy extendido en toda Colombia."
  },
  {
    id: 105,
    mode: "rae",
    country: "per",
    title: "Pata",
    category: "sust. m. y f. per. coloq.",
    body: "1. Amigo cercano o compañero. En el registro coloquial peruano equivale a 'amigo' o 'camarada'."
  },
  {
    id: 106,
    mode: "rae",
    country: "chi",
    title: "Pololo, la",
    category: "sust. m. y f. chi. coloq.",
    body: "1. Novio o novia informal. Persona con la que se mantiene una relación de noviazgo o afinidad afectiva."
  }
];

let currentMode = 'wiki';

// Cambiar de sección desde el menú
function setMode(mode) {
  currentMode = mode;
  document.getElementById('btnWiki').classList.toggle('active', mode === 'wiki');
  document.getElementById('btnRae').classList.toggle('active', mode === 'rae');

  const titleEl = document.getElementById('sectionTitle');
  const descEl = document.getElementById('sectionDescription');

  if (mode === 'wiki') {
    titleEl.textContent = 'Enciclopedia de América';
    descEl.textContent = 'Artículos didácticos y detallados sobre geografía, historia, símbolos y culturas del continente.';
  } else {
    titleEl.textContent = 'Diccionario Hispanoamericano';
    descEl.textContent = 'Definiciones léxicas, modismos y expresiones propias de los países de habla hispana aprobadas para uso educativo.';
  }

  filterContent();
}

// Filtrado de búsquedas y países
function filterContent() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const selectedCountry = document.getElementById('countrySelect').value;
  const grid = document.getElementById('contentGrid');

  grid.innerHTML = '';

  const filtered = database.filter(item => {
    const matchesMode = item.mode === currentMode;
    const matchesCountry = selectedCountry === 'todos' || item.country === selectedCountry;
    const matchesSearch = item.title.toLowerCase().includes(query) ||
                          item.body.toLowerCase().includes(query) ||
                          item.category.toLowerCase().includes(query);

    return matchesMode && matchesCountry && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: #54595d; font-style: italic; padding: 20px;">No se encontraron artículos ni definiciones coincidentes con los filtros seleccionados.</p>';
    return;
  }

  const countryNames = {
    uru: 'Uruguay',
    arg: 'Argentina',
    mex: 'México',
    col: 'Colombia',
    per: 'Perú',
    chi: 'Chile',
    ven: 'Venezuela',
    ecu: 'Ecuador',
    bol: 'Bolivia',
    cam: 'Centroamérica y Caribe'
  };

  filtered.forEach(item => {
    const card = document.createElement('article');
    const isWiki = item.mode === 'wiki';
    
    card.className = `entry-card ${isWiki ? 'wiki' : 'rae'}`;

    const countryLabel = countryNames[item.country] || 'América';

    card.innerHTML = `
      <div class="card-top">
        <h3 class="card-title">${item.title}</h3>
        <span class="country-tag">${countryLabel}</span>
      </div>
      <div class="card-category">${item.category}</div>
      <p class="card-body">${item.body}</p>
    `;

    grid.appendChild(card);
  });
}

// Modal informativo del pie de página
function openAboutModal() {
  document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
  document.getElementById('aboutModal').classList.remove('active');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('aboutModal');
  if (e.target === modal) {
    closeAboutModal();
  }
});

// Carga inicial
filterContent();