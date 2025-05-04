import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule, ValidatorFn } from '@angular/forms';
import { FormField } from '../../../models/form-field';

// Define the FormField interface

@Component({
  selector: 'app-form',
  imports: [NgClass, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FormComponent implements OnInit, OnChanges {
  @Input() formConfig: FormField[] = [];
  @Input() formData: any = {};
  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() showCancelButton: boolean = true;
  @Input() sectionTitle: string = '';
  @Input() nestingLevel: number = 0;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<boolean>();
  
  form: FormGroup;
  fieldKeys: string[] = [];
  formFields: { [key: string]: FormField } = {};
  nestedObjects: { [key: string]: any } = {};
  formValue: any;

  // Field types exposed to template
  readonly fieldTypes = {
    TEXT: 'text',
    NUMBER: 'number',
    EMAIL: 'email',
    PASSWORD: 'password',
    TEXTAREA: 'textarea',
    SELECT: 'select',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    DATE: 'date',
    TIME: 'time',
    OBJECT: 'object',
    OBJECT_PROPERTIES: 'object_properties',
    TEL: 'tel',
    URL: 'url',
    FILE: 'file'
  } as const;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formConfig'] || changes['formData']) {
      this.initForm();
    }
  }

  @ViewChildren(FormComponent) nestedForms!: QueryList<FormComponent>;
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // Reset form
    this.form = this.fb.group({});
    this.formFields = {};
    this.nestedObjects = {};
    
    // Create a map of fields by key for easier access
    this.formConfig.forEach(field => {
      this.formFields[field.key] = field;
    });
    
    this.fieldKeys = Object.keys(this.formFields);
    
    for (const key of this.fieldKeys) {
      const fieldConfig = this.formFields[key];
      const fieldValue = this.formData && this.formData[key] !== undefined ? this.formData[key] : '';
      
      if (this.isNestedObject(fieldConfig)) {
        this.nestedObjects[key] = {
          config: fieldConfig,
          data: fieldValue || {}
        };
      } else if (fieldConfig.type === this.fieldTypes.OBJECT_PROPERTIES && fieldConfig.properties) {
        // Create a FormGroup for object properties
        const objectGroup = this.fb.group({});
        
        // Process each property of the object
        fieldConfig.properties.forEach(property => {
          // Get the value from the formData or use the default
          const propValue = fieldValue && fieldValue[property.key] !== undefined 
            ? fieldValue[property.key] 
            : (property.defaultValue !== undefined ? property.defaultValue : '');
          
          // Create control for each property
          const validators = property.required ? [Validators.required] : [];
          objectGroup.addControl(property.key, new FormControl(propValue, validators));
        });
        
        this.form.addControl(key, objectGroup);
      } else {
        const validators = this.getValidators(fieldConfig);
        if(key !== 'sectionTitle') {
          this.form.addControl(key, new FormControl({value: fieldValue, disabled: fieldConfig.disabled}, validators));
        }
      }
    }
  }
  
  isNestedObject(field: FormField): boolean {
    // Check if the field type is explicitly set to 'object'
    if (field.type === this.fieldTypes.OBJECT) {
      return true;
    }
    
    // Handle nested object detection for new format
    return false;
  }

  getValidators(field: FormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }

    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }

    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }

    if (field.type === this.fieldTypes.EMAIL) {
      validators.push(Validators.email);
    }

    // Handle new validation format
    if (field.validations) {
      field.validations.forEach(validation => {
        switch (validation.type) {
          case 'required':
            // Already handled above
            break;
          case 'min':
            validators.push(Validators.min(validation.value));
            break;
          case 'max':
            validators.push(Validators.max(validation.value));
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          case 'minLength':
            validators.push(Validators.minLength(validation.value));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(validation.value));
            break;
          case 'pattern':
            validators.push(Validators.pattern(validation.value));
            break;
        }
      });
    }

    return validators;
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  getFieldType(key: string): string {
    const fieldConfig = this.formFields[key];
    
    if (!fieldConfig.type) {
      // Try to infer type from field name if not specified
      if (key.toLowerCase().includes('email')) {
        return this.fieldTypes.EMAIL;
      } else if (key.toLowerCase().includes('password')) {
        return this.fieldTypes.PASSWORD;
      } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) {
        return this.fieldTypes.TEL;
      } else if (key.toLowerCase().includes('date')) {
        return this.fieldTypes.DATE;
      } else if (key.toLowerCase().includes('time')) {
        return this.fieldTypes.TIME;
      } else if (key.toLowerCase().includes('description') || key.toLowerCase().includes('notes')) {
        return this.fieldTypes.TEXTAREA;
      }
      return this.fieldTypes.TEXT;
    }
    
    return fieldConfig.type;
  }

  getFieldLabel(key: string): string {
    const fieldConfig = this.formFields[key];
    return fieldConfig.label || this.formatLabel(key);
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  getSectionTitle(key: string): string {
    return this.formFields[key]?.sectionTitle || this.formatLabel(key);
  }

  getNestedObjectKeys(): string[] {
    return Object.keys(this.nestedObjects);
  }

  private isSubmitting = false; 
  
  onSubmit(): void {
    if (this.isSubmitting) return; 
    this.isSubmitting = true;

    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      this.isSubmitting = false;
      return;
    }

    this.nestedForms.forEach((nestedForm) => {
      nestedForm.onSubmit();
    });

    const nestedValues: { [key: string]: any } = {};
    this.nestedForms.forEach((nestedForm, index) => {
      const key = this.getNestedObjectKeys()[index];
      nestedValues[key] = nestedForm.form.value;
    });

    this.formValue = { ...this.form.value, ...nestedValues };
    this.formValue = Object.assign({}, this.formData, this.formValue);
   
    this.formSubmit.emit(this.formValue);
    this.isSubmitting = false; 
  }

  onCancel(): void {
    this.formCancel.emit(this.hasFormChanged());
  }

  handleNestedFormSubmit(key: string, value: any): void {
    this.nestedObjects[key].submittedValue = value;
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  isFieldInvalid(key: string): boolean {
    const control = this.form.get(key);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  getErrorMessage(key: string): string {
    const control = this.form.get(key);
    if (!control || !control.errors) return '';

    const fieldConfig = this.formFields[key];
    
    // Use the custom validation messages if available
    if (fieldConfig.validations) {
      for (const validation of fieldConfig.validations) {
        const errorType = validation.type.toLowerCase();
        
        if (control.errors['required'] && errorType === 'required') {
          return validation.message;
        }
        
        if (control.errors['email'] && errorType === 'email') {
          return validation.message;
        }
        
        if (control.errors['minlength'] && errorType === 'minlength') {
          return validation.message;
        }
        
        if (control.errors['maxlength'] && errorType === 'maxlength') {
          return validation.message;
        }
        
        if (control.errors['pattern'] && errorType === 'pattern') {
          return validation.message;
        }
        
        if (control.errors['min'] && errorType === 'min') {
          return validation.message;
        }
        
        if (control.errors['max'] && errorType === 'max') {
          return validation.message;
        }
      }
    }
    
    // Fallback to default messages
    if (control.errors['required']) {
      return 'This field is required';
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    
    if (control.errors['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    
    if (control.errors['pattern']) {
      return fieldConfig.patternError || 'Invalid format';
    }
    
    if (control.errors['min']) {
      return `Value must be at least ${control.errors['min'].min}`;
    }
    
    if (control.errors['max']) {
      return `Value must be at most ${control.errors['max'].max}`;
    }
    
    return 'Invalid value';
  }

  hasFormChanged(): boolean {
    // Check if main form fields have changed
    for (const key of this.fieldKeys) {
      // Skip nested objects and special fields
      if (this.nestedObjects[key] || key === 'sectionTitle' || key.endsWith('id')) {
        continue;
      }
      
      const control = this.form.get(key);
      if (control) {
        // Compare current value with original value
        const currentValue = control.value;
        const originalValue = this.formData[key] !== undefined ? this.formData[key] : '';
        
        // Handle different types of comparisons
        if (typeof currentValue === 'object') {
          // For objects, compare stringified versions
          if (JSON.stringify(currentValue) !== JSON.stringify(originalValue)) {
            return true;
          }
        } else {
          // For primitive types, direct comparison
          // Also handle empty string vs null/undefined cases
          const normalizedCurrent = currentValue === '' ? null : currentValue;
          const normalizedOriginal = originalValue === '' ? null : originalValue;
          
          if (normalizedCurrent !== normalizedOriginal) {
            return true;
          }
        }
      }
    }
    
    // Check if nested forms have changed
    if (this.nestedForms) {
      for (const nestedForm of this.nestedForms.toArray()) {
        if (nestedForm.hasFormChanged()) {
          return true;
        }
      }
    }
    
    // No changes detected
    return false;
  }

  getFieldOptions(key: string): any[] {
    const fieldConfig = this.formFields[key];
    return fieldConfig.options || [];
  }

  getJsonKeys(key: string): string[] {
    const control = this.form.get(key);
    if (control instanceof FormGroup) {
      return Object.keys(control.controls);
    }
    return [];
  }

  getJsonFieldType(key: string, attrKey: string): string {
    const fieldConfig = this.formFields[key];
    // This method might need to be updated based on how you handle nested object properties in the new model
    
    const value = this.form.get(key)?.get(attrKey)?.value;
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    return 'text';
  }
}