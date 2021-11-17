import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Credenciales } from '../../interfaces/credenciales.interface';
import { Cuenta, TipoRol, Usuario } from '../../interfaces/cuenta.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sessionOn = new BehaviorSubject(false);
  redirectUrl!: string;
  headers = new HttpHeaders();
  private cuenta = new BehaviorSubject<Cuenta>({} as any) ;
  constructor(private http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Content-Type', 'application/json');
  }

  signIn({ email, password }: Credenciales): Observable<Cuenta> {
    const req = {
      email,
      password,
    }
    return this.http.post<Cuenta>(`${API_URL}/cuentas/login`, req, { headers: this.headers })
  }

  setCuentaActiva(cuenta: Cuenta) {
    this.cuenta.next(cuenta);
  }

  setCuentaSessionStorage(resCuenta: Cuenta) {
    sessionStorage.setItem("cuenta", JSON.stringify(resCuenta));
  }

  getCuentaSessionStorage(): Cuenta | null {
    if (sessionStorage.length == 0) return null;
    let cuenta = sessionStorage.getItem("cuenta")
    return JSON.parse(cuenta || '');
  }

  isLoggedIn(): boolean {
    return this.sessionOn.value;
  }

  isLoggedInObservable(): BehaviorSubject<boolean> {
    return this.sessionOn;
  }

  getCuentaActiva(): BehaviorSubject<Cuenta> {
    return this.cuenta;
  }

  getCuentaActivaValue(): Cuenta {
    return this.cuenta.value;
  }

  setSession(status: boolean): void {
    this.sessionOn.next(status);
  }

  signOut(): void {
    this.setSession(false);
    sessionStorage.clear();
  }
}
