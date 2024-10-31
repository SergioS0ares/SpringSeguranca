import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthServiceService} from "../../service/auth-service.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService,
              private loginService: LoginService,
              private router: Router ) {}

  onLogin(): void {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Nome de usuário ou senha inválidos.';
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Usuário ou senha inválidos.';
        }
      },
      error: () => {
        this.errorMessage = 'Erro de autenticação. Tente novamente.';
      }
    });
  }
  
}
