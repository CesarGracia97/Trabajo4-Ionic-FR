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

  usuario: { id: number,correo: string; nombre: string; cedula: number; contacto: number } | null = null;

  editando: boolean = false;
  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  nombre: string = ''; contacto: string = '';

  constructor(
    private ds: DataStorageService, private mid: IntermediateService, private router: Router
  ) {}

  ngOnInit() {
    this.ds.dUsuario$.subscribe(data =>{ if(data)  this.usuario = data.usuario})
  }

  habilitarEdicion() {
    this.editando = true;
  }

  IrContactos(){
    
    this.router.navigate(['/contact']);
  }

  cancelarEdicion() {
    this.editando = false;
  }

  guardarCambios() {
    if (this.usuario && this.usuario.id) { 
      const id = this.usuario.id;
      const id_conver = parseInt(id.toString(), 10); 
      this.mid.mid_sendActualizar_Usuario(id_conver, this.nombre, this.contacto).subscribe({
        next: () => {
          this.loading = false;
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
