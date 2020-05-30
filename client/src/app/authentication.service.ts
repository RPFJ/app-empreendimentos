import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UsuarioDetails {
  idUsuario: number
  nome: string
  sobrenome: string
  email: string
  senha: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  idUsuario: number
  nome: string
  sobrenome: string
  email: string
  senha: string
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) {}

  // Salva o token do usuário no Local Storage
  private saveToken(token: string): void {
    localStorage.setItem('usuariotoken', token)
    this.token = token
  }

  //Retorna o token de autenticação do usuário que está logado
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usuariotoken')
    }
    return this.token
  }

  //Função responsável por buscar os detalhes do usuário atual
  public getUsuarioDetails(): UsuarioDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  // Fução responsavel pela verificação de logon do usuário
  public isLoggedIn(): boolean {
    const usuario = this.getUsuarioDetails()
    if (usuario) {
      return usuario.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  //Função responsavel por cadastrar o usuário no banco de dados
  public register(usuario: TokenPayload): Observable<any> {
    return this.http.post(`/usuario/register`, usuario)
  }

  //Função responsável por fazer login do usuário que já existe no banco de dados
  public login(usuario: TokenPayload): Observable<any> {
    console.log("Login: ",usuario); 
    const base = this.http.post(`/usuario/login`, usuario)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  //Função responsável por buscar os dados do usuário que está logado
  public profile(): Observable<any> {
    return this.http.get(`/usuario/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //Função responsável por finalização da sessão do usuário logado
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usuariotoken')
    this.router.navigateByUrl('/login')
  }
}