import { ForwardedRef, forwardRef } from 'react';

import { SX } from './SX';

export type SxComponent<A extends React.ElementType = 'div', P = unknown> = <
  C extends React.ElementType = A
>(
  args: {
    as?: C;
    sx?: SX;
  } & React.ComponentPropsWithoutRef<C> &
    P
) => React.ReactElement | null;

export type SxComponentWithRef<
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

export function createSxComponentWithRef<
  A extends React.ElementType,
  P extends Record<string, unknown>
>(Component: SxComponentWithRef<A, P>) {
  return forwardRef<React.ElementType, Parameters<SxComponentWithRef<A, P>>[0]>(
    Component
  );
}

export function createSxComponent<
  A extends React.ElementType,
  P extends Record<string, unknown>
>(Component: SxComponent<A, P>) {
  return Component;
}
