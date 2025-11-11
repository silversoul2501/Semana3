import { CarritoService } from '../services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {

  libros: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private librosService: LibrosService
  ) { }

  ngOnInit() {
    this.libros = this.librosService.obtenerLibros();
  }

  agregarAlCarrito(libro: any) {
    this.carritoService.agregarLibro(libro);
    console.log('Libro agregado al carrito:', libro);
    console.log('Estado actual del carrito:', this.carritoService.obtenerCarrito());
  }

}
