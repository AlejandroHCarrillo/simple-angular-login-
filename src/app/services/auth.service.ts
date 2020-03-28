import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDpjWgEmwkVUUtkhperFusVVLGHg5u2zXY';
  
  userToken:string;
  
  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    }
    
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, 
                            authData
    )
    .pipe(
      map( resp => {
        console.log('into the map on registro');
        
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
  }
  
  nuevoUsuario(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    }

    return this.http.post(`${this.url}signUp?key=${this.apikey}`, 
                            authData
    )
    .pipe(
      map( resp => {
        console.log('into the map on login');
        
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date(); // Obtenemos la fecha actual con minutos y segundos
    hoy.setSeconds(3600); //Agregamos 1 hora a la fecha actual 
    
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean {
      if(this.userToken.length<2){
        return false;
      }

      const expira = Number(localStorage.getItem('expira'));
      const expirationDate = new Date(expira);

      return expirationDate > new Date; // Si la fecha de expiracion es mayor a la fecha actual, todavia esta autenticado.
  }
}
