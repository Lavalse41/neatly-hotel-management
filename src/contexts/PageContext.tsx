import { createContext } from "react";
import React, { ReactNode } from "react";

interface PageContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageContext = createContext<PageContextType>();

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <PageContext.Provider
      value={{ page, setPage, rowsPerPage, setRowsPerPage }}
    >
      {children}
    </PageContext.Provider>
  );
}

export default PageContext;
