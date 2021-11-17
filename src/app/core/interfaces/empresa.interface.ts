import { EstadoAcreditacion } from "./estadoacreditacion.interface";

export interface Empresa {
    id: number;
    rut: string;
    razonSocial: string;
    estadoAcreditacionId: string;
    estadoAcreditacion: EstadoAcreditacion;
    activo: boolean;
}