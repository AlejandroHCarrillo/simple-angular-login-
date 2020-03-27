import { Component, OnInit } from '@angular/core';
import { usuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: usuarioModel = new usuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario.email = "";
    this.usuario.password = "";
  }

  login(form: NgForm){
    if(form.invalid){
      console.log("Formulario no valido");
      return;
    }

    console.log('Formulario enviado');
    console.log(this.usuario);
    console.log(form);
    
  }

}
