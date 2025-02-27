import { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  return <header className="sticky top-0">Header {children}</header>;
};
