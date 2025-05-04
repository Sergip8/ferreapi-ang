import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-user-button',
  standalone: true,
  template: `
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" (click)="createUser.emit()">
      Crear Usuario
    </button>
  `,
  styles: ''
})
export class CreateUserButtonComponent {
  @Output() createUser = new EventEmitter<void>();
}
