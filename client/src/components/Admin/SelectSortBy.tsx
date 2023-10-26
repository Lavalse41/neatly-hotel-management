import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const StyledInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    width: "100px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #C4C4C4",
    fontSize: 16,
    color: "#424C6B",
    fontWeight: 500,
    padding: "7.5px 14px 7.5px 14px",
    fontFamily: "Inter, sans-serif",
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "Inter, sans-serif",
  "&[aria-selected='true']": {
    backgroundColor: "#FAEDE8",
    "&:hover": {
      backgroundColor: "#FAEDE8",
    },
  },
}));

function SelectSortBy({
  onSortChange,
}: {
  onSortChange: (value: string) => void;
}) {
  return (
    <div>
      <Select
        id="demo-customized-select"
        defaultValue={"all"}
        onChange={(e) => onSortChange(e.target.value)}
        input={<StyledInput />}
      >
        <StyledMenuItem value={"all"}>All</StyledMenuItem>
        <StyledMenuItem value={"incoming"}>Incoming</StyledMenuItem>
        <StyledMenuItem value={"ongoing"}>Ongoing</StyledMenuItem>
        <StyledMenuItem value={"checkedOut"}>Checked out</StyledMenuItem>
        <StyledMenuItem value={"cancelled"}>Cancelled</StyledMenuItem>
      </Select>
    </div>
  );
}

export default SelectSortBy;
