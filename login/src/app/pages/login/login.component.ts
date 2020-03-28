import { Component, OnInit } from '@angular/core';
import { usuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: usuarioModel = new usuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario.email = "";
    this.usuario.password = "";
  }

  login(form: NgForm){

    if(form.invalid){
      console.log("Formulario no valido");
      return;
    }

    // Swal.fire({
    //   allowOutsideClick: false,
    //   text: 'Por favor espere'
    // });

    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
    },(err) =>{
      console.log(err.error.error.message);
    });


  }

}
