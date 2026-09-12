export interface UseUIProps {
  textField?: Record<string, any>;
  button?: Record<string, any>;
  select?: Record<string, any>;
  value?: any;
  error?: boolean;
  onChange?: (value: any) => any;
  onClick?: () => any;
  children?: any;
  text?: string;
  variant?: string;
  [key: string]: any;
}

export interface UseUIResult {
  setUI: (p: Record<string, any>) => Record<string, any>;
  textField: Record<string, any>;
  button: Record<string, any>;
  select: Record<string, any>;
}

export default function useUI(props?: UseUIProps): UseUIResult;
