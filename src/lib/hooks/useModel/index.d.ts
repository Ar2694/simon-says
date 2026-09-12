export interface ModelBuilder {
  define: (prop: string | string[], value: any, constraint?: ((value: any) => boolean) | null, definedObj?: Record<string, any>) => any;
  addProp: (path?: string[], value?: any, state?: any) => any;
  update: (path?: string[], state?: any, value?: any) => any;
  get: (path?: string[], state?: any) => any;
  extendMethods: (s?: any, m?: Record<string, any>) => Record<string, any>;
  buildChain: (s?: any, m?: Record<string, any>) => any;
}

export interface UseModelResult {
  initModel: any;
  initRef: (value?: any) => any;
}

export default function useModel(): UseModelResult;
