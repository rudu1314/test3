import { Component, Input } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogin: boolean = true;
  menuOpen: boolean = false;

  @Input() userName2!:string;
  @Input() userEmail2!:string;

  constructor(private rotuer: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  changePage() {
    this.rotuer.navigateByUrl('/comp2');
  }

  checkUser() {
    if (this.isLogin) {
      this.rotuer.navigateByUrl('/test');
    } else {
      alert('未登入，跳轉失敗');
    }
  }

  ngOnInit(): void {}
}
