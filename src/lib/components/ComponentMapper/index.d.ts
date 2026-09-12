import type * as React from 'react';

export interface ComponentMapperProps<T = any> {
  array?: T[] | null;
  onMap?: (item: T, index: number) => React.ReactNode;
  component?: React.ReactElement | ((props: T, index?: number) => React.ReactNode) | null;
}

export default function ComponentMapper<T = any>(props: ComponentMapperProps<T>): React.ReactNode[] | null;
