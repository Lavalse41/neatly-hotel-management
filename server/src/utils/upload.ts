import { supabase } from "./db";
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";
import fs from "fs/promises";

const supabaseUpload = async (files: any) => {
  let fileUrls = "";

  for (let file of files.avatar) {
    try {
      const fileData = await fs.readFile(file.path, "base64");
      const { data, error } = await supabase.storage
        .from("user-storage")
        .upload("profile-pictures/" + `avatar_${uuidv4()}`, decode(fileData), {
          contentType: file.mimetype,
        });
      if (error) {
        console.error("Error uploading file:", error);
        continue;
      }

      const fileUrl = supabase.storage
        .from("user-storage")
        .getPublicUrl(data.path);

      await fs.unlink(file.path);
      fileUrls = fileUrl.data.publicUrl;
    } catch (error) {
      console.error("Error processing file:", error);
    }
  }
  return fileUrls;
};

export { supabaseUpload };
