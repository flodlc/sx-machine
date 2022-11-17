import { ForwardedRef, forwardRef } from 'react';

import { SX } from './SX';

export type SxComponent<A extends React.ElementType = 'div', P = unknown> = <
  C extends React.ElementType = A
>(
  args: {
    as?: C;
    sx?: SX;
  } & Omit<React.ComponentPropsWithoutRef<C>, keyof P> &
    P
) => React.ReactElement | null;

export type SxComponentWithRef<
  A extends React.ElementType = 'div',
  P = unknown
> = <C extends React.ElementType = A>(
  args: {
    as?: C;
    sx?: SX;
    ref?: React.RefAttributes<C> | null | any;
  } & React.ComponentPropsWithoutRef<C> &
    P,
  ref: React.ForwardedRef<C>
) => React.ReactElement | null;

export type SxComponentWithRefIn<
  A extends React.ElementType = 'div',
  P = unknown
> = <C extends React.ElementType = A>(
  args: {
    as?: C;
    sx?: SX;
    ref?: React.ForwardedRef<C> | null;
  } & Omit<React.ComponentPropsWithoutRef<C>, keyof P> &
    P
) => React.ReactElement | null;

export function createSxComponent<
  A extends React.ElementType,
  P extends Record<string, unknown>
>(Component: SxComponentWithRefIn<A, P>): SxComponentWithRef<A, P> {
  //@ts-ignore
  return forwardRef<
    React.ElementType<A>,
    Parameters<SxComponentWithRef<A, P>>[0]
  >((props, ref) => Component({ ...props, ref }));
}
