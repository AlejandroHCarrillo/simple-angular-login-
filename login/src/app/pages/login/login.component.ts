import { Component, OnInit } from '@angular/core';
import { usuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: usuarioModel = new usuarioModel;
  recordarUsuario = false;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email =  localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  login(form: NgForm){

    if(form.invalid){
      console.log("Formulario no valido");
      return;
    }

    Swal.fire({
      title: 'Cargando',
      text: 'Por favor espere',
      icon: 'info',
      allowOutsideClick: false,
      confirmButtonText: 'Procesando...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp => {
      console.log(resp);
      Swal.close();
      if(this.recordarUsuario){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    },(err) =>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error de autentificacion',
        text: err.error.error.message,
        icon: 'error',
        allowOutsideClick: true,
        confirmButtonText: 'Ok'
      });  
    });

  }

}
