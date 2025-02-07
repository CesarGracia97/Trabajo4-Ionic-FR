import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataStorageService } from '../service/data-storage.service';
import { IntermediateService } from '../service/intermediate.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContactPage implements OnInit {

  
  usuario: { id: number,correo: string; nombre: string; cedula: number; contacto: number } | null = null;
  nombre: string = ''; telefono: string =''; correo: string ='';


  constructor(
    private ds: DataStorageService, private mid: IntermediateService
  ) { }

  ngOnInit() {
    this.ds.dUsuario$.subscribe(data =>{ if(data)  this.usuario = data.usuario})
    this.cargarContactos()
    this.ds.dContactos$( data => { if(data) this })
  }

  cargarContactos(){
    if(this.usuario && this.usuario.id){
      const id = this.usuario.id;
      const id_conver = parseInt(id.toString(), 10); 
      this.mid.mid_getData_ListaContactos(id_conver).subscribe();
    }
  }

}
