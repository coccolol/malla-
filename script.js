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

const grid = document.getElementById("grid");

materias.forEach((mat) => {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.innerText = mat.nombre;
  div.addEventListener("click", () => {
    if (div.classList.contains("aprobada")) {
      div.classList.remove("aprobada");
    } else if (div.classList.contains("regularizada")) {
      div.classList.remove("regularizada");
      div.classList.add("aprobada");
    } else {
      div.classList.add("regularizada");
    }
  });
  grid.appendChild(div);
});
