export default class StateClass {
  state: any;
  setState: any;

  constructor(state?: any, setState?: any);

  set(path?: Array<string | number>, value?: any): this;
  setEach(path?: Array<string | number>, callback?: (item: any, key: string | number, parent: any) => any): this;
  setEachDeep(path?: Array<string | number>, callback?: (item: any, key: string | number, parent: any) => any): this;
  walkDeep(path?: Array<string | number>, callback?: (item: any, key: string | number, parent: any) => any): this;
  get(path?: Array<string | number>): any;
  commit(): this;
  bind(state?: any, setState?: any): this;
  initState(state?: any): this;

  static init(state?: any, setState?: any): StateClass;
}
