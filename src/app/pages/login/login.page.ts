import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent  } from '@ionic/angular/standalone';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { IntermediateService } from 'src/app/service/intermediate.service';
import { User_Login } from 'src/app/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, FormsModule]
})
export class LoginPage implements OnInit {

  correo: string = ''; contrasena: string = ''; //variables para a logeo
  intentos: number = 0;

  loading: boolean | null = null; response: boolean | null = null; txt_response: string = '';

  constructor(
    private mid: IntermediateService
  ) { }

  ngOnInit() {
  }

  Login() {
    if (!this.correo || !this.contrasena) {
      this.showResponse("Por favor completa los parámetros para iniciar sesión");
      return;
    }

    this.loading = true;
    this.mid.mid_getData_Usuario(this.correo, this.contrasena).subscribe({
      next: (response: User_Login) => {
        this.loading = false;
        this.showResponse(response.message);
      },
      error: (errorResponse: any) => {
        this.loading = false;
        this.showResponse(errorResponse.message || "Ocurrió un error al iniciar sesión");
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
    }, 3000);
  }
}
