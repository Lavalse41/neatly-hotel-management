import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DropdownSearch from "./DropdownSearch";
import PaginationAdmin from "./PaginationAdmin";
import PageContext from "../../contexts/PageContext";
import NavbarAdmin from "./NavbarAdmin";
import SearchAdmin from "./SearchAdmin";
import Loader from "../Loader";
import { StyledTableCell, StyledTableRow } from "./styledTable";
import BookingType from "../../interfaces/BookingType";

interface RoomManagementProps {
  handleRoomManage: () => void;
}

function RoomManagement({ handleRoomManage }: RoomManagementProps) {
  const [booking, setBooking] = useState<BookingType[]>([]);
  const [filterBookingList, setFilterBookingList] = useState<BookingType[]>([]);
  const [selectedByText, setSelectedByText] = useState<string>("");
  const [currOpen, setOpen] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /*page context*/
  const { page, setPage, rowsPerPage } = useContext(PageContext);

  const getBooking = async () => {
    try {
      setIsLoading(true);
      const results = await axios(
        `https://vercel.com/lavalse41/neatly-api/avaliable/admin/admin`
      );

      setBooking(results.data);
      setFilterBookingList(results.data);
      console.log(results.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const pattern = new RegExp(selectedByText, "i");
  const filterAllBookingList = (filteredData: BookingType[]) => {
    return filteredData.filter((book) => {
      const roomNumber = String(book.room_avaliable_id);
      const paddedRoomNumber =
        roomNumber.length > 1 ? roomNumber : `0${roomNumber}`;
      return (
        pattern.test(paddedRoomNumber) ||
        pattern.test(book.room_details.room_type) ||
        pattern.test(book.room_status)
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedByText(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    handleRoomManage();
    getBooking();
  }, []);

  useEffect(() => {
    if (selectedByText) {
      const combinedData = filterAllBookingList(booking);

      const timer = setTimeout(() => {
        setFilterBookingList(combinedData);
      }, 400);

      return () => clearTimeout(timer);
    }
    if (!selectedByText) {
      setFilterBookingList(booking);
    }
    setPage(0);
  }, [selectedByText]);

  const rows = filterBookingList.map((book) => {
    return createData(
      book.room_avaliable_id,
      book.room_details.room_type,
      book.room_details.bed_types,
      book.room_status
    );
  });

  function createData(
    roomNumber: number,
    roomType: string,
    bedType: string,
    roomStatus: string
  ) {
    return { roomNumber, roomType, bedType, roomStatus };
  }

  /*sort by minNumber to higher*/
  const roomNumberArr = rows.map((row) => row.roomNumber);
  roomNumberArr.sort((a, b) => a - b);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* navbar field*/}
        <NavbarAdmin>
          <p className="text-black font-bold text-headline5">Room Management</p>
          <div className="flex">
            <SearchAdmin value={selectedByText} onChange={handleInputChange} />
          </div>
        </NavbarAdmin>

        {/* table field*/}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="table-padding m-auto">
            <Paper
              sx={{
                overflow: "hidden",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  overflow: "hidden",
                }}
              >
                <Table aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className="w-[27%]">
                        Room no.
                      </StyledTableCell>
                      <StyledTableCell className="w-[24%]">
                        Room type
                      </StyledTableCell>
                      <StyledTableCell className="w-[3%]">{}</StyledTableCell>
                      <StyledTableCell className="w-[2%]">{}</StyledTableCell>
                      <StyledTableCell className="w-[1%]">{}</StyledTableCell>
                      <StyledTableCell className="w-[26%]">
                        Bed type
                      </StyledTableCell>
                      <StyledTableCell className="w-[17%]">
                        Status
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? roomNumberArr.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : roomNumberArr
                    ).map((roomNumber, index) => {
                      const row = rows.find(
                        (row) => row.roomNumber === roomNumber
                      );

                      return row ? (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            {roomNumber > 9
                              ? `${roomNumber}`
                              : `0${roomNumber}`}
                          </StyledTableCell>
                          <StyledTableCell>{row.roomType}</StyledTableCell>
                          <StyledTableCell>{}</StyledTableCell>
                          <StyledTableCell>{}</StyledTableCell>
                          <StyledTableCell>{}</StyledTableCell>
                          <StyledTableCell>{row.bedType}</StyledTableCell>
                          <StyledTableCell>
                            <DropdownSearch
                              roomNumber={row.roomNumber}
                              roomStatus={row.roomStatus}
                              currOpen={currOpen}
                              setOpen={setOpen}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : null;
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 65.8 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <PaginationAdmin rows={rows} colSpan={4} />
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        )}
      </div>
    </>
  );
}
export default RoomManagement;
