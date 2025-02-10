import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestSenddataService {

  constructor(private http: HttpClient) { }

  register_user(correo: string, contrasena: string, nombre: string, cedula: string, contacto: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, contrasena, nombre, cedula, contacto };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/create/usuarios', body, { headers });
  }

  update_user(id: number, nombre: string, contacto: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id, nombre, contacto };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/put/modify/usuarios', body, { headers });
  }

  bloqued_user(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo }; // JSON debe coincidir con el backend (minusculas)
   
    return this.http.post('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/put/modify/bloquear_usuario', body, { headers }); // Agregamos return
  }

  register_contact(USUARIO_ID: number, NOMBRE: string, TELEFONO: string, CORREO: string, CEDULA: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { USUARIO_ID, NOMBRE, TELEFONO, CORREO, CEDULA };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/create/usuarios', body, { headers });
  }

  update_contact(ID: number, NOMBRE: string, TELEFONO: string, CORREO: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID, NOMBRE, TELEFONO, CORREO };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/put/modify/contacto', body, { headers });
  }

  bloqued_contact(ID: number, ISVALID: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID, ISVALID };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/bloquear_contacto', body, { headers }); // <-- Se recomienda cambiar la URL
  }
}
