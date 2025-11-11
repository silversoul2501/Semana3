import { Component, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  // 👇 Esto fuerza a NO usar standalone
  standalone: false
})
export class LoginPage {
  user = {
    usuario: '',
    contrasena: '',
    correo: ''
  };

  private handleUsuarioIniciado: any;
  private handleLogout: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.user = { correo: '', contrasena: '', usuario: '' };
    // Limpiar listeners anteriores para evitar múltiples registros
    window.removeEventListener('usuarioIniciado', this.verificarUsuario);
    window.removeEventListener('usuarioCerroSesion', this.handleLogout);

    this.handleUsuarioIniciado = () => {
      this.verificarUsuario();
    };

    this.handleLogout = () => {
      localStorage.setItem('usuarioActivo', 'false');
      location.href = '/login';
    };

    window.addEventListener('usuarioIniciado', this.handleUsuarioIniciado);
    window.addEventListener('usuarioCerroSesion', this.handleLogout);

    const comingFromLogout = performance.getEntriesByType('navigation').some(
      (entry: any) => entry.type === 'reload'
    );

    if (!comingFromLogout) {
      this.verificarUsuario();
    }
    this.cdref.detectChanges();
    setTimeout(() => {
      const campos = document.querySelectorAll('input');
      campos.forEach((campo) => (campo.value = ''));
    }, 10);
  }

  ngOnDestroy() {
    window.removeEventListener('usuarioIniciado', this.handleUsuarioIniciado);
    window.removeEventListener('usuarioCerroSesion', this.handleLogout);
  }

  verificarUsuario() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const estaEnLogin = this.router.url.includes('/login');

    if (usuarioActivo === 'true') {
      this.router.navigate(['/catalogo']);
    } else {
      this.user = { correo: '', contrasena: '', usuario: '' };
      this.cdref.detectChanges();
    }
  }

  ingresar() {
    const datosGuardados = localStorage.getItem('usuarioRegistrado');
    if (datosGuardados) {
      const usuarioRegistrado = JSON.parse(datosGuardados);

      if (
        this.user.correo === usuarioRegistrado.correo &&
        this.user.contrasena === usuarioRegistrado.contrasena
      ) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioRegistrado.usuario
          }
        };
        localStorage.setItem('usuario', usuarioRegistrado.usuario);
        localStorage.setItem('usuarioActivo', 'true');
        window.dispatchEvent(new Event('usuarioIniciado'));
        this.router.navigate(['/catalogo'], navigationExtras);
        return;
      }
    }

    this.alertController.create({
      header: 'Error',
      message: 'Correo o contraseña incorrectos.',
      buttons: ['Aceptar']
    }).then(alert => alert.present());
  }
}
