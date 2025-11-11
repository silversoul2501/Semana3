import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]  // ¡ESTO ES CLAVE!
})
export class PerfilUsuarioPage {
  usuario: any;
  nuevaContrasena = '';
  confirmarContrasena = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const datos = localStorage.getItem('usuarioRegistrado');
    if (datos) {
      this.usuario = JSON.parse(datos);
    }
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  actualizarContrasena() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado') || '{}');
    usuarioGuardado.contrasena = this.nuevaContrasena;
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioGuardado));
    this.presentAlert('Éxito', 'Contraseña actualizada correctamente');
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioRegistrado');
    window.location.href = '/login';
  }
}