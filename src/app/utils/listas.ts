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

export function ordenarString(paises: string[]): string[] {
  return paises.sort((a, b) => {
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