import { Component, OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
    credentials: TokenPayload = {
        idUsuario: 0,
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    }

    constructor(private auth: AuthenticationService, private router: Router) { }
    
    // Verifica se o usuário está logado e redireciona para a Página Inicial caso seja verdadeiro
    ngOnInit(): void {
        if(this.auth.isLoggedIn()){
            this.router.navigateByUrl('/home')
        }
    }

    // Verifica as credenciais e ativa sessão do usuário
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