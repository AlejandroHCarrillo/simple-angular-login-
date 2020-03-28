import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;
  recordarUsuario= false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new usuarioModel;
    this.usuario.email = "";
   }

   onSubmit(form : NgForm){

    if(form.invalid){
      console.log("form not valid");      
      return;
    }

    Swal.fire({
      title: 'Cargando',
      text: 'Por favor espere',
      icon: 'info',
      allowOutsideClick: false,
      confirmButtonText: 'Procesando..'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => { 
      console.log(resp);
      Swal.close();
      if(this.recordarUsuario){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    },(err) =>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al crear el usuario',
        text: err.error.error.message,
        icon: 'error',
        allowOutsideClick: true,
        confirmButtonText: 'Ok'
      });

    });
  }

}
