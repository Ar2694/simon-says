import { useRef } from "react";

export default function useModel() {
    const modelRef = useRef(null);
    const initRef = useRef(null);

    if (!modelRef.current) {

        const model = {
            define(prop, value, contraint, definedObj = {}) {
                const definedProps = { ...definedObj, [prop]: value };
                if (contraint && typeof contraint === 'function') {
                    if (!contraint(value)) {
                        console.error(`Constraint validation failed for property "${prop}" with value:`, value);
                        return definedObj;
                    }
                }

                if (!Array.isArray(prop) && (typeof prop !== 'string' || prop.trim() === '')) {
                    console.error('Property name must be a non-empty string or an array.', prop);
                    return definedObj;
                }
                if (Array.isArray(prop)) {

                    return this.addProp(prop, value, definedObj);
                }
                return definedProps;
            },

            addProp(path = [], value, state) {
                if (path.length === 0) {
                    console.error('Path cannot be an empty array.');
                    return state;
                }
                const [key, ...restPath] = path;

                if (typeof key !== 'string' || key.trim() === '') {
                    console.error('Each key in the path must be a non-empty string.', key);
                    return state;
                }
                const newState = Array.isArray(state) ? [...state] : { ...state };

                if (restPath.length === 0) {
                    newState[key] = value;
                } else {
                    newState[key] = this.addProp(restPath, value, newState[key] || (isNaN(restPath[0]) ? {} : []));
                }

                // Fill array gaps with null
                if (Array.isArray(newState)) {
                    for (let i = 0; i < newState.length; i++) {
                        if (newState[i] === undefined) {
                            newState[i] = null;
                        }
                    }
                }

                return newState;

            },
            update(path = [], state, value) {

                const updateState = (path = [], state, value) => {
                    if (path.length === 0) return value;
                    const [key, ...restPath] = path;
                    if (Array.isArray(state)) {
                        const index = parseInt(key, 10);
                        if (isNaN(index) || index < 0 || index >= state.length) {
                            console.error(`Invalid array index: ${key}`);
                            return state;
                        }
                        return state.map((item, idx) =>
                            idx === index ? updateState(restPath, item, value) : item
                        );
                    }
                    return { ...state, [key]: updateState(restPath, state[key], value) };
                }
                return updateState(path, state, value);
            },


            //suport array indexing with dot notation, e.g. "users.0.name"
            get(path = [], state) {
                if (path.length === 0) {
                    return state;
                }

                const [key, ...restPath] = path;
                if (Array.isArray(state)) {
                    const index = parseInt(key, 10);
                    if (isNaN(index) || index < 0 || index >= state.length) {
                        console.error(`Invalid array index: ${key}`);
                        return undefined;
                    }
                    return this.get(restPath, state[index]);
                }
                return this.get(restPath, state[key]);
            },
            extendMethods(s, m) {
                const chainMethods = m ?? {};
                const chainState = s ?? {};

                const extendedMethods = Object.keys(chainMethods).reduce((acc, methodName) => {
                    acc[methodName] = (...args) => {
                        const result = chainMethods[methodName](this.buildChain(chainState, chainMethods), chainState, ...args);
                        if (result !== undefined) {
                            return this.buildChain(result, chainMethods);
                        }
                        return this.buildChain(chainState, chainMethods);
                    };
                    return acc;
                }, {});
                return extendedMethods;
            },
            buildChain(s, m) {
                const chainMethods = m ?? {};
                const chainState = s ?? {};
                const extendedMethods = this.extendMethods(chainState, chainMethods);

                return {
                    define: (prop, value, contraint) => this.buildChain(this.define(prop, value, contraint, chainState), chainMethods),
                    update: (path, value) => this.buildChain(this.update(path, chainState, value), chainMethods),
                    set: (obj = {}) => this.buildChain({ ...obj }, chainMethods),
                    get: (path) => this.get(path, chainState),
                    extend: (newMethods) => this.buildChain(chainState, { ...newMethods }),
                    init: () => this.buildChain(),
                    state: chainState,
                    ...extendedMethods
                }
            },


        };

        modelRef.current = {
            initModel: model.buildChain(),
            initRef: (value) => {
                if (initRef.current !== null) {
                    return initRef;
                }

                initRef.current = value ?? null;
                return initRef;
            }
        }

    }


    return modelRef.current;
}

