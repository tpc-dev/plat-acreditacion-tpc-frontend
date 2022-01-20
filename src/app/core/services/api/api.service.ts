import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';
import { Visita } from '../../interfaces/visita.interface';
import { Usuario } from '../../interfaces/cuenta.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any;
  token: string;
  headers: Headers = new Headers();
  constructor(private http: HttpClient) {
    // this.headers.set('Access-Control-Allow-Origin', '*');
    // this.headers.set('Content-Type', 'application/json');
    this.token = '';
  }

  setToken(token: string): void {
    console.log(token)
    this.token = token;
    // this.headers = new Headers();
    // this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // this.headers.append('Access-Control-Allow-Methods', 'GET');
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // add authorization bearer token to header
    this.headers.append('Authorization', 'Bearer ' + token);
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

  getSharePointAccesToken(): Promise<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Authorization: "Bearer " + `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGVybWluYWxwdWVydG9jb3F1aW1iby5zaGFyZXBvaW50LmNvbUBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2IiwiaWF0IjoxNjM2NTI0MDY1LCJuYmYiOjE2MzY1MjQwNjUsImV4cCI6MTYzNjYxMDc2NSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJuYW1laWQiOiI2ODRiMGU2MC03NmVmLTQ3YjYtOWIwNS0wYTRmZTkxNmFkMWRAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2Iiwib2lkIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4Iiwic3ViIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.XTYCvDdsXWgbsOqqvWkZSIVSKfBALchcvcUd82og9bP9qbxuv2hyaFB5XEfCmhpUubHbZe8s6jTtSZPPY6hNeaMxsl_7Ki_nOCtdYqMuOVAK2hGKzRh1BcuPpDJ7HJ6avcecIbXM6J7IdCOoZD1I1wOyrCRkdW8A6O3HuifzLcNhihl8Z_ESUyf30nYYSuflGzajixLdNd24czmfBlxopDBbcOIPXz8nCrQqjfcaZIB8gycnMZtsf8vSi-jOODs-rfEX7JyeyeOUaOZKbmtoU4k6UtUHYZezbPE4M2ehY0OmwkZN1rrId69aAVgOz4EtXMYxyXf3NOD_xbsqtUC8FA`,
      }),
    };
    var formData: any = new FormData();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", "684b0e60-76ef-47b6-9b05-0a4fe916ad1d@bb4e77c2-896b-4876-ba85-073a2bb991e6");
    formData.append("client_secret", "+wNqx/w+K1gL15zlk/O5QyQ/BEbxuNDXKySIF7ki+ks=");
    formData.append("resource", "00000003-0000-0ff1-ce00-000000000000/terminalpuertocoquimbo.sharepoint.com@bb4e77c2-896b-4876-ba85-073a2bb991e6");
    // let formdata = `grant_type:client_credentials
    // client_id:684b0e60-76ef-47b6-9b05-0a4fe916ad1d@bb4e77c2-896b-4876-ba85-073a2bb991e6
    // client_secret:+wNqx/w+K1gL15zlk/O5QyQ/BEbxuNDXKySIF7ki+ks=
    // resource:00000003-0000-0ff1-ce00-000000000000/terminalpuertocoquimbo.sharepoint.com@bb4e77c2-896b-4876-ba85-073a2bb991e6`;
    return new Promise((resolve, reject) => {
      this.http.post<any>(`https://accounts.accesscontrol.windows.net/bb4e77c2-896b-4876-ba85-073a2bb991e6/tokens/OAuth/2/`, formData, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  //#region USUARIOS
  getUsuarioPorRol(tipoRolId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/usuarios/tiporol/${tipoRolId}`, this.httpOptions)
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${API_URL}/usuarios`, this.httpOptions)
  }

  getEmpresaUsuario(usuarioID: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/usuarios/${usuarioID}/empresa`, this.httpOptions)
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${API_URL}/tipo-roles`, this.httpOptions)
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/cuentas/crear-cuenta`, usuario, this.httpOptions)
  }
  //#endregion

  //#region VISITAS
  obtenerVisitasPorEncargado(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${API_URL}/visitas/encargado/${id}`, this.httpOptions)
  }

  obtenerVisitasActivas(): Observable<any> {
    return this.http.get<any>(`${API_URL}/visitas/activas`, this.httpOptions)
  }

  obtenerVisitas(): Observable<any> {
    return this.http.get<any>(`${API_URL}/visitas`, this.httpOptions)
  }

  getAccesosHistoricosVisita(visitaid: number): Observable<any> {
    // /api/ingreso-visitas/${visitaid}/ingresos-historico
    return this.http.get<any>(`${API_URL}/ingreso-visitas/${visitaid}/ingresos-historico`, this.httpOptions)
  }

  marcarIngresoVisita(visita: Visita): Observable<any> {
    return this.http.put<any>(`${API_URL}/visitas/marcar-ingreso/${visita.id}`, this.httpOptions)
  }

  marcarSalidaVisita(visita: Visita): Observable<any> {
    return this.http.put<any>(`${API_URL}/visitas/marcar-salida/${visita.id}`, this.httpOptions)
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
  //#endregion

  //#region EMPRESAS
  obtenerEmpresas(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${API_URL}/empresas`, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  GET(URL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${API_URL}${URL}`, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  POST(URL: string, params: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${API_URL}${URL}`, params, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  POSTFile(URL: string, bufferFile: any): Promise<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "content-length": bufferFile.byteLength,
        Authorization: "Bearer " + `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGVybWluYWxwdWVydG9jb3F1aW1iby5zaGFyZXBvaW50LmNvbUBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2IiwiaWF0IjoxNjQxMzQxMTE2LCJuYmYiOjE2NDEzNDExMTYsImV4cCI6MTY0MTQyNzgxNiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJuYW1laWQiOiI2ODRiMGU2MC03NmVmLTQ3YjYtOWIwNS0wYTRmZTkxNmFkMWRAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2Iiwib2lkIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4Iiwic3ViIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.IaPyy83oCBTJd04b-tRUqIsbfqyEo_j2BJ5fi8muv-nAZfO-VNoVpq9Xfz2lDcpvkZNvUpKC9c_Og_clqphSGzC9SEANU2ol7DkOL1HYXRa5t7HGVu1chAOds_eJtxUWrP9Aj89kxAIsMOffnMmLkLMPsTRhb_lPVMT7RZjI2v0TDxo3noxaZ-UKaDQQ8HZUsLjPKy5QnuRyhIW94bk44acfljbPXenbck43jEZKgxBrR6GZCDV9x9E7adpl9TcCBXO7XKonlnkkLh-UU-XVmLhlxXj-upAnai78evILFWVzjqp8LLxoEtMgXQUq7OudktyxtfEVlJ95bYeS8ZVe-g`,
      }),
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(URL, bufferFile, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  PUT(URL: string, params: {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put<any>(`${API_URL}${URL}`, params, this.httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  //#endregion

}
