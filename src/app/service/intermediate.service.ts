import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { DataStorageService } from './data-storage.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntermediateService {

  constructor(
    private req: HttpRequestService, private ds: DataStorageService
  ) { }

  mid_getData_Lista_Usuarios(){
    return this.req.get_Lista_Usuarios().pipe(
      tap((response) => {
        this.ds.setLista_Usuarios(response);
      })
    );
  }

  mid_getData_Usuario(correo: string, contrasena: string){
    return this.req.login(correo, contrasena).pipe(
      tap((response) => {
        this.ds.setUsuario(response);
      })
    );
  }

  mid_getData_ListaContactos(USUARIO_ID: number){
    return this.req.get_Lista_Contacto(USUARIO_ID).pipe(
      tap((response) => {
        this.ds.setLista_Contactos(response);
      })
    );
  }

  mid_sendData_RegistroUsuario(correo: string, contrasena: string, nombre: string, cedula: string, contacto: string){
    return this.req.register_user(correo, contrasena, nombre, cedula, contacto)
  }

  mid_sendData_CreateContacto(USUARIO_ID: number, NOMBRE: string, TELEFONO: string, CORREO: string, CEDULA: string){
    return this.req.create_new_contact(USUARIO_ID, NOMBRE, TELEFONO, CORREO, CEDULA)
  }

  mid_sendBloqueo_Contacto(ID: number){
    return this.req.bloqued_contact(ID);
  }

  mid_sendActualizar_Contacto(ID: number, NUMBER: string, TELEFONO: string, CORREO: string){
    return this.req.update_contact(ID, NUMBER, TELEFONO, CORREO);
  }

  mid_sendActualizar_Usuario(id: number, nombre: string, contacto: string){
    return this.req.update_user(id, nombre, contacto);
  }

  mid_sendBloqueo_Usuario(CORREO: string){
    return this.req.bloqued_user(CORREO);
  }
}
