export interface UseControllerProps {
  calls?: Record<string, any>;
  clicks?: Record<string, any>;
  changes?: Record<string, any>;
  effects?: Record<string, any>;
  controllerClass?: any;
  [key: string]: any;
}

export interface UseControllerResult {
  controller: any;
}

export default function useController(initialState?: any, props?: UseControllerProps): UseControllerResult;
