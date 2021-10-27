import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';
import { Visita } from '../../interfaces/visita.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  httpOptions: any;
  token: string;
  constructor(private http: HttpClient) {
    // this.headers.set('Access-Control-Allow-Origin', '*');
    // this.headers.set('Content-Type', 'application/json');
    this.token = '';
  }

  setToken(token: string): void {
    this.token = token;
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      }),
    };
  }

  deleteToken(): void {
    this.token = '';
  }

  getUsuarioPorRol(tipoRolId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/usuarios/tiporol/${tipoRolId}`, this.httpOptions)
  }

  obtenerVisitasPorEncargado(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${API_URL}/visitas/encargado/${id}`, this.httpOptions)
  }

  obtenerVisitasActivas(): Observable<any> {
    return this.http.get<any>(`${API_URL}/visitas/activas`, this.httpOptions)
  }

  marcarIngresoVisita(visita: Visita): Observable<any> {
    return this.http.put<any>(`${API_URL}/visitas/marcar-ingreso/${visita.id}`, this.httpOptions)
  }

  editarVisita(visita: Visita): Observable<any> {
    return this.http.put<any>(`${API_URL}/visitas/${visita.id}`, visita, this.httpOptions)
  }

  cancelarVisita(visita: Visita): Observable<any> {
    return this.http.delete<any>(`${API_URL}/visitas/${visita.id}`, this.httpOptions)
  }

  agendarVisita(visita: Visita) {
    console.log(visita.fechaVisita);
    return this.http.post<any>(`${API_URL}/visitas`, visita, this.httpOptions)
  }

}
