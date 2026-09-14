import { UseControllerProps } from "@/lib/hooks/useController";
import type * as React from 'react';

export interface ComponentControllerProps extends UseControllerProps  {
  state?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

export default function ComponentController(props: ComponentControllerProps): React.ReactElement;
