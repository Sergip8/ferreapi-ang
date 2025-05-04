import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { FormValidationComponent } from '../../../_shared/components/form-validation/form-validation.component';
import { CommonModule } from '@angular/common';
import { PublicRoutes } from '../../public.routes';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormValidationComponent, ReactiveFormsModule, CommonModule, RouterLink],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }
  publicRoutes = PublicRoutes;

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('repeatPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { email, password } = this.registerForm.value;
      
      this.authService.register(email, password).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Registration failed';
          this.isLoading = false;
        }
      });
    }
  }
} 