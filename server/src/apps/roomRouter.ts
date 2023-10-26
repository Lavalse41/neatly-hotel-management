import { supabase } from "../utils/db.ts";
import { Router, Request, Response } from "express";
import { manyUpload } from "../utils/manyUpload.ts";
import { deleteImage } from "../utils/deleteImage.ts";
import multer from "multer";
export const roomRouter = Router();

const multerUpload = multer({ dest: "uploads/" });
const upload = multerUpload.fields([{ name: "room_images" }]);

roomRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("room_details")
      .select("*")
      .order("room_id", { ascending: true });

    if (error) {
      console.error("Error fetching room:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching room." });
    }
    const { data: roomAvaliable, error: roomAvaliableError } = await supabase
      .from("room_avaliable")
      .select("*");

    return res.json({
      data,
      roomAvaliable,
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const { data: roomDetails, error } = await supabase
      .from("room_details")
      .select("*")
      .eq("room_id", roomId)
      .single();

    if (error) {
      console.error("Error fetching room:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching room." });
    }

    res.json({ data: roomDetails });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomRouter.post("/", upload, async (req: Request, res: Response) => {
  let roomiImages = [];

  // @ts-ignore
  if (req.files && req.files.room_images) {
    //@ts-ignore
    roomiImages = await manyUpload(req.files);
  }
  console.log(roomiImages);
  try {
    const {
      room_type,
      description,
      price,
      promotion_price,
      person,
      bed_types,
      area,
      amenity,
      room_amount,
      avaliable,
      room_images,
    } = req.body;

    const newRoom = {
      room_type,
      description,
      price: Number(price),
      promotion_price: Number(promotion_price),
      person,
      bed_types,
      area: Number(area),
      amenity,
      room_amount,
      avaliable,
      room_images: roomiImages,
      created_at: new Date(),
    };

    console.log(newRoom);

    const { error } = await supabase.from("room_details").insert([newRoom]);

    if (error) {
      console.error("Error creating room:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating room." });
    }

    res.status(201).json({ message: "user has been created successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomRouter.put("/:id", upload, async (req: Request, res: Response) => {
  const roomId = req.params.id;

  let roomiImages = [];

  // @ts-ignore
  if (req.files && req.files.room_images) {
    try {
      const { data: oldImageUrl, error } = await supabase
        .from("room_details")
        .select("room_images")
        .eq("room_id", roomId)
        .single();

      if (error) {
        console.error("Error fetching old room images:", error);
        return res.status(500).json({
          error: "An error occurred while fetching old room images.",
        });
      }

      if (oldImageUrl) {
        const oldImageUrls = oldImageUrl.room_images;
        await deleteImage(oldImageUrls);
      }

      //@ts-ignore
      roomiImages = await manyUpload(req.files);
    } catch (err) {
      console.error("Internal server error:", err);
      return res
        .status(500)
        .json({ error: "An internal server error occurred." });
    }
  }

  try {
    const {
      room_type,
      description,
      price,
      promotion_price,
      bed_types,
      area,
      amenity,
      room_images,
    } = req.body;

    const updatedRoom = {
      room_type,
      description,
      price,
      promotion_price,
      bed_types,
      area,
      amenity,
      room_images: roomiImages,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("room_details")
      .update(updatedRoom)
      .eq("room_id", roomId);

    if (error) {
      console.error("Error updating room:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating room." });
    }

    res.status(202).json({ message: "user has been update successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

roomRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;

    const { error } = await supabase
      .from("room_details")
      .delete()
      .eq("room_id", roomId);

    if (error) {
      console.error("Error deleting room:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting room." });
    }

    res.status(202).json({ message: "user has been delete successfully" });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});
