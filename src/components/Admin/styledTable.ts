import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableContainer, Table } from "@mui/material";

/*style table*/
export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E4E6ED",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Inter",
    padding: "10px 16px",
    color: "#424C6B",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontFamily: "Inter",
    borderColor: "none",
    padding: "18px 16px",
    color: "black",
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const styledTable = {
  StyledTableCell,
  StyledTableRow,
};

export const StyledTableContainer = styled(TableContainer)(() => ({
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#C8CCDB",
    borderRadius: "6px",
    zIndex: "0 !important",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "darkorange",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#E4E6ED",
  },
}));

export const StyledTable = styled(Table)({
  "& .MuiTableHead-root": {
    backgroundColor: "white",
    width: "calc(100% - 17px)",
  },
  "& .MuiTableHead-root .MuiTableRow-root": {
    width: "100%",
  },
});

export default styledTable;
