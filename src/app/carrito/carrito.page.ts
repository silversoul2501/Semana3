import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { AlertController } from '@ionic/angular';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage implements OnInit {

  carritoVacio: boolean = true;

  carrito: Libro[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carrito.reduce((sum, libro: any) => sum + (libro.precio || 0), 0);
    this.carritoVacio = this.carrito.length === 0;
  }

  ngOnInit(): void {
    // Método requerido por OnInit (puede estar vacío si no se usa)
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, libro) => total + (libro.precio || 0), 0);
  }

  agregarAlCarrito(libro: any) {
    this.carritoService.agregarLibro(libro);
  }

  async confirmarCompra() {
    if (this.carrito.length === 0) {
      const alerta = await this.alertController.create({
        header: 'Carrito vacío',
        message: 'Agrega al menos un libro antes de confirmar la compra.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Compra confirmada',
      message: 'Gracias por tu compra. Recibirás un correo con los detalles.',
      buttons: ['Aceptar']
    });

    await alert.present();

    this.carritoService.vaciarCarrito();
    this.carritoService.guardarCompra();
    this.carrito = [];
  }

}
