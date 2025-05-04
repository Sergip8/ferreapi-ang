export interface FormField {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  options?: any[];
  validations?: Validation[];
  sectionTitle?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternError?: string;
  properties?: ObjectProperty[];
}
interface ObjectProperty {
  key: string;
  label: string;
  type: string;
  options?: any[];
  required?: boolean;
  defaultValue?: any;
}

interface Validation {
  type: string;
  message: string;
  value?: any;
}