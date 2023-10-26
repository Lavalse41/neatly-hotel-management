import { ReactNode } from "react";

function NavbarAdmin({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white flex justify-center h-20 drop-shadow-md">
      <div className="flex flex-row justify-between items-center w-[1156px]">
        {children}
      </div>
    </div>
  );
}

export default NavbarAdmin;
