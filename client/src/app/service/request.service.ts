import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'


@Injectable()
export class RequestService {

  constructor(private http: HttpClient, private router: Router) {}

  public register(data, path): Observable<any> {
    console.log('Dados: ', data)
    let _path = path;
    return this.http.post('/'+ _path + '/register' , data); 
  }

  public findAll(path, headers=null):  Observable<any> {
    let _path = path;
    console.log('headers: ', headers); 
    if(headers){
      return this.http.get('/'+ _path + '/list',{
        headers: { headers }
      })
    }else{
      return this.http.get('/'+ _path + '/list')
    }
  }

}