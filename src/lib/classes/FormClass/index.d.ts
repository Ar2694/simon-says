import StateClass from '../StateClass';

export interface FormSchemaDefinition {
  isRequired?: boolean;
  isObject?: boolean;
  isArray?: boolean;
  errorMessage?: string | null;
  fields?: Record<string, any> | null;
}

export interface FormFieldState {
  value: any;
  error: boolean;
  errorMessage: string | null;
}

export interface FormSchemaHelpers {
  define: (schema?: Record<string, any>) => FormSchemaDefinition;
  defineArray: (schema?: Record<string, any>) => FormSchemaDefinition;
  defineObject: (schema?: Record<string, any>) => FormSchemaDefinition;
}

export default class FormClass extends StateClass {
  baseSchema: FormSchemaDefinition;
  baseInputData: FormFieldState;

  constructor(state?: any, setState?: any);

  define(schema?: Record<string, any>): FormSchemaDefinition;
  defineArray(schema?: Record<string, any>): FormSchemaDefinition;
  defineObject(schema?: Record<string, any>): FormSchemaDefinition;
  setSchema(callback?: (helpers: FormSchemaHelpers) => Record<string, any>): this;
  setData(data?: Record<string, any>): this;
  addFieldToArray(path?: Array<string | number>, item?: Record<string, any>): this;
  addToArray(path?: Array<string | number>, count?: number): this;
  removeFromArray(path?: Array<string | number>, count?: number): this;
  removeAtArray(path?: Array<string | number>, index?: number): this;
  updateField(path?: Array<string | number>, value?: string): this;
  validateField(path?: Array<string | number>): this;
  getSchemaMap(path?: Array<string | number>): any;
  validateForm(): this;
  getErrors(): this;
  clearErrors(): this;
  clearForm(): this;
  buildForm(): this;
  initForm(): this;
}
