import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;
  constructor() { }

  ngOnInit() {
    this.usuario = new usuarioModel;
    this.usuario.email = "";
   }

   onSubmit(form : NgForm){

    if(form.invalid){
      console.log("form not valid");      
      return;
    }

    console.log('Formulario enviado');
    console.log(this.usuario);
    console.log(form);
    
   }

}
