import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { IntermediateService } from 'src/app/service/intermediate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  correo: string =''; contrasena: string =''; nombre: string =''; 
  cedula: string =''; contacto: string =''; 

  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  constructor(private mid: IntermediateService, private router: Router) { }

  ngOnInit() {
  }

  registrar(){
    
    if (!this.correo || !this.contrasena || !this.nombre || !this.cedula || !this.contacto) {
      this.showResponse("Por favor completa los parámetros para iniciar sesión");
      return;
    }
    this.loading = true;
    this.mid.mid_RegistroUsuario(this.correo, this.contrasena, this.nombre, "'"+this.cedula, "'"+this.contacto).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.showResponse('Se ha Creado Exitosamente la cuenta');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (errorResponse: any) => {
        this.loading = false;
        this.showResponse(errorResponse.message || "Ocurrió un error al iniciar sesión");

      }
    })
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
