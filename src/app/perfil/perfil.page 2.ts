import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class PerfilPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  nivel: string = '';
  fechaNacimiento: string = '';

  constructor() { }

  ngOnInit() {
    const datos = localStorage.getItem('usuarioRegistrado');
    if (datos) {
      const usuario = JSON.parse(datos);
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.correo = usuario.correo;
      this.nivel = usuario.nivel;
      this.fechaNacimiento = usuario.fechaNacimiento;
    }
  }

}
