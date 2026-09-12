import type * as React from 'react';

export interface ComponentControllerProps {
  state?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function ComponentController(props: ComponentControllerProps): React.ReactElement;
