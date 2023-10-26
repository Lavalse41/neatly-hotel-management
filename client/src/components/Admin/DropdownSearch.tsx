import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme } from "@mui/system";
import axios from "axios";

const status: string[] = [
  "Vacant",
  "Occupied",
  "Assign Clean",
  "Assign Dirty",
  "Out of Service",
];

interface RoomInfo {
  roomNumber: number;
  roomStatus: string;
  currOpen: number | null;
  setOpen: (value: number | null) => void;
}

export default function DropdownSearch({
  roomNumber,
  roomStatus,
  currOpen,
  setOpen,
}: RoomInfo) {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

  const isOpen = currOpen === roomNumber;
  const handleButtonClick = () => {
    setOpen(isOpen ? null : roomNumber);
  };

  const getStatusStyle = (status: string) => {
    return {
      backgroundColor: theme.palette.status[status]?.main || "inherit",
      color: theme.palette.status[status]?.contrastText || "inherit",
    };
  };

  /*PUT: Update Room Status*/
  const updateStatusInDatabase = async (
    roomNumber: number,
    selectedStatus: string
  ) => {
    const room_avaliable_id = roomNumber;
    try {
      const response = await axios.put(
        `http://localhost:4000/avaliable/admin/admin/${room_avaliable_id}`,
        { room_status: selectedStatus }
      );

      if (response.status === 200) {
        console.log("Status updated successfully.");
      } else {
        console.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    console.log(newValue);
    if (!newValue) {
      setOpen(null);
    }
    updateStatusInDatabase(roomNumber, newValue);
  };

  /*style status*/
  const theme = createTheme({
    palette: {
      status: {
        Vacant: {
          main: "#F0F2F8",
          contrastText: "#006753",
        },
        Occupied: {
          main: "#E4ECFF",
          contrastText: "#084BAF",
        },
        "Assign Clean": {
          main: "#E5FFFA",
          contrastText: "#006753",
        },
        "Assign Dirty": {
          main: "#FFE5E5",
          contrastText: "#A50606",
        },
        "Out of Service": {
          main: "#F0F1F8",
          contrastText: "#6E7288",
        },
      },
    },
  });

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="px-3 py-1 rounded text-body2 cursor-pointer border-0"
        style={{
          color:
            theme.palette.status[selectedStatus]?.contrastText ||
            theme.palette.status[roomStatus]?.contrastText ||
            "inherit",
          backgroundColor:
            theme.palette.status[selectedStatus]?.main ||
            theme.palette.status[roomStatus]?.main ||
            "inherit",
        }}
      >
        {selectedStatus ? `${selectedStatus}` : `${roomStatus}`}
      </button>
      <div className="relative">
        <Autocomplete
          options={status}
          open={isOpen}
          value={selectedStatus}
          placeholder="Search status..."
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | null
          ) => {
            setSelectedStatus(newValue || "");
            setOpen(null);
            handleInputChange(
              event as React.ChangeEvent<HTMLInputElement>,
              newValue || ""
            );
          }}
          className="w-[160px] focus:border-0 focus:ring-0 active:border-0 active:ring-0 hover:border-0 absolute top-[10px] left-0"
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                style={{
                  display: isOpen ? "block" : "none",
                }}
                placeholder="Search status..."
                className="w-[160px] h-[40px] px-4 py-3 rounded-t text-gray-600 text-body2 border-b-[1px] border-gray-400 shadow-md bg-white focus:border-0 focus:ring-0 active:border-0 active:ring-0 hover:border-0"
              />
            </div>
          )}
          renderOption={(props, option) => (
            <ul className="flex">
              <li
                {...props}
                style={getStatusStyle(option)}
                className="px-3 py-1 m-2 rounded text-body2 cursor-pointer inline-block"
              >
                {option}
              </li>
            </ul>
          )}
        />
      </div>
    </>
  );
}
