import type * as React from 'react';

export interface ComponentContextValue {
  context: any;
}

export const Context: React.Context<ComponentContextValue | null>;

export default function ComponentContext(props: {
  state?: any;
  children?: React.ReactNode;
  [key: string]: any;
}): React.ReactElement;

export function useComponentContext(): ComponentContextValue | null;
