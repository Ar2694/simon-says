import type * as React from 'react';

export interface ComponentChildrenProps {
  children?: React.ReactNode;
  mapChildProps?: (child: React.ReactElement) => Record<string, any>;
  mapChild?: (child: React.ReactElement) => React.ReactNode;
  childProps?: Record<string, any>;
}

export default function ComponentChildren(props: ComponentChildrenProps): React.ReactElement | null;
