import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: TokenPayload = {
        idUsuario: 0,
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    }

    constructor(private auth: AuthenticationService, private router: Router) { }

    login() {
        this.auth.login(this.credentials).subscribe(
            () => {
                this.router.navigateByUrl('/profile')
            },
            err => {
                console.error(err); 
                window.alert('Usuário ou senha não existem')
            }
        )
    }
}