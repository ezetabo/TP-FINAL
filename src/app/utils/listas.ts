import { CronogramaAtencion } from "../interface/cronograma-atencion.interface";
import { CronogramaEspecialista, Dia, Fecha, Hora } from "../interface/horario-laboral.interface";
import { Lista } from "../interface/listas.interface";
import { UsuarioGral } from "../interface/usuario-gral.interface";

export function getEspecialidad(): string[] {

  return [
    'Alergologia',
    'Anestesiologia',
    'Angiologia',
    'Cardiologia',
    'Endocrinologia',
    'Estomatologia',
    'Farmacologia Clinica',
    'Gastroenterologia',
    'Genetica',
    'Geriatria',
    'Hematologia',
    'Hepatologia',
    'Infectologia',
    'Medicina aeroespacial',
    'Medicina del deporte',
    'Medicina familiar y comunitaria',
    'Medicina fisica y rehabilitación',
    'Medicina forense',
    'Medicina intensiva',
    'Medicina interna',
    'Medicina preventiva y salud publica',
    'Medicina del trabajo',
    'Nefrologia',
    'Neumologia',
    'Neurologia',
    'Nutriologia',
    'Oncologia medica',
    'Oncologia radioterapica',
    'Pediatria',
    'Psiquiatria',
    'Reumatologia',
    'Toxicologia',
  ];
}

export function getObrasSociales(): string[] {
  return [
    'OSDE',
    'SWISS MEDICAL',
    'MEDIFE',
    'GALENO',
    'OMINT',
    'MEDICUS',
    'APSOT',
    'WILLIAM HOPE',
    'SIMECO',
    'SANCOR SALUD',
    'STAFF MEDICO',
    'COLEGIO DE ESCRIBANOS',
    'ELEVAR',
    'OBRA SOCIAL PODER JUDICIAL',
    'PREVENCION SALUD',
    'OSSEG',
    'OSPIC',
    'OSPESA',
    'OSSIMRA',
    'AVALIAN',
    'OSDIPP',
    'TV SALUD',
    'OPDEA',
    'SADAIC',
    'HOMINIS',
    'COMEDICA',
    'SYGMA',
  ];
}

export function ordenarString(palabras: string[]): string[] {
  return palabras.sort((a, b) => {
    const A = (a && a[0]) ? a[0].toLowerCase() : '';
    const B = (b && b[0]) ? b[0].toLowerCase() : '';

    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
}

export function ordenarLista(palabras: Lista[]): Lista[] {
  return palabras.sort((a, b) => {
    const A = (a && a.nombre) ? a.nombre.toLowerCase() : '';
    const B = (b && b.nombre) ? b.nombre.toLowerCase() : '';

    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
}

export function sortByApellido(usuarios: UsuarioGral[]): UsuarioGral[] {
  return usuarios.sort((a, b) => {
    const A = (a && a.Apellido) ? a.Apellido.toLowerCase() : '';
    const B = (b && b.Apellido) ? b.Apellido.toLowerCase() : '';
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
}

export function validarHoras(horaInicio: Hora, horaFin: Hora): boolean {
  const horaInicioParts = horaInicio.split(':');
  const horaFinParts = horaFin.split(':');
  const horaInicioNum = parseInt(horaInicioParts[0]);
  const minutosInicioNum = parseInt(horaInicioParts[1]);
  const horaFinNum = parseInt(horaFinParts[0]);
  const minutosFinNum = parseInt(horaFinParts[1]);
  if (horaInicioNum < horaFinNum) {
    return true;
  } else if (horaInicioNum === horaFinNum && minutosInicioNum < minutosFinNum) {
    return true;
  }
  return false;
}


export function obtenerFechaActual(aumento: number = 0): Fecha {
  const diasSemana: Dia[] = [Dia.domingo, Dia.lunes, Dia.martes, Dia.miercoles, Dia.jueves, Dia.viernes, Dia.sabado];
  const opcionesFecha: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + aumento);
  const numeroDiaSemana = fechaActual.getDay();
  const fecha = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
  return {
    dia: diasSemana[numeroDiaSemana],
    fecha: fecha
  };
}

export function ordenarCronograma(cronogramas: CronogramaAtencion[]): CronogramaAtencion[] {
  return cronogramas.sort((crono1, crono2) => {
    const fecha1 = parsearFecha(crono1.fecha.fecha);
    const fecha2 = parsearFecha(crono2.fecha.fecha);
    return fecha1.getTime() - fecha2.getTime();
  });
}

export function ordenarEspecialistas(cronogramas: CronogramaEspecialista[]): CronogramaEspecialista[] {
  return cronogramas.sort((a, b) => {
    const A = (a && a.especialista.Apellido) ? a.especialista.Apellido.toLowerCase() : '';
    const B = (b && b.especialista.Apellido) ? b.especialista.Apellido.toLowerCase() : '';

    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
}

export function esFechaVieja(fecha: string): boolean {
  const fechaParametro = parsearFecha(fecha);
  const fechaActual = new Date();

  return fechaParametro.getTime() < fechaActual.getTime();
}

function parsearFecha(fechaString: string): Date {
  const [dia, mes, ano] = fechaString.split('/').map(Number);

  const fechaParseada = new Date(ano + 2000, mes - 1, dia);
  return fechaParseada;
}



export function crearRotador(array: any[]) {
  let currentIndex = 0;

  function rotarArray() {
    currentIndex = (currentIndex + 1) % array.length;
  }

  function elementoActual() {
    return array[currentIndex];
  }

  return {
    rotar: rotarArray,
    obtenerElementoActual: elementoActual,
  };
}

// const miArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// const rotador = crearRotador(miArray);

// setInterval(() => {
//   rotador.rotar();
//   console.log('Elemento actual:', rotador.obtenerElementoActual());
// }, 1000);
