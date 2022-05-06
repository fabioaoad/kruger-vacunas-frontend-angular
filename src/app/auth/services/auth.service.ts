import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthResponse, Usuario, UsuarioResponse} from "../interfaces/interface";
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioResponse;


  get usuario(){
  //  console.log('hago get de usuario: ',this._usuario)
    return { ...this._usuario };
  }

  constructor( private http: HttpClient) { }



  registro( nombre: string,
            apellido: string,
            dni: number,
            direccion: string,
            celular: number,
            rol: string,
            fechaNac: Date,
            correo: string,
            password:string){

    const url = ` ${ this.baseUrl}/usuarios `;
    const body = {  nombre,
                    apellido,
                    dni,
                    direccion,
                    celular,
                    rol,
                    fechaNac,
                    correo,
                    password }
    return this.http.post<any>(url, body);
  }





  login( correo: string, password: string ){
    const url = ` ${ this.baseUrl}/auth/login `;
    const body = { correo, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
        //  console.log(resp.usuario?.rol)
          if ( resp.ok ){
            localStorage.setItem('token', resp.token! );
           // console.log('mi objeto es: ',this._usuario)
          }
        }),
        map( resp => resp.ok),
        catchError( err => of(err.error.msg) )
      );
  }



  validarToken(): Observable<boolean>{
    const url = ` ${ this.baseUrl}/auth/renew `;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<any>( url, { headers } )
      .pipe(
        map( resp => {
        //  console.log(resp.token);
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            uid: resp._id!,
            rol: resp.rol!,
            correo: resp.correo!
          }
          return resp.ok
        }),
        catchError( err => of(false))
      );
  }

  logout(){
    localStorage.clear();
  }

}
