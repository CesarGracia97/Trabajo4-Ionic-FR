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

  login(correo: string, contrasena: string): Observable<User_Login> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo: correo, contrasena: contrasena };
    return this.http.post<User_Login>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/iniciar_sesion', body, { headers });
  }

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

  recuperar_Clave(correo: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, recuperarClave: true }; // Se añade recuperarClave
    return this.http.post('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/recuperar_correo', body, { headers });
  }

  get_Lista_Usuarios(): Observable<Users_List[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Users_List[]>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/get/queries/listar_usuarios', { headers });
  }

  get_Lista_Contacto(usuario_id: number): Observable<Contact[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Contact[]>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/get/queries/listar_contactos', { headers });
  }

  create_new_contact(USUARIO_ID: number, NOMBRE: string, TELEFONO: string, CORREO: string, CEDULA: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { USUARIO_ID, NOMBRE, TELEFONO, CORREO, CEDULA };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/post/create/usuarios', body, { headers });
  }

  update_contact(ID: number, NOMBRE: string, TELEFONO: string, CORREO: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID, NOMBRE, TELEFONO, CORREO };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/put/modify/contacto', body, { headers });
  }

  bloqued_contact(ID: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID };
    return this.http.post<any>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/bloquear_contacto', body, { headers }); // <-- Se recomienda cambiar la URL
  }

}
