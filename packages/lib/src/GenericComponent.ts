import { ForwardedRef, forwardRef } from 'react';

import { SX } from './SX';

export type GenericComponent<
  A extends React.ElementType = 'div',
  P = unknown
> = <C extends React.ElementType = A>(
  args: {
    as?: C;
    sx?: SX;
  } & React.ComponentPropsWithoutRef<C> &
    P
  // ref: React.ForwardedRef<C>
) => React.ReactElement | null;

export type GenericComponentWithRef<
  A extends React.ElementType = 'div',
  P = unknown
> = <C extends React.ElementType = A>(
  args: {
    as?: C;
    sx?: SX;
    ref?: ForwardedRef<C> | any;
  } & React.ComponentPropsWithoutRef<C> &
    P,
  ref: React.ForwardedRef<C>
) => React.ReactElement | null;

export function createGenericComponentWithRef<
  A extends React.ElementType,
  P extends Record<string, unknown>
>(Component: GenericComponentWithRef<A, P>) {
  return forwardRef<React.ElementType, P>(Component);
}

export function createGenericComponent<
  A extends React.ElementType,
  P extends Record<string, unknown>
>(Component: GenericComponent<A, P>) {
  return Component;
}
