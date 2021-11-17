import { Empresa } from "./empresa.interface";

export interface Cuenta {
    token: string,
    expiracion: string,
    usuario: Usuario;
}

export interface Usuario {
    id?: number;
    activo: boolean;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    telefono: string;
    tipoRolId?: number;
    empresaId?: number;
    empresa?: Empresa;
    rut: string;
    tipoRol: TipoRol,
    createdAt: string;
    updatedAt: string;
}

export interface TipoRol {
    id: number;
    nombre: string
}