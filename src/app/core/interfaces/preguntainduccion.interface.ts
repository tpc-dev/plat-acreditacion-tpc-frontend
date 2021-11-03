export interface PreguntaInduccion {
    id: number;
    pregunta: string;
    alternativas: Array<AlternativasInduccion>
}

interface AlternativasInduccion {
    id: string;
    nombre: string;
}