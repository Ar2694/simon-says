const formMethods = {
    // helper methods for defining form schema and building form state
    defineSchema(schema = {}) {
        const baseSchema = {
            isRequired: true,
            arrayCountId: null,
            ...schema
        }
        return baseSchema
    },
    defineArraySchema(schema = {}) {
        const baseSchema = {
            isRequired: true,
            isArray: true,
            fields: null,
            ...schema
        }
        return baseSchema
    },
    defineObjectSchema(schema = {}) {
        const baseSchema = {
            isRequired: true,
            fields: null,
            ...schema
        }
        return baseSchema
    },
    buildForm(schema = {}, data) {
        const formData = Object.keys(schema).reduce((acc, key) => {
            const fieldSchema = schema[key];
            const fieldData = data ? data[key] : undefined;

            if (fieldSchema.isArray) {
                acc[key] = Array.isArray(fieldData)
                    ? fieldData.map((item, index) => this.buildForm(fieldSchema.fields, item))
                    : [];
            } else if (fieldSchema.fields) {
                acc[key] = this.buildForm(fieldSchema.fields, fieldData);
            } else {
                acc[key] = {
                    value: fieldData !== undefined ? fieldData : "",
                    error: null,
                    isRequired: fieldSchema.isRequired || false,
                    isUpdated: false
                };
            }

            return acc;
        }, {});

        return formData;
    },
    hasErrors(form) {
        let hasError = false;
        const checkErrors = (form) => {
            Object.keys(form).forEach((key) => {
                if (hasError) return;
                const field = form[key];
                if (field && typeof field === "object" && "error" in field && field.error) {
                    hasError = true;
                    return;
                }
                if (Array.isArray(field)) {
                    field.forEach((item) => checkErrors(item));
                } else if (field && typeof field === "object" && !("value" in field)) {
                    checkErrors(field);
                }
            });
        };
        checkErrors(form);
        return hasError;
    },
    validateFields(form) {
        let updatedForm = { ...form };
        Object.keys(form).forEach((key) => {

            if (Array.isArray(form[key])) {

                updatedForm[key] = form[key].map((item) => this.validateFields(item));
            } else if (typeof form[key] === "object" && form[key] !== null) {
                updatedForm[key] = this.validateFields(form[key]);
            } else {

                const currentValue = updatedForm.value;
                const isEmptyString = typeof currentValue === "string" && currentValue.trim() === "";
                const isNull = currentValue === null;
                const isUndefined = currentValue === undefined;

                if (updatedForm.isRequired && (isEmptyString || isNull || isUndefined)) {
                    updatedForm.error = true;
                    updatedForm.isUpdated = true;
                } else {
                    updatedForm.error = false;
                    updatedForm.isUpdated = true;
                }

            }
        });

        return updatedForm;
    },
    getFormData(form) {
        let formData = {};
        Object.keys(form).forEach((key) => {
            if (Array.isArray(form[key])) {
                formData[key] = form[key].map((item) => this.getFormData(item));
            } else if (typeof form[key] === "object" && form[key] !== null && !("value" in form[key])) {
                formData[key] = this.getFormData(form[key]);
            } else if (form[key] && typeof form[key] === "object" && "value" in form[key]) {
                formData[key] = form[key].value;
            }
        });
        return formData;
    },

    // extended methods for form handling
    updateField(model, state, prop = [], value) {
        let updateModel = model.set(state);
        if (prop.length === 0) {
            return updateModel.state;
        }

        const targetField = updateModel.get(["model", "form", ...prop]);

        if (!targetField || typeof targetField !== "object") {
            return updateModel.state;
        }

        const updatedField = {
            ...targetField,
            value,
            isUpdated: true
        };

        return updateModel
            .update(["model", "form", ...prop], updatedField)
            .state;
    },
    validateField(model, state, prop = []) {
        let updateModel = model.set(state);
        const targetField = updateModel.get(["model", "form", ...prop]);

        if (prop.length === 0 || !targetField || typeof targetField !== "object") {
            return updateModel.state;
        }

        const isEmptyString = typeof targetField.value === "string" && targetField.value.trim() === "";
        const isNull = targetField.value === null;
        const isUndefined = targetField.value === undefined;
        const error = targetField.isRequired && targetField.isUpdated && (isEmptyString || isNull || isUndefined);

        const updatedField = {
            ...targetField,
            error
        };

        return updateModel
            .update(["model", "form", ...prop], updatedField)
            .state;
    },

    validateForm(model, state) {
        let updateModel = model.set(state);
        const form = updateModel.get(["model", "form"]);
        const validatedForm = this.validateFields(form);
        const hasErrors = this.hasErrors(validatedForm);
        const formData = this.getFormData(validatedForm);

        return updateModel
            .update(["model", "form"], validatedForm)
            .update(["model", "formData"], formData)
            .update(["model", "hasErrors"], hasErrors)
            .state;
    },
    updateArrayCount(model, state, prop = [], count) {
        let updateModel = model.set(state);
        const arrayField = updateModel.get(["model", "form", ...prop]);
        const arraySchema = prop.reduce((acc, key) => isNaN(key) ? [...acc, key] : [...acc, "fields"], []);
        const itemFields = updateModel.get(["model", "schema", ...arraySchema]).fields;

        if (!Array.isArray(arrayField) || !arraySchema || !itemFields) {
            return updateModel.state;
        }

        const newArray = [...arrayField];

        if (newArray.length < count) {
            for (let i = newArray.length; i < count; i++) {
                newArray.push(this.buildForm(itemFields));
            }
        } else if (newArray.length > count) {
            newArray.splice(count);
        }

        return updateModel
            .update(["model", "form", ...prop], newArray)
            .state;
    },
    setForm(model, state, data, callback) {
        let updateModel = model
            .set(state)
            .define(["model", "schema"], {})
            .define(["model", "form"], null)
            .define(["model", "formData"], null)
            .define(["model", "hasErrors"], false);

        const formSchema = callback({
            defineSchema: this.defineSchema,
            defineArraySchema: this.defineArraySchema,
            defineObjectSchema: this.defineObjectSchema
        });

        const form = this.buildForm(formSchema, data);

        return updateModel
            .update(["model", "form"], form)
            .update(["model", "schema"], formSchema)
            .state;
    },

    getForm(model, state, data) {
        let updateModel = model.set(state);
        const formSchema = updateModel.get(["model", "schema"]);
        const formData = data ? data : this.getFormData(updateModel.get(["model", "form"]));
        const form = this.buildForm(formSchema, formData);

        return updateModel.update(["model", "form"], form).state;
    },
    clearForm(model, state) {
        let updateModel = model.set(state);
        const formSchema = updateModel.get(["model", "schema"]);
        const form = this.buildForm(formSchema, null);

        return updateModel.update(["model", "form"], form).state;
    },
    setFormData(model, state, data) {

        let updateModel = model.set(state);
        const form = updateModel.get(["model", "form"]);
        const formData = this.getFormData(form);
        const formSchema = updateModel.get(["model", "schema"]);
        const updatedFormData = { ...formData, ...data };
        const updatedForm = this.buildForm(formSchema, updatedFormData);

        return updateModel
            .update(["model", "form"], updatedForm)
            .update(["model", "formData"], updatedFormData)
            .state;
    },
    clearErrors(model, state) {
        let updateModel = model.set(state);
        return updateModel
            .update(["model", "hasErrors"], false)
            .state;
    }
}

export default formMethods;