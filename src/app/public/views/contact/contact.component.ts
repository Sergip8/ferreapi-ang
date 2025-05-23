import { Component } from '@angular/core';
import { Marker } from '../../../models/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
    
  }
markers = [
  new Marker(4.624335, -74.063644)
  
]
isSubmitting = false;
submitted = false;



onSubmit() {
  this.submitted = true;

  if (this.contactForm.invalid) {
    return;
  }

  this.isSubmitting = true;

  const formData = this.contactForm.value;

  // Simular envío (puedes usar HttpClient aquí)
  setTimeout(() => {
    console.log('Form sent:', formData);
    alert('Mensaje enviado con éxito');
    this.contactForm.reset();
    this.submitted = false;
    this.isSubmitting = false;
  }, 2000);
}

}
