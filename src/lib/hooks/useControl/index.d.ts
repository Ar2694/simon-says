export interface UseControlProps {
  onChanges?: any;
  onClicks?: any;
  onEffects?: any;
  onEvents?: any;
  onCalls?: any;
  [key: string]: any;
}

export interface UseControlResult {
  control: {
    state: any;
    clicks: Record<string, Array<(...args: any[]) => any>>;
    changes: Record<string, Array<(...args: any[]) => any>>;
    effects: Record<string, Array<(...args: any[]) => any>>;
    events: Record<string, Array<(...args: any[]) => any>>;
    calls: Record<string, Array<(...args: any[]) => any>>;
    effect: (name: string, callback: (...args: any[]) => any) => any;
    handleEffect: (name: string, ...args: any[]) => any;
    change: (name: string, callback: (...args: any[]) => any) => any;
    handleChange: (name: string, ...args: any[]) => (evt: any) => any;
    onChange: (name: string, ...args: any[]) => (evt: any) => any;
    click: (name: string, callback: (...args: any[]) => any) => any;
    handleClick: (name: string, ...args: any[]) => () => any;
    onClick: (name: string, ...args: any[]) => () => any;
    event: (name: string, callback: (...args: any[]) => any) => any;
    handleEvent: (name: string, ...args: any[]) => (evt: any) => any;
    onEvent: (name: string, ...args: any[]) => (evt: any) => any;
    call: (name: string, callback: (...args: any[]) => any) => any;
    handleCall: (name: string, ...args: any[]) => any;
  };
}

export default function useControl(initialState?: any, props?: UseControlProps): UseControlResult;
