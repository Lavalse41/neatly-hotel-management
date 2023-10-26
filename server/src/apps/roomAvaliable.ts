import { supabase } from "../utils/db.ts";
import { Router, Request, Response } from "express";
export const roomAvaliable = Router();

roomAvaliable.get("/", async (req: Request, res: Response) => {
  const { checkInDate, checkOutDate } = req.query;

  if (!checkInDate) {
    return res.status(400).json({ error: "Please provide check-in." });
  }

  try {
    const { data: roomAvaliableData, error: roomAvaliableError } =
      await supabase
        .from("room_avaliable")
        .select("*")
        .order("room_avaliable_id", { ascending: true });

    if (roomAvaliableError) {
      console.error("Error fetching room avaliable:", roomAvaliableError);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching room avaliable." });
    }

    const userCheckInDate = new Date(checkInDate as string);
    const userCheckOutDate = new Date(checkOutDate as string);

    const availableRooms = roomAvaliableData.filter((room) => {
      const roomCheckInDate = new Date(room.check_in);
      const roomCheckOutDate = new Date(room.check_out);

      const isCheckOutBeforeRoomCheckIn = userCheckOutDate <= roomCheckInDate;
      const isCheckInAfterRoomCheckOut = userCheckInDate >= roomCheckOutDate;

      const isOverlap =
        !isCheckOutBeforeRoomCheckIn && !isCheckInAfterRoomCheckOut;

      return !isOverlap;
    });

    // Filter out rooms that have overlapping reserve bookings
    const filteredRooms = availableRooms.filter((room) => {
      const roomReserveBookings = room.reserve_booking || [];

      // Check if there is any overlapping reserve booking
      return roomReserveBookings.every((reserve: any) => {
        const reserveCheckInDate = new Date(reserve.check_in);
        const reserveCheckOutDate = new Date(reserve.check_out);

        const isCheckOutBeforeReserveCheckIn =
          userCheckOutDate <= reserveCheckInDate;
        const isCheckInAfterReserveCheckOut =
          userCheckInDate >= reserveCheckOutDate;

        return !(
          !isCheckOutBeforeReserveCheckIn && !isCheckInAfterReserveCheckOut
        );
      });
    });

    res.json(filteredRooms);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomAvaliable.get("/:roomId", async (req, res) => {
  const room_id = req.params.roomId;

  try {
    const { data: roomAvaliable, error } = await supabase
      .from("room_avaliable")
      .select("*")
      .eq("room_id", room_id);

    if (error) {
      console.error("Error fetching room avaliable:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching room avaliable." });
    }
    return res.json({
      data: roomAvaliable[0],
    });
  } catch (error) {
    console.log(error);
  }
});

roomAvaliable.get("/admin/admin", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("room_avaliable")
      .select("*, room_details(room_type, bed_types)")
      .order("room_avaliable_id", { ascending: true });

    if (error) {
      console.error("Error fetching room avaliable:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching room avaliable." });
    }

    res.json(data);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomAvaliable.put(
  "/admin/admin/:room_avaliable_id",
  async (req: Request, res: Response) => {
    try {
      const roomAvaliableId = req.params.room_avaliable_id;
      const { room_status } = req.body;
      // console.log(room_avaliable_id);

      const roomStatus = {
        room_status,
      };

      const { data, error } = await supabase
        .from("room_avaliable")
        .update(roomStatus)
        .eq("room_avaliable_id", roomAvaliableId)
        .select();

      if (error) {
        console.error("Error updating room status:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while updating room status." });
      }

      res
        .status(200)
        .json({ message: "Room status has been updated successfully", data });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
);
