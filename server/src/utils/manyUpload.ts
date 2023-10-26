import { supabase } from "./db";
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";
import fs from "fs/promises";

const manyUpload = async (files: any) => {
  let fileUrls = [];

  const uploadPromises = files.room_images.map(async (file: any) => {
    try {
      const fileData = await fs.readFile(file.path, "base64");

      const { data, error } = await supabase.storage
        .from("user-storage")
        .upload("room_images/" + `room_${uuidv4()}`, decode(fileData), {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Error uploading file:", error);
        return null;
      }

      const fileUrl = supabase.storage
        .from("user-storage")
        .getPublicUrl(data.path);

      await fs.unlink(file.path);

      return fileUrl.data.publicUrl;
    } catch (error) {
      console.error("Error processing file:", error);
      return null;
    }
  });

  const uploadedUrls = await Promise.all(uploadPromises);

  fileUrls = uploadedUrls.filter((url) => url !== null);

  return fileUrls;
};

export { manyUpload };
