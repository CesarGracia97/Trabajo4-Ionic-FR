import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonSelectOption, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataStorageService } from '../service/data-storage.service';
import { IntermediateService } from '../service/intermediate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonItem, IonContent, IonSelectOption, IonButton, CommonModule, FormsModule, IonLabel]
})
export class ContactPage implements OnInit {
  
  contactos: { ID: number, USUARIO_ID: number, NOMBRE: number, TELEFONO: string, CORREO: string, CEDULA: string, ISVALID: string, editando: boolean }[] | null = null; //lista contactos
  usuarios: { ID: number, NOMBRE: string }[] = [] //lista de usuarios
  UserID: number = 0;

  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  mostrar: boolean | null = null;
  ver: boolean | null = null; mod: boolean | null = null; cre: boolean | null = null; blo: boolean | null = null;

  nombre: string = ''; telefono: string =''; correo: string =''; // modificar
  crear_iduser: number = 0; crear_nombre: string = ''; crear_telefono: string =''; crear_correo: string =''; crear_cedula:string = '' // crear contectos
  bloq_iduser: number = 0;

  constructor(
    private ds: DataStorageService, private mid: IntermediateService, private router: Router
  ) { }

  ngOnInit() {
    this.ds.dUsuario$.subscribe( data => { if(data) this.UserID = data.ID});
    this.ds.dContactos$.subscribe( data => { if(data) this.contactos = data});
    this.ds.dLista_Usuario$.subscribe( data => { if(data) this.usuarios = data})
    this.getData();
  }

  getData(){
    this.mid.mid_ListaContactos(this.UserID).subscribe();
    this.mid.mid_ListaUsuarios().subscribe();
  }

  excecuteAction(accion: string){
    const options = ['mod', 'cre', 'blo', 'ver'];
    if (options.includes(accion)){
      this.mostrar= true;
      switch(accion){
        case 'mod':
          this.mod= true;
          break;
        case 'cre':
          this.cre= true;
          break;
        case 'blo':
          this.blo= true;
          break;
        case 'ver':
          this.ver= true;
          break
      }
    } else {
      alert("PARCE ESTA OPCION NO EXITE")
    }
  }

  updateStatus(contacto: any) {
    this.mid.mid_StatusContacto(contacto.ID, contacto.ISVALID);
    this.getData();
  }

  habilitarEdicion(contacto: any) {
    contacto.editando = true;
  }
  
  guardarEdicion(contacto: any) {
    if (!contacto.NOMBRE || !contacto.TELEFONO || !contacto.CORREO) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    this.mid.mid_ActualizarContacto(contacto.USUARIO_ID, contacto.NOMBRE, contacto.TELEFONO, contacto.CORREO).subscribe({
      next: () => {
        contacto.editando = false;
        this.showResponse('Contacto actualizado');
      },
      error: (errorResponse) => {
        this.showResponse(errorResponse.message);
      },
    });
  }

  crearContacto(){
    if (!this.crear_iduser || !this.crear_nombre || !this.crear_telefono || !this.crear_correo) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    this.mid.mid_RegistroContacto(this.crear_iduser,this.crear_nombre,this.crear_telefono,this.crear_correo,this.crear_cedula).subscribe({
      next: () => {
        this.loading = false;
        this.showResponse('Contacto Creado');
        this.router.navigate(['/home']);
      },
      error: (errorResponse) => {
        this.loading = false;
        this.showResponse(errorResponse.message);
      },
    });
    this.getData();
  }

  resetForm() {
    this.crear_iduser = 0;
    this.crear_nombre = '';
    this.crear_telefono = '';
    this.crear_correo = '';
    this.crear_cedula = '';
  }

  showResponse(message: string) {
    this.response = true;
    this.txt_response = message;
    console.log(this.txt_response)
    setTimeout(() => {
      this.response = false;
      this.txt_response = '';
    }, 1000);
  }
}
