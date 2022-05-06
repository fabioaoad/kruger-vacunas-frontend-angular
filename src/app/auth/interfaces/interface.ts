
export interface AuthResponse {
  usuario?: UsuarioResponse;
  token?: string;
  msg?: string;
  ok: boolean;
}


export interface UsuarioResponse {
  nombre?: string;
  apellido: string;
  dni?: number;
  direccion?: string;
  fechaNac?: Date;
  celular?: number;
  estado_vacunacion?: boolean;
  correo?: string;
  rol: string;
  estado?: boolean;
  google?: boolean;
  uid?: string;
}


export interface Usuario{
  uid: string;
  nombre: string;
  apellido: string;
  rol: string;
}


export interface VacunaTipo{
  id: string,
  vacunaNombre: string;
}

export interface Vacuna{
  id: string,
  usuario: Usuario,
  dosisNumero?: number,
  fechaVacunacion?: Date,
  vacunaTipo: VacunaTipo
}


export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}


