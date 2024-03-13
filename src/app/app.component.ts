import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './api/auth.service';
import { TokenService } from './api/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'crypto-coin-front';
  public loggedIn = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
    ) {}

  @ViewChild('drawer') drawer!: MatDrawer;

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    )
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
  
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  exit(){
    this.tokenService.removeLocalToken();
    this.authService.changeAuthStatus(false);
    this.navigateTo('login');
  }
}
