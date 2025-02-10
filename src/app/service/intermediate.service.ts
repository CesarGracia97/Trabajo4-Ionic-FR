import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { tap } from 'rxjs';
import { HttpRequestSenddataService } from './http-request-senddata.service';
import { HttpRequestSystemService } from './http-request-system.service';
import { HttpRequestGetdataService } from './http-request-getdata.service';

@Injectable({
  providedIn: 'root'
})
export class IntermediateService {

  constructor(
    private ds: DataStorageService,
    private req1: HttpRequestGetdataService,
    private req2: HttpRequestSystemService,
    private req3: HttpRequestSenddataService,
  ) { }

  //Obtener Datos

  mid_DataUsuarios(ID: number){
    return this.req1.get_DataUsuarios(ID).pipe(
      tap((response) => {
        this.ds.setUsuario(response);
      })
    );
  }

  mid_ListaUsuarios(){
    return this.req1.get_ListaUsuarios().pipe(
      tap((response) => {
        this.ds.setLista_Usuarios(response);
      })
    );
  }

  mid_ListaContactos(USUARIO_ID: number){
    return this.req1.get_ListaContactoID(USUARIO_ID).pipe(
      tap((response) => {
        this.ds.setLista_Contactos(response);
      })
    );
  }

  //Sistema

  mid_Login(correo: string, contrasena: string){
    return this.req2.login(correo, contrasena).pipe(
      tap((response) => {
        this.ds.setLogin(response);
      })
    );
  }

  mid_RecuperarContrasena(correo: string){
    return this.req2.recuperar_Clave(correo);
  }

  //Enviar Datos

  mid_RegistroUsuario(correo: string, contrasena: string, nombre: string, cedula: string, contacto: string){
    return this.req3.register_user(correo, contrasena, nombre, cedula, contacto)
  }

  mid_RegistroContacto(USUARIO_ID: number, NOMBRE: string, TELEFONO: string, CORREO: string, CEDULA: string){
    return this.req3.register_contact(USUARIO_ID, NOMBRE, TELEFONO, CORREO, CEDULA)
  }

  mid_StatusContacto(ID: number, ISVALID: string){
    return this.req3.bloqued_contact(ID, ISVALID);
  }

  mid_BloqueoUsuario(CORREO: string){
    return this.req3.bloqued_user(CORREO);
  }

  mid_ActualizarContacto(ID: number, NUMBER: string, TELEFONO: string, CORREO: string){
    return this.req3.update_contact(ID, NUMBER, TELEFONO, CORREO);
  }

  mid_ActualizarUsuario(id: number, nombre: string, contacto: string){
    return this.req3.update_user(id, nombre, contacto);
  }
}
