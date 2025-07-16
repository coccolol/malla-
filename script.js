// Definimos las materias con correlatividades (ejemplo simplificado)
const materias = [
  { nombre: "Matemática", anio: 1, cuatri: 1 },
  { nombre: "Física", anio: 1, cuatri: 1 },
  { nombre: "Química General", anio: 1, cuatri: 1 },
  { nombre: "Matemática II", anio: 1, cuatri: 2, correlativas: ["Matemática"] },
  { nombre: "Física II", anio: 1, cuatri: 2, correlativas: ["Física", "Matemática"] },
  { nombre: "Química Inorgánica", anio: 1, cuatri: 2, correlativas: ["Física", "Química General"] },
  { nombre: "Biología", anio: 2, cuatri: 1, correlativas: ["Química General"] },
  { nombre: "Química Orgánica", anio: 2, cuatri: 1, correlativas: ["Química General", "Química Inorgánica"] },
  { nombre: "Química Analítica I", anio: 2, cuatri: 1, correlativas: ["Química General", "Química Inorgánica"] },
  { nombre: "Química Orgánica II", anio: 2, cuatri: 2, correlativas: ["Química Inorgánica", "Química Orgánica"] },
  { nombre: "Química Analítica II", anio: 2, cuatri: 2, correlativas: ["Física II", "Química Analítica I"] },
  { nombre: "Fisicoquímica", anio: 2, cuatri: 2, correlativas: ["Física II", "Química Analítica I"] },
  { nombre: "Bioestadística", anio: 3, cuatri: 1, correlativas: ["Matemática II", "Biología"] },
  { nombre: "Química Biológica I", anio: 3, cuatri: 1, correlativas: ["Biología", "Química Orgánica II", "Química Analítica II", "Fisicoquímica"] },
  { nombre: "Anatomía Humana y Animales de Laboratorio", anio: 3, cuatri: 1, correlativas: ["Biología"] },
  { nombre: "Inglés Técnico", anio: 3, cuatri: 1 },
  { nombre: "Fisiología", anio: 3, cuatri: 2, correlativas: ["Química Biológica I", "Anatomía Humana y Animales de Laboratorio"] },
  { nombre: "Química Biológica II", anio: 3, cuatri: 2, correlativas: ["Anatomía Humana y Animales de Laboratorio", "Química Biológica I"] },
  { nombre: "Histología Normal y Elementos de Histopatología", anio: 3, cuatri: 2, correlativas: ["Anatomía Humana y Animales de Laboratorio"] },
  { nombre: "Informática", anio: 4, cuatri: 1 },
  { nombre: "Microbiología General", anio: 4, cuatri: 1, correlativas: ["Química Biológica I"] },
  { nombre: "Inmunología Básica", anio: 4, cuatri: 1, correlativas: ["Fisiología", "Química Biológica II", "Histología Normal y Elementos de Histopatología"] },
  { nombre: "Biología Celular", anio: 4, cuatri: 2 },
  { nombre: "Elementos de Farmacodinamia", anio: 4, cuatri: 2, correlativas: ["Fisiología"] },
  { nombre: "Inmunología Clínica", anio: 4, cuatri: 2, correlativas: ["Microbiología General", "Inmunología Básica"] },
  { nombre: "Bioquímica Clínica I", anio: 5, cuatri: 1, correlativas: ["Biología Celular", "Inmunología Básica"] },
  { nombre: "Bacteriología", anio: 5, cuatri: 1, correlativas: ["Inmunología Básica", "Elementos de Farmacodinamia"] },
  { nombre: "Bromatología", anio: 5, cuatri: 1, correlativas: ["Microbiología General"] },
  { nombre: "Bioquímica Clínica II", anio: 5, cuatri: 2, correlativas: ["Bioquímica Clínica I"] },
  { nombre: "Virología", anio: 5, cuatri: 2, correlativas: ["Microbiología General", "Inmunología Clínica"] },
  { nombre: "Micología", anio: 5, cuatri: 2, correlativas: ["Inmunología Clínica", "Bacteriología"] },
  { nombre: "Bioquímica Clínica III", anio: 6, cuatri: 1, correlativas: ["Bioquímica Clínica II"] },
  { nombre: "Parasitología", anio: 6, cuatri: 1, correlativas: ["Inmunología Clínica"] },
  { nombre: "Toxicología", anio: 6, cuatri: 1, correlativas: ["Química Biológica II", "Elementos de Farmacodinamia", "Bioquímica Clínica I"] },
  { nombre: "Epistemología y Metodología...", anio: 6, cuatri: 1 },
  { nombre: "Práctica Profesional Supervisada", anio: 6, cuatri: 2, correlativas: ["Bioquímica Clínica II", "Bioquímica Clínica III"] },
];

// Estados posibles para materias
const estados = ['ninguno', 'regularizada', 'aprobada'];

const mallaContainer = document.getElementById('malla-container');

// Guardar estados en localStorage para persistencia
function guardarEstados(estadosMaterias) {
  localStorage.setItem('estadosMaterias', JSON.stringify(estadosMaterias));
}

function cargarEstados() {
  const guardados = localStorage.getItem('estadosMaterias');
  return guardados ? JSON.parse(guardados) : {};
}

// Verifica si las correlativas están aprobadas
function puedeMarcar(materia, estadosMaterias) {
  if (materia.correlativas.length === 0) return true; // Sin correlativas
  return materia.correlativas.every(id => estadosMaterias[id] === 'aprobada');
}

function crearMateriaElemento(materia, estadosMaterias) {
  const div = document.createElement('div');
  div.classList.add('materia');
  div.textContent = materia.nombre;

  // Estado inicial
  const estadoActual = estadosMaterias[materia.id] || 'ninguno';

  if (estadoActual === 'aprobada') {
    div.classList.add('aprobada');
  } else if (estadoActual === 'regularizada') {
    div.classList.add('regularizada');
  }

  // Click para cambiar estado
  div.addEventListener('click', () => {
    // Para aprobar, debe tener correlativas aprobadas
    const estado = estadosMaterias[materia.id] || 'ninguno';
    let siguienteEstado;

    if (estado === 'ninguno') {
      // Primero pasa a regularizada
      siguienteEstado = 'regularizada';
    } else if (estado === 'regularizada') {
      // Si va a aprobar, verifica correlativas
      if (!puedeMarcar(materia, estadosMaterias)) {
        alert(`No puedes aprobar ${materia.nombre} sin aprobar antes sus correlativas.`);
        return;
      }
      siguienteEstado = 'aprobada';
    } else {
      // De aprobado a ninguno (resetea)
      siguienteEstado = 'ninguno';
    }

    estadosMaterias[materia.id] = siguienteEstado;
    guardarEstados(estadosMaterias);
    renderizarMalla();
  });

  return div;
}

function renderizarMalla() {
  mallaContainer.innerHTML = '';
  const estadosMaterias = cargarEstados();

  materias.forEach(materia => {
    const elem = crearMateriaElemento(materia, estadosMaterias);
    // Set clases según estado actualizado
    elem.classList.remove('aprobada', 'regularizada');
    const estado = estadosMaterias[materia.id] || 'ninguno';
    if (estado === 'aprobada') elem.classList.add('aprobada');
    else if (estado === 'regularizada') elem.classList.add('regularizada');

    mallaContainer.appendChild(elem);
  });
}

// Primera renderización
renderizarMalla();

