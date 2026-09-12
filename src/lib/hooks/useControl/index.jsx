import { useEffect, useRef, useState } from "react";

export default function useControl(initialState, props) {
    const { onChanges = null, onClicks = null, onEffects = null, onEvents = null, onCalls = null } = props ?? {}
    const [state, setState] = useState(initialState ?? {});
    const controlRef = useRef(null);

    if (!controlRef.current) {

        const control = {
            state,
            clicks: {},
            changes: {},
            effects: {},
            events: {},
            calls: {},
            // Utility methods for defining control
            // Handling side effects, such as data fetching or subscriptions
            effect(name, callback) {

                if (!this.effects[name]) {
                    this.effects[name] = [];
                }
                this.effects[name].push(callback);
                return this;
            },
            handleEffect(name, ...args) {

                if (!this.effects[name]) {
                    return new Error(`No listeners for event: ${name}`);
                }

                this.effects[name].forEach((callback) => {
                    if (callback instanceof Function) {
                        callback({ ...controlRef.current.state }, setState, ...args);
                    }
                });

            },

            // Handling input changes, such as form fields
            change(name, callback) {
                if (!this.changes[name]) {
                    this.changes[name] = [];
                }
                this.changes[name].push(callback);
                return this;
            },
            handleChange(name, ...args) {
                return (evt) => {
                    const value = evt.target.value;

                    if (!this.changes[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    this.changes[name].forEach((callback) => {
                        setState((prevState) => {
                            const nextState = callback({ ...prevState }, value, ...args);
                            return nextState !== undefined ? nextState : { ...prevState };
                        });
                    });
                };
            },
            onChange(name, ...args) {
                return (evt) => {
                    const value = evt.target.value;

                    if (!this.changes[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    for (const callback of this.changes[name]) {
                        return callback({ ...controlRef.current.state }, setState, value, ...args);
                    }
                };
            },

            // Handling click events, such as button presses
            click(name, callback) {
                if (!this.clicks[name]) {
                    this.clicks[name] = [];
                }
                this.clicks[name].push(callback);
                return this;
            },
            handleClick(name, ...args) {
                return () => {
                    if (!this.clicks[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    this.clicks[name].forEach((callback) => {
                        setState((prevState) => {
                            const nextState = callback({ ...controlRef.current.state }, ...args);
                            return nextState !== undefined ? nextState : { ...prevState };
                        });
                    });
                };
            },
            onClick(name, ...args) {
                return () => {
                    if (!this.clicks[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    for (const callback of this.clicks[name]) {
                        return callback({ ...controlRef.current.state }, setState, ...args);
                    }
                };
            },
            // General event handler for custom events
            event(name, callback) {
                if (!this.events[name]) {
                    this.events[name] = [];
                }
                this.events[name].push(callback);
                return this;
            },
            handleEvent(name, ...args) {

                return (evt) => {
                    if (!this.events[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    this.events[name].forEach((callback) => {
                        setState((prevState) => {
                            const nextState = callback(evt, { ...controlRef.current.state }, ...args);
                            return nextState !== undefined ? nextState : { ...prevState };
                        });
                    });

                }
            },
            onEvent(name, ...args) {

                return (evt) => {
                    if (!this.events[name]) {
                        return new Error(`No listeners for event: ${name}`);
                    }
                    for (const callback of this.events[name]) {
                        return callback(evt, { ...controlRef.current.state }, setState, ...args);
                    }
                }
            },
            // General event handler for custom calls
            call(name, callback) {
                if (!this.calls[name]) {
                    this.calls[name] = [];
                }
                this.calls[name].push(callback);
                return this;
            },
            handleCall(name, ...args) {
                if (!this.calls[name]) {
                    return new Error(`No listeners for call: ${name}`);
                }
                this.calls[name].forEach((callback) => {
                    setState((prevState) => {
                        const nextState = callback({ ...controlRef.current.state }, ...args);
                        return nextState !== undefined ? nextState : { ...prevState };
                    });
                });
            },
            onCall(name, ...args) {

                if (!this.calls[name]) {
                    return new Error(`No listeners for call: ${name}`);
                }
                for (const callback of this.calls[name]) {
                    return callback({ ...controlRef.current.state }, setState, ...args);
                }

            },
            // Handling initial control
            initEffect() {
                if (onEffects && Object.keys(onEffects).length > 0) {
                    Object.keys(controlRef.current.effects).forEach(effectName => {
                        this.handleEffect(effectName);
                    });
                }

            },
            init() {
                if (onChanges && Object.keys(onChanges).length > 0) {
                    Object.keys(onChanges).forEach(key => this.change(key, onChanges[key]));
                }

                if (onClicks && Object.keys(onClicks).length > 0) {
                    Object.keys(onClicks).forEach(key => this.click(key, onClicks[key]));
                }

                if (onEffects && Object.keys(onEffects).length > 0) {
                    Object.keys(onEffects).forEach(key => this.effect(key, onEffects[key]));
                }

                if (onEvents && Object.keys(onEvents).length > 0) {
                    Object.keys(onEvents).forEach(key => this.event(key, onEvents[key]));
                }
                
                if (onCalls && Object.keys(onCalls).length > 0) {
                    Object.keys(onCalls).forEach(key => this.call(key, onCalls[key]));
                }

                return this;
            }

        };

        controlRef.current = control.init();
    } else {
        controlRef.current.state = state;
    }

    useEffect(() => {
        if (controlRef.current) {
            controlRef.current.initEffect();
        }

    }, [])

    return { control: controlRef.current };
}

