import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Contact, Users_List } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestGetdataService {

  constructor(private http: HttpClient) { }

  get_DataUsuarios(usuario_id: number): Observable<User>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {ID: usuario_id}
    return this.http.post<User>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/get/queries/listar_usuarios', body, { headers });
  }

  get_ListaUsuarios(): Observable<Users_List[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Users_List[]>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/get/queries/listar_usuarios', { headers });
  }

  get_ListaContactoID(usuario_id: number): Observable<Contact[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario_id}
    return this.http.post<Contact[]>('http://127.0.0.1:2014/rest/contactos-usuario-api/v1.0/get/queries/listar_contactos', body, { headers });
  }
}
