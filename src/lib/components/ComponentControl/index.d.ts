import type * as React from 'react';

export interface ComponentControlProps {
  state?: any;
  childProps?: Record<string, any>;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function ComponentControl(props: ComponentControlProps): React.ReactElement;
