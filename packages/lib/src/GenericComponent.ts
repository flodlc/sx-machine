import React, { ForwardedRef } from 'react';

import { SX } from './SX';

export type GenericComponent<
  A extends React.ElementType = 'div',
  P = unknown
> = <C extends React.ElementType = A>(
  {
    children,
    sx,
    as,
    ...props
  }: {
    as?: C;
    sx?: SX;
    ref?: ForwardedRef<C> | any;
  } & React.ComponentPropsWithoutRef<C> &
    P,
  ref: React.ForwardedRef<C>
) => React.ReactElement | null;
