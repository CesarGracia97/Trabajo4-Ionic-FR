import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestSystemService {

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<Login> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo: correo, contrasena: contrasena };
    return this.http.post<Login>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/iniciar_sesion', body, { headers });
  }

  recuperar_Clave(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, recuperarClave: true }; // Se añade recuperarClave
    return this.http.post('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/recuperar_correo', body, { headers });
  }

}
