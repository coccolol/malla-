const materias = [
  // --- 1er Año - 1er Cuatrimestre ---
  {
    nombre: "Química General",
    id: "quimica-general",
    anio: 1,
    cuatrimestre: 1,
    correlativas: []
  },
  {
    nombre: "Matemática I",
    id: "matematica-1",
    anio: 1,
    cuatrimestre: 1,
    correlativas: []
  },
  {
    nombre: "Física I",
    id: "fisica-1",
    anio: 1,
    cuatrimestre: 1,
    correlativas: []
  },

  // --- 1er Año - 2do Cuatrimestre ---
  {
    nombre: "Química Inorgánica",
    id: "quimica-inorganica",
    anio: 1,
    cuatrimestre: 2,
    correlativas: ["quimica-general"]
  },
  {
    nombre: "Biología Celular",
    id: "biologia-celular",
    anio: 1,
    cuatrimestre: 2,
    correlativas: []
  },
  {
    nombre: "Matemática II",
    id: "matematica-2",
    anio: 1,
    cuatrimestre: 2,
    correlativas: ["matematica-1"]
  },

  // --- 2do Año - 1er Cuatrimestre ---
  {
    nombre: "Química Orgánica I",
    id: "quimica-organica-1",
    anio: 2,
    cuatrimestre: 1,
    correlativas: ["quimica-general", "quimica-inorganica"]
  },
  {
    nombre: "Física II",
    id: "fisica-2",
    anio: 2,
    cuatrimestre: 1,
    correlativas: ["fisica-1"]
  },
  {
    nombre: "Estadística y Diseño Experimental",
    id: "estadistica",
    anio: 2,
    cuatrimestre: 1,
    correlativas: ["matematica-2"]
  },

  // --- 2do Año - 2do Cuatrimestre ---
  {
    nombre: "Química Orgánica II",
    id: "quimica-organica-2",
    anio: 2,
    cuatrimestre: 2,
    correlativas: ["quimica-organica-1"]
  },
  {
    nombre: "Fisicoquímica",
    id: "fisicoquimica",
    anio: 2,
    cuatrimestre: 2,
    correlativas: ["quimica-inorganica", "fisica-2"]
  },
  {
    nombre: "Biología Molecular y Celular",
    id: "biologia-molecular",
    anio: 2,
    cuatrimestre: 2,
    correlativas: ["biologia-celular"]
  },

  // --- 3er Año - 1er Cuatrimestre ---
  {
    nombre: "Microbiología General",
    id: "microbiologia",
    anio: 3,
    cuatrimestre: 1,
    correlativas: ["biologia-molecular"]
  },
  {
    nombre: "Química Biológica I",
    id: "quimica-biologica-1",
    anio: 3,
    cuatrimestre: 1,
    correlativas: ["quimica-organica-2", "biologia-molecular"]
  },
  {
    nombre: "Instrumental I",
    id: "instrumental-1",
    anio: 3,
    cuatrimestre: 1,
    correlativas: ["fisicoquimica"]
  },

  // --- 3er Año - 2do Cuatrimestre ---
  {
    nombre: "Inmunología",
    id: "inmunologia",
    anio: 3,
    cuatrimestre: 2,
    correlativas: ["quimica-biologica-1"]
  },
  {
    nombre: "Química Biológica II",
    id: "quimica-biologica-2",
    anio: 3,
    cuatrimestre: 2,
    correlativas: ["quimica-biologica-1"]
  },
  {
    nombre: "Bromatología",
    id: "bromatologia",
    anio: 3,
    cuatrimestre: 2,
    correlativas: ["quimica-biologica-1"]
  },

  // --- 4to Año - 1er Cuatrimestre ---
  {
    nombre: "Farmacología",
    id: "farmacologia",
    anio: 4,
    cuatrimestre: 1,
    correlativas: ["quimica-biologica-2"]
  },
  {
    nombre: "Fisiología",
    id: "fisiologia",
    anio: 4,
    cuatrimestre: 1,
    correlativas: ["quimica-biologica-2"]
  },
  {
    nombre: "Instrumental II",
    id: "instrumental-2",
    anio: 4,
    cuatrimestre: 1,
    correlativas: ["instrumental-1"]
  },

  // --- 4to Año - 2do Cuatrimestre ---
  {
    nombre: "Toxicología",
    id: "toxicologia",
    anio: 4,
    cuatrimestre: 2,
    correlativas: ["quimica-biologica-2", "farmacologia"]
  },
  {
    nombre: "Endocrinología",
    id: "endocrinologia",
    anio: 4,
    cuatrimestre: 2,
    correlativas: ["fisiologia"]
  },
  {
    nombre: "Legislación y Deontología",
    id: "legislacion",
    anio: 4,
    cuatrimestre: 2,
    correlativas: []
  },

  // --- 5to Año ---
  {
    nombre: "Bioquímica Clínica",
    id: "bioquimica-clinica",
    anio: 5,
    cuatrimestre: 1,
    correlativas: ["toxicologia", "endocrinologia"]
  },
  {
    nombre: "Trabajo Final",
    id: "trabajo-final",
    anio: 5,
    cuatrimestre: 2,
    correlativas: ["bioquimica-clinica"]
  }
];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let anio = 1; anio <= 5; anio++) {
    for (let cuatri = 1; cuatri <= 2; cuatri++) {
      const materiasCuatri = materias.filter(
        (m) => m.anio === anio && m.cuatrimestre === cuatri
      );
      if (materiasCuatri.length > 0) {
        const bloque = document.createElement("div");
        bloque.className = "bloque-anio";
        bloque.innerHTML = `<h2>${anio}° Año - ${cuatri}° Cuatrimestre</h2>`;
        materiasCuatri.forEach((materia) => {
          const card = crearTarjetaMateria(materia);
          bloque.appendChild(card);
        });
        contenedor.appendChild(bloque);
      }
    }
  }
}

function crearTarjetaMateria(materia) {
  const card = document.createElement("div");
  card.className = "materia";
  card.id = materia.id;

  const titulo = document.createElement("h3");
  titulo.textContent = materia.nombre;

  const regularizada = document.createElement("input");
  regularizada.type = "checkbox";
  regularizada.id = `${materia.id}-reg`;
  regularizada.addEventListener("change", () => actualizarEstado(materia.id));

  const aprobada = document.createElement("input");
  aprobada.type = "checkbox";
  aprobada.id = `${materia.id}-apr`;
  aprobada.addEventListener("change", () => actualizarEstado(materia.id));

  const labelR = document.createElement("label");
  labelR.htmlFor = regularizada.id;
  labelR.textContent = "Reg.";

  const labelA = document.createElement("label");
  labelA.htmlFor = aprobada.id;
  labelA.textContent = "Apr.";

  card.appendChild(titulo);
  card.appendChild(regularizada);
  card.appendChild(labelR);
  card.appendChild(aprobada);
  card.appendChild(labelA);

  return card;
}

function actualizarEstado(id) {
  const materia = materias.find((m) => m.id === id);
  const reg = document.getElementById(`${id}-reg`);
  const apr = document.getElementById(`${id}-apr`);

  const puedeAprobar = materia.correlativas.every((correlativaId) => {
    const checkAprobada = document.getElementById(`${correlativaId}-apr`);
    return checkAprobada && checkAprobada.checked;
  });

  if (apr.checked && !puedeAprobar) {
    alert("No podés marcar esta materia como aprobada sin cumplir sus correlativas.");
    apr.checked = false;
  }
}

document.addEventListener("DOMContentLoaded", crearMalla);
