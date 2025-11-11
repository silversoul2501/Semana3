import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.page.html',
  styleUrls: ['./detalle-libro.page.scss'],
  standalone: false,
})
export class DetalleLibroPage implements OnInit {

  titulo = '';
  autor = '';
  descripcion = '';
  imagen = '';
  precio: number | null = null;
  precioOferta: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const navigation = history.state;
    if (navigation) {
      this.titulo = navigation.titulo || '';
      this.autor = navigation.autor || '';
      this.descripcion = navigation.descripcion || '';
      this.imagen = navigation.imagen || '';
      this.precio = navigation.precio ?? null;
      this.precioOferta = navigation.precioOferta ?? null;
    }
  }

}
