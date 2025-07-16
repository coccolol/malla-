// Definición de materias con estructura completa
const materias = [
  // 1er Año - 1er Cuatrimestre
  { id: "matematica1", nombre: "Matemática", anio: 1, cuatri: 1, corrs: [] },
  { id: "fisica1", nombre: "Física", anio: 1, cuatri: 1, corrs: [] },
  { id: "quimicageneral", nombre: "Química General", anio: 1, cuatri: 1, corrs: [] },

  // 1er Año - 2do Cuatrimestre
  { id: "matematica2", nombre: "Matemática II", anio: 1, cuatri: 2, corrs: ["matematica1"] },
  { id: "fisica2", nombre: "Física II", anio: 1, cuatri: 2, corrs: ["fisica1", "matematica1"] },
  { id: "quimicainorganica", nombre: "Química Inorgánica", anio: 1, cuatri: 2, corrs: ["quimicageneral", "fisica1"] },

  // Agregá acá todas las demás materias siguiendo la misma estructura...
];

// Estado inicial cargado desde localStorage
let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

// Crear la grilla de materias agrupadas por año y cuatrimestre
function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const agrupado = {};
  materias.forEach((m) => {
    const clave = `${m.anio}º Año - ${m.cuatri}º Cuatrimestre`;
    if (!agrupado[clave]) agrupado[clave] = [];
    agrupado[clave].push(m);
  });

  for (const titulo in agrupado) {
    const seccion = document.createElement("div");
    seccion.className = "seccion";

    const encabezado = document.createElement("h3");
    encabezado.textContent = titulo;
    seccion.appendChild(encabezado);

    const grilla = document.createElement("div");
    grilla.className = "grilla";

    agrupado[titulo].forEach((materia) => {
      const btn = document.createElement("button");
      btn.textContent = materia.nombre;
      btn.className = "materia";
      btn.dataset.id = materia.id;

      const estado = estadoMaterias[materia.id];
      if (estado === "aprobada") btn.classList.add("aprobada");
      else if (estado === "regularizada") btn.classList.add("regularizada");

      btn.addEventListener("click", () => cambiarEstado(materia.id, btn));
      grilla.appendChild(btn);
    });

    seccion.appendChild(grilla);
    contenedor.appendChild(seccion);
  }
}

// Cambiar estado al hacer clic
function cambiarEstado(id, boton) {
  const estadoActual = estadoMaterias[id];

  if (!estadoActual) {
    estadoMaterias[id] = "regularizada";
    boton.classList.add("regularizada");
  } else if (estadoActual === "regularizada") {
    estadoMaterias[id] = "aprobada";
    boton.classList.remove("regularizada");
    boton.classList.add("aprobada");
  } else {
    delete estadoMaterias[id];
    boton.classList.remove("regularizada", "aprobada");
  }

  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

// Ejecutar
crearMalla();
