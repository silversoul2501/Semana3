import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.setItem('usuarioActivo', 'false');
    document.body.setAttribute('data-usuario-logueado', 'false');

    // Ir directamente al login sin forzar recarga doble
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
