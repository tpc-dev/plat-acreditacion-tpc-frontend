export interface Cuenta {
    token: string,
    expiracion: string,
    usuario: Usuario;
}

export interface Usuario {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    telefono: string;
    tipoRolId?: number;
    rut: string;
    tipoRol: TipoRol,
    createdAt: string;
    updatedAt: string;
}

export interface TipoRol {
    id: number;
    nombre: string
}