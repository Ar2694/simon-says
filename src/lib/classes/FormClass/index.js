import StateClass from "../StateClass";

/**
 * Form helper built on top of StateClass.
 * @class
 * @extends StateClass
 */
export default class FormClass extends StateClass {

    constructor(state = {}, setState = null) {
        super(state, setState);
        this.baseSchema = {
            isRequired: true,
            isObject: false,
            isArray: false,
            errorMessage: null,
            fields: null
        };

        this.baseInputData = {
            value: null,
            error: false,
            errorMessage: null
        };
    }

    // Helper methods to define schema for form fields
    define(schema = {}) {
        return {
            ...this.baseSchema,
            ...schema
        };
    }

    defineArray(schema = {}) {
        return {
            ...this.baseSchema,
            isArray: true,
            ...schema
        };
    }

    defineObject(schema = {}) {
        return {
            ...this.baseSchema,
            isObject: true,
            ...schema
        };
    }

    setSchema(callback) {
        if (typeof callback !== "function") {
            return this;
        }

        const formSchema = callback({
            define: this.define.bind(this),
            defineArray: this.defineArray.bind(this),
            defineObject: this.defineObject.bind(this)
        });

        this.set(["schema"], formSchema);

        return this;
    }

    setData(data = {}) {
        this.set(["data"], data);
        return this;
    }


    addFieldToArray(path = [], item = {}) {
        const currentArray = this.get(["form", ...path]);
        if (Array.isArray(currentArray)) {
            const newItem = { ...this.baseInputData, ...item };
            this.set(["form", ...path], [...currentArray, newItem]);
        }
        return this;
    }

    addToArray(path = [], count = 1) {
        const currentArray = this.get(["form", ...path]);
        const currentSchema = this.getSchemaMap(path);
        if (Array.isArray(currentArray) && currentSchema && currentSchema.fields) {
            const newItems = Array.from({ length: count }, () => {
                const newItem = {};
                for (const key in currentSchema.fields) {
                    newItem[key] = { ...this.baseInputData };
                }
                return newItem;
            });
            this.set(["form", ...path], [...currentArray, ...newItems]);
        }
        return this;
    }

    removeFromArray(path = [], count = 1) {
        const currentArray = this.get(["form", ...path]);
        if (Array.isArray(currentArray) && count > 0) {
            const updatedArray = currentArray.slice(0, currentArray.length - count);
            this.set(["form", ...path], updatedArray);
        }
        return this;
    }

    removeAtArray(path = [], index = 0) {
        const currentArray = this.get(["form", ...path]);
        if (Array.isArray(currentArray) && index >= 0 && index < currentArray.length) {
            const updatedArray = [...currentArray.slice(0, index), ...currentArray.slice(index + 1)];
            this.set(["form", ...path], updatedArray);
        }
        return this;
    }

    updateField(path = [], value) {
        const currentField = this.get(["form", ...path]);
        let withoutSpaces = value ? value.replace(/^\s+/g, '') : "";
        let updatedField = { ...currentField, value: withoutSpaces };
        this.set(["form", ...path], updatedField);

        return this;
    }

    validateField(path = []) {
        const currentSchema = this.getSchemaMap(path);
        const currentField = this.get(["form", ...path]);

        if (currentSchema && currentField) {
            let isError = false;

            if (currentSchema.isRequired && (currentField.value === null || currentField.value === undefined || currentField.value === '')) {
                isError = true;
            }

            const updatedField = {
                ...currentField,
                error: isError,
            };

            this.set(["form", ...path], updatedField);
        }

        return this;
    }

    getSchemaMap(path = []) {
        const pathMapped = path.map((key) => isNaN(key) ? key : "fields");
        const schema = this.get(["schema", ...pathMapped]);

        return schema;
    }

    validateForm() {

        this.setEachDeep(["form"], (nestedValue, key) => {

            if (nestedValue && nestedValue.hasOwnProperty("value") && nestedValue.hasOwnProperty("error")) {
                let currentError = nestedValue.error;

                this.walkDeep(["schema"], (schema, schemaKey) => {
                    if (schemaKey === key) {
                        if (schema.isRequired && (nestedValue.value === null || nestedValue.value === undefined || nestedValue.value === '')) {
                            currentError = true;
                        } else {
                            currentError = false;
                        }
                    }
                })

                return {
                    ...nestedValue,
                    error: currentError,
                };

            }

        });

        return this;
    }

    getErrors() {
        let errorStore = [];

        this.walkDeep(["form"], (nestedValue) => {
            if (nestedValue && nestedValue.hasOwnProperty("error")) {
                if (nestedValue.error) {
                    errorStore.push(nestedValue);
                }
            }
        });

        this.set(["errors"], errorStore);

        return this;
    }

    clearErrors() {
        this.setEachDeep(["form"], (nestedValue) => {
            if (nestedValue && nestedValue.hasOwnProperty("error")) {
                return {
                    ...nestedValue,
                    error: false,
                };
            }
        });

        return this;
    }

    clearForm() {

        this.setEachDeep(["form"], (nestedValue) => {
            if (nestedValue && nestedValue.hasOwnProperty("value")) {
                return {
                    ...nestedValue,
                    value: "",
                };
            }
        });

        return this;
    }

    buildForm() {
        const schema = this.get(["schema"]);
        const data = this.get(["data"]);
        const buildFromSchema = (schemaNode, dataNode) => {
            if (!schemaNode || typeof schemaNode !== 'object') {
                return {};
            }

            return Object.keys(schemaNode).reduce((acc, key) => {
                const fieldSchema = schemaNode[key];

                if (!fieldSchema || typeof fieldSchema !== 'object') {
                    return acc;
                }

                const fieldData = (dataNode && dataNode[key] !== undefined) ? dataNode[key] : "";

                if (fieldSchema.isObject && fieldSchema.fields) {
                    const objectData = (fieldData && typeof fieldData === 'object') ? fieldData : {};
                    acc[key] = buildFromSchema(fieldSchema.fields, objectData);
                } else if (fieldSchema.isArray && fieldSchema.fields) {
                    const items = Array.isArray(fieldData) ? fieldData : [];
                    const defaultItem = buildFromSchema(fieldSchema.fields, {});
                    acc[key] = items.length > 0 ? items.map((item) => buildFromSchema(fieldSchema.fields, item)) : [defaultItem];
                } else {
                    acc[key] = {
                        ...this.baseInputData,
                        value: fieldData,
                        errorMessage: fieldSchema.errorMessage
                    };
                }

                return acc;
            }, {});
        };

        const formData = buildFromSchema(schema, data);
        this.set(["form"], formData);

        return this;
    }

    initForm() {
        const initState = {
            errors: [],
            schema: {},
            data: {},
            form: {}
        };

        this.set([], initState);
        return this;
    }

    static init(callback = null) {
        return new FormClass().initForm().setSchema(callback);
    }

}