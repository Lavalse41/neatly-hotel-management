import { supabase } from "./db";

const deleteImage = async (oldImageUrls: any) => {
  for (const oldImageUrl of oldImageUrls) {
    try {
      const fullUrl = oldImageUrl;
      let result = [];

      const path = fullUrl.split(
        "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/public/user-storage/"
      );
      if (path.length === 2) {
        result = path[1];
      } else {
        console.error("Invalid URL format");
        continue;
      }

      const storageResponse = await supabase.storage
        .from("user-storage")
        .remove(result);
      if (storageResponse.error) {
        console.error("Error deleting old room image:", storageResponse.error);
      } else {
        console.log("Old room image deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting old room image:", error.message);
    }
  }
};

export { deleteImage };
