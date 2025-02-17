import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Users_List, Contact, Login } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private dUsuario_Subject = new BehaviorSubject<User | null>(null);
  dUsuario$ = this.dUsuario_Subject.asObservable();

  private dLogin_Subject = new BehaviorSubject<Login | null>(null);
  dLogin$ = this.dLogin_Subject.asObservable();

  private dLista_Usuarios_Subject = new BehaviorSubject<Users_List | null>(null);
  dLista_Usuario$ = this.dLista_Usuarios_Subject.asObservable();

  private dContactos_Subject = new BehaviorSubject<Contact | null> (null);
  dContactos$ = this.dContactos_Subject.asObservable();

  constructor() { }

  // Método para actualizar los datos
  setUsuario(data: User ): void {
    this.dUsuario_Subject.next(data);
  }

  // Método para obtener el valor actual almacenado
  getUsuario(): User | null {
    return this.dUsuario_Subject.getValue();
  }

  // Método para actualizar los datos
  setLista_Usuarios(data: Users_List): void {
    this.dLista_Usuarios_Subject.next(data);
  }

  setLogin(data: Login): void {
    this.dLogin_Subject.next(data);
  }

  getLogin(): Login | null {
    return this.dLogin_Subject.getValue();
  }

  // Método para obtener el valor actual almacenado
  getLista_Usuario(): Users_List | null {
    return this.dLista_Usuarios_Subject.getValue();
  }

  // Método para actualizar los datos
  setLista_Contactos(data: Contact ): void {
    this.dContactos_Subject.next(data);
  }

  // Método para obtener el valor actual almacenado
  getLista_Contactos(): Contact | null {
    return this.dContactos_Subject.getValue();
  }
}
