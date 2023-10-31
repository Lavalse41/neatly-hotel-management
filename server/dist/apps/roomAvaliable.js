var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "../utils/db";
import { Router } from "express";
export const roomAvaliable = Router();
roomAvaliable.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { checkInDate, checkOutDate } = req.query;
    if (!checkInDate) {
        return res.status(400).json({ error: "Please provide check-in." });
    }
    try {
        const { data: roomAvaliableData, error: roomAvaliableError } = yield supabase
            .from("room_avaliable")
            .select("*")
            .order("room_avaliable_id", { ascending: true });
        if (roomAvaliableError) {
            console.error("Error fetching room avaliable:", roomAvaliableError);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching room avaliable." });
        }
        const userCheckInDate = new Date(checkInDate);
        const userCheckOutDate = new Date(checkOutDate);
        const availableRooms = roomAvaliableData.filter((room) => {
            const roomCheckInDate = new Date(room.check_in);
            const roomCheckOutDate = new Date(room.check_out);
            const isCheckOutBeforeRoomCheckIn = userCheckOutDate <= roomCheckInDate;
            const isCheckInAfterRoomCheckOut = userCheckInDate >= roomCheckOutDate;
            const isOverlap = !isCheckOutBeforeRoomCheckIn && !isCheckInAfterRoomCheckOut;
            return !isOverlap;
        });
        const filteredRooms = availableRooms.filter((room) => {
            const roomReserveBookings = room.reserve_booking || [];
            return roomReserveBookings.every((reserve) => {
                const reserveCheckInDate = new Date(reserve.check_in);
                const reserveCheckOutDate = new Date(reserve.check_out);
                const isCheckOutBeforeReserveCheckIn = userCheckOutDate <= reserveCheckInDate;
                const isCheckInAfterReserveCheckOut = userCheckInDate >= reserveCheckOutDate;
                return !(!isCheckOutBeforeReserveCheckIn && !isCheckInAfterReserveCheckOut);
            });
        });
        res.json(filteredRooms);
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
roomAvaliable.get("/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room_id = req.params.roomId;
    try {
        const { data: roomAvaliable, error } = yield supabase
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
    }
    catch (error) {
        console.log(error);
    }
}));
roomAvaliable.get("/admin/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
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
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
roomAvaliable.put("/admin/admin/:room_avaliable_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomAvaliableId = req.params.room_avaliable_id;
        const { room_status } = req.body;
        const roomStatus = {
            room_status,
        };
        const { data, error } = yield supabase
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
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
