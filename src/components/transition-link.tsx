import { NavLink, NavLinkProps } from "react-router-dom";

export interface TransitionLinkProps extends NavLinkProps {}

/**
 * Wrapper component for view transition enabled Links, to stablize the API.
 * @param props
 * @returns
 */
export default function TransitionLink(props: TransitionLinkProps) {
  // @ts-ignore - viewTransition is supported in newer react-router-dom versions
  return <NavLink {...props} viewTransition />;
}
