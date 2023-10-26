import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import { ChangeEventHandler } from "react";

interface SearchAdminProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function SearchAdmin({ value, onChange }: SearchAdminProps) {
  return (
    <div>
      <FormControl>
        <OutlinedInput
          value={value}
          onChange={onChange}
          placeholder="Search…"
          size="small"
          color="warning"
          id="input-with-icon-adornment"
          inputProps={{
            "aria-label": "weight",
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

export default SearchAdmin;
