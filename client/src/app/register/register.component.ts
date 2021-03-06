import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  credentials: TokenPayload = {
    idUsuario: 0,
    nome: "",
    sobrenome: "",
    email: "",
    senha: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}
  
  //Função responsável por cadastrar os usuários
  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}