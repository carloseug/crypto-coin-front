import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  loginValid = true;
  name = '';
  email = '';
  password = '';
  passwordConfirmation = '';
  errorMessage = '';

  private destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    }

    this.authService.signup(payload).subscribe(
      response => {
        if (response.error) {
          this.loginValid = false;
          this.errorMessage = response.error.message;
        } else {
          this.router.navigate(['login']);
        }
      },
      error => {
        console.error('Erro durante o signup:', error);
        this.errorMessage = error.error.message;
        this.loginValid = false;
      }
    );
  }
}