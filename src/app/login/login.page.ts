import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItem } from '@ionic/angular/standalone';
import { IntermediateService } from 'src/app/service/intermediate.service';
import { Login } from 'src/app/interface/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, FormsModule]
})
export class LoginPage {

  correo: string = ''; contrasena: string = ''; //variables para a logeo
  intentos: number = 0;

  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  constructor(
    private router: Router, private mid: IntermediateService
  ) { }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  async irPagina(ruta: string) {
    const rutasValidas = ['register', 'menu-proyectos'];

    if (rutasValidas.includes(ruta)) {
      this.router.navigate([`/${ruta}`]);
    } 
  }

  Login(){
    if (!this.correo || !this.contrasena) {
      this.showResponse("Por favor completa los parámetros para iniciar sesión");
      return;
    }
    
    this.router.navigate(['/home']);
  }

  /*Login() {
    if (!this.correo || !this.contrasena) {
      this.showResponse("Por favor completa los parámetros para iniciar sesión");
      return;
    }

    this.loading = true;
    this.mid.mid_Login(this.correo, this.contrasena).subscribe({
      next: (response: Login) => {
        this.mid.mid_DataUsuarios(response.ID).subscribe();
        this.loading = false;
        this.showResponse(response.message);
        this.router.navigate(['/home']);
      },
      error: (errorResponse: any) => {
        if(this.intentos >= 3){
          this.loading = false;
          this.mid.mid_sendBloqueo_Usuario(this.correo);
          this.showResponse("numero de intentos "+this.intentos+". Tu cuenta fue bloqueada" );
        }
        this.loading = false;
        this.showResponse(errorResponse.message);
        this.intentos=this.intentos++;
      },
    });
  } */

  recuperarContrasena(){
    if(!this.correo){
      this.txt_response ='Por favor Ingresa el correo que deseas Recuperar en la caja de Correo de Login'
      this.showResponse(this.txt_response);
      return
    }
    this.mid.mid_RecuperarContrasena(this.correo).subscribe({
      next: () => {
        this.loading = false;
        this.showResponse('La peticion a sido enviada, puede que te llegue pronto a tu correo');
      },
      error: () => {
        this.loading = false;
        this.showResponse("Hay Latencia en el servidor, puede que demore en llegar");
      },
    });
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
