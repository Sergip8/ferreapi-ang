import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { FormValidationComponent } from '../../../_shared/components/form-validation/form-validation.component';
import { CommonModule } from '@angular/common';
import { PublicRoutes } from '../../public.routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormValidationComponent, ReactiveFormsModule, CommonModule, RouterLink],
  //styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  publicRoutes = PublicRoutes;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed';
          this.isLoading = false;
        }
      });
    }
  }
} 