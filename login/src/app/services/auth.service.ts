import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDpjWgEmwkVUUtkhperFusVVLGHg5u2zXY';
  
  userToken:string;
  
  // Crear nuevo usuario
  // /signUp?key=[API_KEY]

  // Log in usuario
  // signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  logout(){

  }

  login(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken:true
    }
    
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, 
                            authData
    )
    // .pipe(
    //   map( resp => {
    //     console.log('into the map on registro');
        
    //     this.guardarToken(resp['idToken']);
    //     return resp;
    //   })
    // )
  }
  
  nuevoUsuario(usuario:usuarioModel){
    const authData = {
      // email:usuario.email,
      // password: usuario.password,
      // nombre: usuario.nombre,
      ...usuario,
      returnSecureToken:true
    }

    return this.http.post(`${this.url}signUp?key=${this.apikey}`, 
                            authData
    )
    // .pipe(
    //   map( resp => {
    //     console.log('into the map on login');
        
    //     this.guardarToken(resp['idToken']);
    //     return resp;
    //   })
    // )
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
