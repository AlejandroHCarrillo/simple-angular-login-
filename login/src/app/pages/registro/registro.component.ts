import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';

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

    this.usuario.email = "el_grande@hotnail.com";
   }


}
