export default class ControlClass {
  state: any;
  setState: any;
  controls: {
    clicks: Record<string, Array<(...args: any[]) => any>>;
    changes: Record<string, Array<(...args: any[]) => any>>;
    effects: Record<string, Array<(...args: any[]) => any>>;
    calls: Record<string, Array<(...args: any[]) => any>>;
  };
  events: Record<string, any>;

  constructor(state?: any, setState?: any, events?: Record<string, any>);

  build(): this;
  dispatch(name: string, eventKey: string, callback: (...args: any[]) => any, ...args: any[]): any;
  createEvent(eventName: string, eventKey: string, evtCallback: (...args: any[]) => any, ...args: any[]): (evt?: any) => any;
  handleClick(name: string, ...args: any[]): (evt?: any) => any;
  onClick(name: string, ...args: any[]): (evt?: any) => any;
  handleChange(name: string, ...args: any[]): (evt?: any) => any;
  onChange(name: string, ...args: any[]): (evt?: any) => any;
  handleEffect(name: string, ...args: any[]): any;
  handleCall(name: string, ...args: any[]): any;
  loadEffects(): void;

  static init(state?: any, setState?: any, events?: Record<string, any>): ControlClass;
}
