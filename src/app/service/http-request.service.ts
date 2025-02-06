import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_Login, Users_List } from '../interface/user';
import { Contact } from '../interface/contact';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost/trabajo4/';

  login(correo: string, contrasena: string): Observable<User_Login> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, contrasena };
    return this.http.post<User_Login>(`${this.apiUrl}usuarios`, body, { headers });
  }

  register_user(correo: string, contrasena: string, nombre: string, cedula: string, contacto: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, contrasena, nombre, cedula, contacto };
    return this.http.post<any>(`${this.apiUrl}usuarios`, body, { headers });
  }

  update_user(id: number, nombre: string, contacto: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id, nombre, contacto };
    return this.http.put<any>(`${this.apiUrl}usuarios`, body, { headers });
  }

  get_Lista_Usuarios(): Observable<Users_List[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Users_List[]>(`${this.apiUrl}usuarios?all=true`, { headers });
  }

  get_Lista_Contacto(usuario_id: number): Observable<Contact[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Contact[]>(`${this.apiUrl}contactos?usuario_id=${usuario_id}`, { headers });
  }

  create_new_contact(USUARIO_ID: number, NOMBRE: string, TELEFONO: string, CORREO: string, CEDULA: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { USUARIO_ID, NOMBRE, TELEFONO, CORREO, CEDULA };
    return this.http.post<any>(`${this.apiUrl}contactos`, body, { headers });
  }

  update_contact(ID: number, NOMBRE: string, TELEFONO: string, CORREO: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID, NOMBRE, TELEFONO, CORREO };
    return this.http.put<any>(`${this.apiUrl}contactos`, body, { headers });
  }

  bloqued_contact(ID: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID };
    return this.http.put<any>(`${this.apiUrl}contactos/bloquear`, body, { headers }); // <-- Se recomienda cambiar la URL
  }

  bloqued_user(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo }; // JSON debe coincidir con el backend (minusculas)
    return this.http.put(`${this.apiUrl}usuarios`, body, { headers }); // Agregamos return
  }

  recuperar_Clave(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, recuperarClave: true }; // Se añade recuperarClave
    return this.http.put(`${this.apiUrl}usuarios`, body, { headers });
  }
}
