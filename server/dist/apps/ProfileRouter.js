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
import multer from "multer";
import { supabaseUpload } from "../utils/upload";
export const profileRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar" }]);
profileRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { data: user, error } = yield supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (error) {
            console.error("Error fetching user:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while fetching user." });
        }
        res.status(200).json({
            message: `Complete fetching user Id: ${userId}`,
            data: user,
        });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
profileRouter.put("/:id", avatarUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatarUrl;
    if (req.files && req.files.avatar) {
        avatarUrl = yield supabaseUpload(req.files);
    }
    else {
        avatarUrl = req.body.profile_image;
    }
    try {
        const userId = req.params.id;
        const { fullName, email, idNumber, birthDate, country } = req.body;
        const updatedUserProfile = {
            fullName,
            email,
            idNumber,
            birthDate,
            country,
            profile_image: avatarUrl,
            updated_at: new Date(),
        };
        const { data, error } = yield supabase
            .from("users")
            .update(updatedUserProfile)
            .eq("id", userId)
            .select();
        if (error) {
            console.error("Error updating profile:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while updating profile." });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res
            .status(200)
            .json({ message: "User profile has been updated successfully", data });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
profileRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { error } = yield supabase
            .from("users")
            .update({ profile_image: null })
            .eq("id", userId);
        if (error) {
            console.error("Error deleting profile image:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while deleting the profile image." });
        }
        res.status(200).json({
            message: "Profile image has been deleted successfully",
        });
    }
    catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "An internal server error occurred." });
    }
}));
