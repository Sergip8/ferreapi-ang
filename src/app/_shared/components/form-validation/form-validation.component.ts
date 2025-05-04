import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-validation',
  imports: [CommonModule],
  template: `
    <div *ngIf="control.invalid && (control.dirty || control.touched)" class="text-red-500 text-xs mt-1">
      <div *ngIf="control.errors?.['required']">This field is required</div>
      <div *ngIf="control.errors?.['email']">Please enter a valid email address</div>
      <div *ngIf="control.errors?.['minlength']">Password must be at least 8 characters</div>
      <div *ngIf="control.errors?.['passwordMismatch']">Passwords do not match</div>
    </div>
  `,
  styles: []
})
export class FormValidationComponent {
  @Input() control!: AbstractControl;
} 