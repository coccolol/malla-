// Definimos las materias con correlatividades (ejemplo simplificado)
const materias = [
  { id: 'mat1', nombre: 'Química General', correlativas: [] },
  { id: 'mat2', nombre: 'Matemática I', correlativas: [] },
  { id: 'mat3', nombre: 'Física I', correlativas: [] },
  { id: 'mat4', nombre: 'Química Inorgánica', correlativas: ['mat1'] },
  { id: 'mat5', nombre: 'Matemática II', correlativas: ['mat2'] },
  { id: 'mat6', nombre: 'Física II', correlativas: ['mat3'] },
  { id: 'mat7', nombre: 'Biología', correlativas: ['mat1'] },
  { id: 'mat8', nombre: 'Química Orgánica', correlativas: ['mat4'] },
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
