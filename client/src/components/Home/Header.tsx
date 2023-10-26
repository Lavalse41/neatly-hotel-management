import { ReactNode } from "react";

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full bg-coverLanding bg-cover">
      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}

export default Header;
