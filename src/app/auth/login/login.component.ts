import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { TokenService } from '../../api/token.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginValid = true;
  email = '';
  password = '';
  loginError = '';

  private destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/game';
  }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this.destroySub$.next();
  }

  public onSubmit(): void {
    let payload = {
      email: this.email,
      password: this.password
    }

    this.authService.login(payload).subscribe(
      response => {
        if (!response.error) {
          this.handleAuth(response.access_token);
        }
      },
      error => {
        console.error('Erro durante o login:', error);
        this.loginValid = false;
        this. loginError = error.error.error;
      }
    );
  }

  handleAuth(accessToken: string){
    this.tokenService.setAccessToken(accessToken);
    this.authService.changeAuthStatus(true);
    this.router.navigate(['coins']);
  }
}