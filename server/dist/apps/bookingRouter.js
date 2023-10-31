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
export const bookingRouter = Router();
bookingRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from("booking")
            .select("*, room_details(*), users(*)")
            .order("book_id", { ascending: false });
        if (error) {
            console.error("Error fetching booking:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching booking." });
        }
        res.json({ data });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const { data: bookingDetails, error } = yield supabase
            .from("booking")
            .select("*, room_details(*), users(*)")
            .eq("book_id", bookingId)
            .single();
        if (error) {
            console.error("Error fetching booking:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching booking." });
        }
        res.json({ data: bookingDetails });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.userId;
        const { data: bookingDetails, error } = yield supabase
            .from("booking")
            .select("*, room_details(*)")
            .eq("user_id", user_id);
        if (error) {
            console.error("Error fetching booking:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching booking." });
        }
        res.json({ data: bookingDetails });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.get("/avaliable/:roomAvaliableId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomAvaliableId = req.params.roomAvaliableId;
        const { data: bookingDetails, error } = yield supabase
            .from("booking")
            .select("*")
            .eq("room_avaliable_id", roomAvaliableId);
        if (error) {
            console.error("Error fetching booking:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching booking." });
        }
        res.json({ data: bookingDetails });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.get("/admin/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from("booking")
            .select("*, room_details(*), users(*), room_avaliable(room_avaliable_id)")
            .order("check_in", { ascending: true });
        if (error) {
            console.error("Error fetching booking:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching booking." });
        }
        res.json(data);
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room_id, amount_room, amount_stay, check_in, check_out, user_id, total_price, standard_request, special_request, additional_request, array_of_room_avaliable, three_credit_card_num, payment_method, amount_night, total_price_add_reqs, } = req.body;
        console.log(array_of_room_avaliable);
        let roomAvaliableArray;
        if (Array.isArray(array_of_room_avaliable)) {
            roomAvaliableArray = array_of_room_avaliable;
        }
        else {
            roomAvaliableArray = [array_of_room_avaliable];
        }
        console.log(roomAvaliableArray);
        const bookingPromises = roomAvaliableArray.map((room) => __awaiter(void 0, void 0, void 0, function* () {
            const newBooking = {
                amount_room,
                amount_stay,
                check_in,
                check_out,
                room_id,
                user_id,
                total_price,
                standard_request,
                special_request,
                additional_request,
                room_avaliable_id: room.room_avaliable_id,
                three_credit_card_num,
                payment_method,
                amount_night,
                total_price_add_reqs,
                booking_date: new Date(),
            };
            const newAvailability = {
                check_in,
                check_out,
                user_id,
                status: "Unavaliable",
                reserve_booking: [],
            };
            const { error: bookingError } = yield supabase
                .from("booking")
                .insert([newBooking]);
            const { data: currentRoomAvailability, error: roomAvailabilityError } = yield supabase
                .from("room_avaliable")
                .select("*")
                .eq("room_avaliable_id", room.room_avaliable_id)
                .single();
            if (roomAvailabilityError) {
                console.error("Error fetching 'room_avaliable':", roomAvailabilityError);
                return { error: "Failed to fetch 'room_avaliable'" };
            }
            if (newBooking.check_in < currentRoomAvailability.check_in ||
                currentRoomAvailability.check_in === null) {
                const { data: updatedRoom, error: updateError } = yield supabase
                    .from("room_avaliable")
                    .update(newAvailability)
                    .eq("room_avaliable_id", room.room_avaliable_id);
                if (updateError) {
                    console.error("Error updating 'room_avaliable':", updateError);
                    return { error: "Failed to update 'room_avaliable'" };
                }
                const reserveBookingArray = Array.isArray(currentRoomAvailability.reserve_booking)
                    ? currentRoomAvailability.reserve_booking
                    : [];
                const curerntAvailability = {
                    check_in: currentRoomAvailability.check_in,
                    check_out: currentRoomAvailability.check_out,
                    user_id: currentRoomAvailability.user_id,
                    status: currentRoomAvailability.status,
                };
                const updatedReserveBooking1 = [
                    ...reserveBookingArray,
                    curerntAvailability,
                ];
                const { data: roomAvailabilityData, error: availabilityError } = yield supabase
                    .from("room_avaliable")
                    .update({
                    reserve_booking: updatedReserveBooking1,
                })
                    .eq("room_avaliable_id", room.room_avaliable_id);
                if (availabilityError) {
                    console.error("Error updating 'reserve_booking' in 'room_avaliable' table:", availabilityError);
                    return {
                        error: "Failed to update 'reserve_booking' in 'room_avaliable' table",
                    };
                }
            }
            else {
                const reserveBookingArray = Array.isArray(currentRoomAvailability.reserve_booking)
                    ? currentRoomAvailability.reserve_booking
                    : [];
                const updatedReserveBooking2 = [...reserveBookingArray, newBooking];
                console.log(currentRoomAvailability);
                console.log(newBooking);
                const { data: roomAvailabilityData, error: availabilityError } = yield supabase
                    .from("room_avaliable")
                    .update({ reserve_booking: updatedReserveBooking2 })
                    .eq("room_avaliable_id", room.room_avaliable_id);
                if (availabilityError) {
                    console.error("Error updating 'reserve_booking' in 'room_avaliable' table:", availabilityError);
                    return {
                        error: "Failed to update 'reserve_booking' in 'room_avaliable' table",
                    };
                }
            }
            return { message: "Data inserted successfully" };
        }));
        const bookingResults = yield Promise.all(bookingPromises);
        const hasError = bookingResults.some((result) => result.error);
        if (hasError) {
            res
                .status(500)
                .json({ error: "Failed to insert data into the database" });
        }
        else {
            res.status(200).json({ message: "Data inserted successfully" });
        }
    }
    catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
}));
bookingRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const { amount_room, amount_stay, check_in, check_out, room_id, user_id, total_price, standard_request, special_request, additional_request, avaliable, room_avaliable_id, } = req.body;
        const updatedBooking = {
            amount_room,
            amount_stay,
            check_in,
            check_out,
            room_id,
            user_id,
            total_price,
            standard_request,
            special_request,
            additional_request,
            update_booking_date: new Date(),
        };
        const updatedAvailability = {
            check_in,
            check_out,
            avaliable,
            user_id,
        };
        const { error: bookingError } = yield supabase
            .from("booking")
            .update([updatedBooking])
            .eq("book_id", bookingId);
        const { error: availabilityError } = yield supabase
            .from("room_avaliable")
            .update([updatedAvailability])
            .eq("room_avaliable_id", room_avaliable_id);
        if (bookingError || availabilityError) {
            console.error("Error updating booking or availability:", bookingError, availabilityError);
            return res.status(500).json({
                error: "An error occurred while updating booking or availability.",
            });
        }
        res.status(202).json({
            message: "Booking and availability have been updated successfully.",
        });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
bookingRouter.put("/cancel/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const bookingId = req.params.id;
    const { check_in, check_out, avaliable, room_avaliable_id, refund, user_id } = req.body;
    if (refund !== true) {
        try {
            const updatedBooking = {
                status: "cancel",
                room_avaliable_id,
                cancel_date: new Date(),
            };
            const updatedAvailability = {
                check_in: null,
                check_out: null,
                user_id: null,
                status: "Avaliable",
            };
            const { error: bookingError } = yield supabase
                .from("booking")
                .update([updatedBooking])
                .eq("book_id", bookingId);
            const { error: availabilityError } = yield supabase
                .from("room_avaliable")
                .update([updatedAvailability])
                .eq("room_avaliable_id", room_avaliable_id);
            if (bookingError || availabilityError) {
                console.error("Error updating booking or availability:", bookingError, availabilityError);
                return res.status(500).json({
                    error: "An error occurred while updating booking or availability.",
                });
            }
            res.status(202).json({
                message: "Booking and availability have been updated successfully.",
            });
        }
        catch (err) {
            console.error("Internal server error:", err);
            res.status(500).json({ error: "An internal server error occurred." });
        }
    }
    else {
        try {
            const updatedBooking = {
                status: "cancel",
                room_avaliable_id,
                cancel_date: new Date(),
            };
            const updatedAvailability = {
                check_in: null,
                check_out: null,
                user_id: null,
                status: "Avaliable",
            };
            const { error: bookingError } = yield supabase
                .from("booking")
                .update([updatedBooking])
                .eq("book_id", bookingId);
            const { error: availabilityError } = yield supabase
                .from("room_avaliable")
                .update([updatedAvailability])
                .eq("room_avaliable_id", room_avaliable_id);
            if (bookingError || availabilityError) {
                console.error("Error updating booking or availability:", bookingError, availabilityError);
                return res.status(500).json({
                    error: "An error occurred while updating booking or availability.",
                });
            }
            let { data: userData, error: userError } = yield supabase
                .from("users")
                .select("notification")
                .eq("id", user_id);
            let { data: notificationCount, error: userNotiCountError } = yield supabase
                .from("users")
                .select("notification_count")
                .eq("id", user_id);
            const existingNotifications = ((_a = userData[0]) === null || _a === void 0 ? void 0 : _a.notification) || [];
            const existingNotificationCount = ((_b = notificationCount[0]) === null || _b === void 0 ? void 0 : _b.notification_count) || 0;
            const newNotiText = "We receive your refund request. You will receive an email with details and a refund within 48 hours.";
            const newNoti = [...existingNotifications, newNotiText];
            const newNotificationCount = existingNotificationCount + 1;
            let { data: newNotiArray, error: newNotiArrayError } = yield supabase
                .from("users")
                .update({ notification: newNoti })
                .eq("id", user_id);
            let { data: newNotiCountData, error } = yield supabase
                .from("users")
                .update({ notification_count: newNotificationCount })
                .eq("id", user_id);
            res.status(202).json({
                message: "Booking and availability have been updated successfully.",
            });
        }
        catch (err) {
            console.error("Internal server error:", err);
            res.status(500).json({ error: "An internal server error occurred." });
        }
    }
}));
bookingRouter.put("/ChangeDate/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const { check_in, check_out } = req.body;
        const updatedBooking = {
            check_in,
            check_out,
            update_booking_date: new Date(),
        };
        const { error: bookingError } = yield supabase
            .from("booking")
            .update([updatedBooking])
            .eq("book_id", bookingId);
        if (bookingError) {
            console.error("Error updating booking:", bookingError);
            return res.status(500).json({
                error: "An error occurred while updating booking.",
            });
        }
        res.status(202).json({
            message: "Booking have been updated successfully.",
        });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));