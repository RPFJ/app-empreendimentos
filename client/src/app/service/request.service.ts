import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'


// export interface TipoContatoPayload {
//   idTipo_contato: number
//   nome_tipo: string
// }

// export interface LocalizacaoPayload{
//   idLocalizacao: number,
//   desc_localizacao: string
// }


@Injectable()
export class RequestService {

  constructor(private http: HttpClient, private router: Router) {}

  // public regTipoContato(tipoContato: TipoContatoPayload): Observable<any> {
  //   return this.http.post(`/tipoContato/register`, tipoContato)
  // }

  public register(data, path): Observable<any> {
    let _path = path;
    return this.http.post('/'+ _path + '/register' , data)
  }


}