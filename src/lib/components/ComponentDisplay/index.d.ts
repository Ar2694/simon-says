import type * as React from 'react';

export interface ComponentDisplayProps {
  when: any;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ComponentDisplay(props: ComponentDisplayProps): React.ReactNode;
