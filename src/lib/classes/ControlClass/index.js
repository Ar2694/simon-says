export default class ControlClass {
    constructor(state = {}, setState = null, events = {}) {
        this.state = state;
        this.setState = setState;

        this.controls = {
            clicks: {},
            changes: {},
            effects: {},
            calls: {}
        };
        this.events = events || {};
    }

    build() {
        Object.keys(this.events).forEach((eventName) => {
            const eventKeys = this.events[eventName];

            if (eventKeys) {
                Object.keys(eventKeys).forEach((eventKey) => {
                    const callback = eventKeys[eventKey];
                    const controlKeys = this.controls[eventName];

                    if (!controlKeys[eventKey]) {
                        controlKeys[eventKey] = []
                    }

                    if (typeof callback === "function") {
                        controlKeys[eventKey].push(callback);
                    }
                });
            }
        });

        return this;
    }

    //   General method for events and controls
    dispatch(name, eventKey, callback, ...args) {

        if (!this.controls[name] || !this.controls[name][eventKey]) {
            return new Error(`No listeners for event: ${name} with key: ${eventKey}`);
        }

        for (const cb of this.controls[name][eventKey]) {
            return callback({ ...this.state }, this.setState, cb, ...args);
        }

    }

    createEvent(eventName, eventKey, evtCallback, ...args) {
        return (evt) => {
            if (!this.controls[eventName] || !this.controls[eventName][eventKey]) {
                return new Error(`No listeners for event: ${eventName} with key: ${eventKey}`);
            }

            for (const callback of this.controls[eventName][eventKey]) {
                return evtCallback(evt, { ...this.state }, this.setState, callback, ...args);
            }
        };
    }

    // General custom events
    handleClick(name, ...args) {
        return this.createEvent("clicks", name, (evt, state, setState, callback, ...args) => {
            setState((prevState) => {
                const nextState = callback({ ...state }, ...args);
                return nextState !== undefined ? nextState : { ...prevState };
            });
        }, ...args);
    }

    onClick(name, ...args) {
        return this.createEvent("clicks", name, (evt, state, setState, callback, ...args) => {
            return callback({ ...state }, setState, ...args);
        }, ...args);
    }

    handleChange(name, ...args) {
        return this.createEvent("changes", name, (evt, state, setState, callback, ...args) => {
            const evtProps = {
                value: evt?.target?.value ?? null,
            };

            setState((prevState) => {
                const nextState = callback({ ...state }, evtProps, ...args);
                return nextState !== undefined ? nextState : { ...prevState };
            });
        }, ...args);
    }

    onChange(name, ...args) {
        return this.createEvent("changes", name, (evt, state, setState, callback, ...args) => {
            const evtProps = {
                value: evt?.target?.value ?? null,
            };

            return callback({ ...state }, setState, evtProps, ...args);
        }, ...args);
    }

    // General custom controls
    handleEffect(name, ...args) {
        return this.dispatch("effects", name, (state, setState, callback, ...args) => {

            return callback({ ...state }, setState, ...args);
        }, ...args);
    }

    handleCall(name, ...args) {
        return this.dispatch("calls", name, (state, setState, callback, ...args) => {
            return callback({ ...state }, setState, ...args);
        }, ...args);
    }

    loadEffects() {
        Object.keys(this.controls.effects).forEach((effectName) => {
            this.handleEffect(effectName);
        });
    }


    static init(state = {}, setState = null, events = {}) {
        return new ControlClass(state, setState, events);
    }
}
