import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Vacuna} from "../interfaces/interface";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VacunacionService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }



  public getVacunacion(): Observable<any>{
    const url = ` ${ this.baseUrl}/vacunas `;
    return this.http.get<any>(url);
  }

  public getUsuario(): Observable<any>{
    const url = ` ${ this.baseUrl}/usuarios `;
    return this.http.get<any>(url);
  }





  deleteVacunas(id: string): Observable<boolean>{
    const url = ` ${ this.baseUrl}/vacunas/${ id } `;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.delete<any>( url, { headers } )
      .pipe(
        map( resp => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token! );
          return resp.ok
        }),
        catchError( err => of(false))
      );
  }






}
