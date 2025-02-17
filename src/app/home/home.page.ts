import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { DataStorageService } from '../service/data-storage.service';
import { IntermediateService } from '../service/intermediate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton, CommonModule, FormsModule ],
})
export class HomePage implements OnInit {

  usuario: { ID: number, CORREO: string, NOMBRE: string, CEDULA: number, CONTACTO: number } | null = null;
  ID: number = 0;
  editando: boolean = false;
  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  nombre: string = ''; contacto: string = '';

  constructor(
    private ds: DataStorageService, private mid: IntermediateService, private router: Router
  ) {}

  ngOnInit() {
    this.ds.dUsuario$.subscribe(data =>{ if(data)  this.usuario = data })
    this.getID();
    this.getData();
  }

  getID(){
    if(this.usuario && this.usuario.ID){
      const conver = this.usuario.ID
      this.ID = conver;
    }
  }
  getData(){
    this.mid.mid_DataUsuarios(this.ID).subscribe()
  }

  habilitarEdicion() {
    this.editando = true;
  }

  IrContactos(){
    this.mid.mid_ListaContactos(this.ID).subscribe();
    this.mid.mid_ListaUsuarios().subscribe();
    this.router.navigate(['/contact']);
  }

  cancelarEdicion() {
    this.editando = false;
  }

  guardarCambios() {
    if (this.usuario) { 
      this.mid.mid_ActualizarUsuario(this.usuario.ID, this.nombre, this.contacto).subscribe({
        next: () => {
          this.loading = false;
          this.getData();
          this.showResponse('Actualizacion Exitosa');
        },
        error: (errorResponse: any) => {
          this.loading = false;
          this.showResponse(errorResponse.message);
        },
      });
    }
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
