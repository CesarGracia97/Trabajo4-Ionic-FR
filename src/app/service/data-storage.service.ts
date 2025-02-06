import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User_Login, Users_List } from '../interface/user';
import { Contact } from '../interface/contact';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private dUsuario_Subject = new BehaviorSubject<User_Login | null>(null);
  dUsuario$ = this.dUsuario_Subject.asObservable();

  private dLista_Usuarios_Subject = new BehaviorSubject<Users_List[] | null>(null);
  dLista_Usuario$ = this.dLista_Usuarios_Subject.asObservable();

  private dContactos_Subject = new BehaviorSubject<Contact[] | null> (null);
  dContactos$ = this.dContactos_Subject.asObservable();

  constructor() { }

  // Método para actualizar los datos
  setUsuario(data: User_Login ): void {
    this.dUsuario_Subject.next(data);
  }

  // Método para obtener el valor actual almacenado
  getUsuario(): User_Login | null {
    return this.dUsuario_Subject.getValue();
  }

  // Método para actualizar los datos
  setLista_Usuarios(data: Users_List []): void {
    this.dLista_Usuarios_Subject.next(data);
  }

  // Método para obtener el valor actual almacenado
  getLista_Usuario(): Users_List[] | null {
    return this.dLista_Usuarios_Subject.getValue();
  }

  // Método para actualizar los datos
  setLista_Contactos(data: Contact[] ): void {
    this.dContactos_Subject.next(data);
  }

  // Método para obtener el valor actual almacenado
  getLista_Contactos(): Contact[] | null {
    return this.dContactos_Subject.getValue();
  }
}
