import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import useFormattedPrice from "../../hooks/useFormattedPrice.js";

interface DropDownListProps {
  totalPrice: number;
  totalPriceAddReqs: number;
  standard: string[];
  special: string[];
  additional: string;
  roomType: string;
  personAmount: number;
  roomAmount: number;
  paymentMethod: string;
  threeCreditCardNum: string;
  night: number;
}

function DropDownList({
  totalPrice,
  totalPriceAddReqs,
  standard,
  special,
  additional,
  roomType,
  personAmount,
  roomAmount,
  paymentMethod,
  threeCreditCardNum,
  night,
}: DropDownListProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function addSpecialReqPrice(req: string) {
    switch (req) {
      case "Baby cot":
        return 400;
      case "Airport transfer":
        return 200;
      case "Extra bed":
        return 500;
      case "Extra pillows":
        return 100;
      case "Phone chargers and adapters":
        return 100;
      case "Breakfast":
        return 150;
    }
  }

  return (
    <>
      <div className=" pt-5 ">
        <List
          sx={{
            padding: "0px",
            width: "100%",
            bgcolor: "#F1F2F6",
            borderRadius: "4px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick} sx={{ px: 4, py: 2 }}>
            <p className="font-bold text-grey-800">Booking Detail</p>
            <ListItemText primary="" />
            {open ? (
              <ExpandLess sx={{ color: "#2A2E3F" }} />
            ) : (
              <ExpandMore sx={{ color: "#E76B39" }} />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ px: 4, py: 1 }}>
              <div className="flex justify-between w-full py-4">
                <p className="text-body1">
                  {personAmount}
                  <span> Guest</span>
                  <span className="pl-2">({night} Night)</span>
                </p>
                <div className="flex">
                  {paymentMethod === "credit" ? (
                    <>
                      <p className="text-body1">Payment success via</p>
                      <span className="font-bold pl-2">
                        Credit Card - *{threeCreditCardNum}
                        <span></span>
                      </span>
                    </>
                  ) : (
                    <p className="text-body1">Payment on arrival</p>
                  )}
                </div>
              </div>
            </List>
            <List component="div" disablePadding sx={{ px: 4, py: 1 }}>
              <div className="flex justify-between items-end w-full">
                <p className="text-body1">{roomType}</p>
                <p className="text-body1 font-bold text-black">
                  {useFormattedPrice(totalPrice / roomAmount)}
                </p>
              </div>
            </List>
            <List component="div" disablePadding sx={{ px: 4 }}>
              {special &&
                special.map((item: string, index: number) => (
                  <div className="flex justify-between w-full py-2" key={index}>
                    <p className="text-body1">{item}</p>
                    <p className="text-body1 font-bold text-black">
                      {useFormattedPrice(addSpecialReqPrice(item))}
                    </p>
                  </div>
                ))}
            </List>

            <List component="div" disablePadding sx={{ px: 4 }}>
              {standard &&
                standard
                  .filter(
                    (item) =>
                      item !== "Early check-in" && item !== "Late check-out"
                  )
                  .map((item: string, index: number) => (
                    <div
                      className="flex justify-between w-full py-2"
                      key={index}
                    >
                      <p className="text-body1">{item}</p>
                    </div>
                  ))}
            </List>

            <List component="div" disablePadding sx={{ px: 4, py: 1 }}>
              <div className="flex justify-between w-full border-t-[2px] border-green-300 py-4">
                <p className="text-body1">Total</p>
                <p className=" text-headline5 font-bold text-black">
                  THB {useFormattedPrice(totalPriceAddReqs / roomAmount)}
                </p>
              </div>
            </List>
            <List
              component="div"
              disablePadding
              sx={{
                px: 4,
                py: 1,
                bgcolor: "#E4E6ED",
                borderBottomRightRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            >
              <div className="flex flex-col justify-between w-full py-4">
                <p className="text-body1 font-bold">Additional Request</p>
                <p className=" text-body1 pt-2">
                  {additional ? additional : "No additional Request"}
                </p>
              </div>
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}

export default DropDownList;
