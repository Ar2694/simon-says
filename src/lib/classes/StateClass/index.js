export default class StateClass {
  constructor(state = {}, setState = null) {
    this.state = state;
    this.setState = setState;
  }

  set(path = [], value) {
    if (!Array.isArray(path)) {
      throw new Error("Path must be an array");
    }

    const setValueAtPath = (path = [], state, value) => {
      const pathMapped = path.map((key) => (isNaN(key) ? key : `${key}`));

      if (pathMapped.length === 0) {
        return value;
      }

      const [key, ...restPath] = pathMapped;

      if (typeof key !== "string" || key.trim() === "") {
        return state;
      }

      const nextState = Array.isArray(state) ? [...state] : { ...state };

      if (restPath.length === 0) {
        nextState[key] = value;
      } else {
        const childState = nextState[key] ?? (isNaN(restPath[0]) ? {} : []);
        nextState[key] = setValueAtPath(restPath, childState, value);
      }

      if (Array.isArray(nextState)) {
        for (let index = 0; index < nextState.length; index += 1) {
          if (nextState[index] === undefined) {
            nextState[index] = null;
          }
        }
      }

      return nextState;
    };

    const nextState = setValueAtPath(path, this.state, value);
    this.state = nextState;
    return this;
  }

  setEach(path = [], callback) {
    if (typeof callback !== "function") {
      return this;
    }

    if (path.length === 0) {
      return this.setEachDeep(path, callback);
    }

    const currentValue = this.get(path);

    if (
      currentValue === null ||
      currentValue === undefined ||
      typeof currentValue !== "object"
    ) {
      return this;
    }

    const nextValue = Array.isArray(currentValue)
      ? currentValue.map((item, index) => {
          const updatedValue = callback(item, index, currentValue);
          return updatedValue === undefined ? item : updatedValue;
        })
      : Object.keys(currentValue).reduce((acc, key) => {
          const item = currentValue[key];
          const updatedValue = callback(item, key, currentValue);
          acc[key] = updatedValue === undefined ? item : updatedValue;
          return acc;
        }, {});

    this.set(path, nextValue);

    return this;
  }

  setEachDeep(path = [], callback) {
    if (typeof callback !== "function") {
      return this;
    }

    const currentValue = this.get(path);

    if (
      currentValue === null ||
      currentValue === undefined ||
      typeof currentValue !== "object"
    ) {
      return this;
    }

    const applyRecursively = (value) => {
      if (value === null || value === undefined || typeof value !== "object") {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map((item, index) => {
          const nestedValue = applyRecursively(item);
          const updatedValue = callback(nestedValue, index, value);
          return updatedValue === undefined ? nestedValue : updatedValue;
        });
      }

      return Object.keys(value).reduce((acc, key) => {
        const nestedValue = applyRecursively(value[key]);
        const updatedValue = callback(nestedValue, key, value);
        acc[key] = updatedValue === undefined ? nestedValue : updatedValue;
        return acc;
      }, {});
    };

    const nextValue = applyRecursively(currentValue);
    this.set(path, nextValue);

    return this;
  }

  walkDeep(path = [], callback) {
    if (typeof callback !== "function") {
      return this;
    }

    const currentValue = this.get(path);

    const walk = (value) => {
      if (value === null || value === undefined || typeof value !== "object") {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          walk(item);
          callback(item, index, value);
        });
        return;
      }

      Object.keys(value).forEach((key) => {
        walk(value[key]);
        callback(value[key], key, value);
      });
    };

    walk(currentValue);
    return this;
  }

  get(path = []) {
    const getValueAtPath = (path = [], state) => {
      const pathMapped = path.map((key) => (isNaN(key) ? key : `${key}`));

      if (pathMapped.length === 0) {
        return state;
      }

      const [key, ...restPath] = pathMapped;

      if (Array.isArray(state)) {
        const index = parseInt(key, 10);
        if (isNaN(index) || index < 0 || index >= state.length) {
          return undefined;
        }
        return getValueAtPath(restPath, state[index]);
      }

      return getValueAtPath(restPath, state[key]);
    };

    return getValueAtPath(path, this.state);
  }

  commit() {
    if (this.setState !== null) {
      this.setState(this.state);
    }

    return this;
  }

  bind(state = {}, setState = null) {
    this.state = state;
    this.setState = setState;

    return this;
  }

  initState(state) {
    this.set([], state ?? {});
    return this;
  }

  static init(state, setState) {
    return new StateClass(state, setState);
  }
}
