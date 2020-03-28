import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new usuarioModel;
    this.usuario.email = "";
   }

   onSubmit(form : NgForm){

    if(form.invalid){
      console.log("form not valid");      
      return;
    }

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => { 
      console.log(resp);
    },(err) =>{
      console.log(err.error.error.message);
    });
  }

}
