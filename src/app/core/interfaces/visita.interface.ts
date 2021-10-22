export interface Visita {
    id?: number;
    nombre: string;
    apellido: string;
    rut: string;
    usuarioid: number;
    comentario: string;
    haIngreso?: boolean;
    fechavisita: Date;
}