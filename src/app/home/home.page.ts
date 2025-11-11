import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: string = '';

  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fechaNacimiento: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  mensajeError: string = '';

  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('apellidoInput') apellidoInput!: ElementRef;
  @ViewChild('homeTitle') homeTitle!: ElementRef;

  constructor(private router: Router, private alertController: AlertController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['usuario']) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fechaNacimiento = '';

    const animate = (el: ElementRef) => {
      el.nativeElement.classList.add('animate-slide');
      setTimeout(() => {
        el.nativeElement.classList.remove('animate-slide');
      }, 1000);
    };

    animate(this.nombreInput);
    animate(this.apellidoInput);
  }

  mostrarDatos() {
    alert(`Nombre: ${this.nombre}\nApellido: ${this.apellido}`);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      if (this.homeTitle?.nativeElement) {
        this.homeTitle.nativeElement.classList.remove('home-title');
        void this.homeTitle.nativeElement.offsetWidth;
        this.homeTitle.nativeElement.classList.add('home-title');
      }
    }, 50);

    const usuarioData = localStorage.getItem('usuarioData');
    if (usuarioData) {
      const datos = JSON.parse(usuarioData);
      this.nombre = datos.nombre || '';
      this.apellido = datos.apellido || '';
      this.nivel = datos.nivel || '';
      this.fechaNacimiento = datos.fechaNacimiento || '';
      this.correo = datos.correo || '';
      this.contrasena = datos.contrasena || '';
      this.confirmarContrasena = datos.contrasena || '';
    }
  }

  guardarYIrAlCatalogo() {
    if (!this.nombre || !this.apellido || !this.nivel || !this.fechaNacimiento || !this.correo || !this.contrasena || !this.confirmarContrasena) {
      this.presentAlert('Por favor completa todos los campos.');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.presentAlert('Las contraseñas no coinciden.');
      return;
    }

    const datosUsuario = {
      usuario: this.nombre,
      nombre: this.nombre,
      apellido: this.apellido,
      nivel: this.nivel,
      fechaNacimiento: this.fechaNacimiento,
      correo: this.correo,
      contrasena: this.contrasena
    };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(datosUsuario));

    this.presentAlert('Datos guardados correctamente.');
    this.router.navigate(['/catalogo']);
  }

  irAlInicio() {
    this.router.navigate(['/home']);
  }
}
