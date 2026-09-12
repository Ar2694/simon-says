export interface FormSchemaField {
  isRequired?: boolean;
  isArray?: boolean;
  fields?: Record<string, any> | null;
  [key: string]: any;
}

export interface FormMethods {
  defineSchema: (schema?: Record<string, any>) => Record<string, any>;
  defineArraySchema: (schema?: Record<string, any>) => Record<string, any>;
  defineObjectSchema: (schema?: Record<string, any>) => Record<string, any>;
  buildForm: (schema?: Record<string, any>, data?: any) => Record<string, any>;
  hasErrors: (form: Record<string, any>) => boolean;
  validateFields: (form: Record<string, any>) => Record<string, any>;
  getFormData: (form: Record<string, any>) => Record<string, any>;
  updateField: (model: any, state: any, prop?: string[], value?: any) => any;
  validateField: (model: any, state: any, prop?: string[]) => any;
  validateForm: (model: any, state: any) => any;
  updateArrayCount: (model: any, state: any, prop?: string[], count?: number) => any;
  setForm: (model: any, state: any, data: any, callback: (helpers: any) => Record<string, any>) => any;
  getForm: (model: any, state: any, data?: any) => any;
  clearForm: (model: any, state: any) => any;
  setFormData: (model: any, state: any, data: Record<string, any>) => any;
  clearErrors: (model: any, state: any) => any;
}

const formMethods: FormMethods;
export default formMethods;
