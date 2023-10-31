var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "./db";
const deleteImage = (oldImageUrls) => __awaiter(void 0, void 0, void 0, function* () {
    for (const oldImageUrl of oldImageUrls) {
        try {
            const fullUrl = oldImageUrl;
            let result = [];
            const path = fullUrl.split("https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/public/user-storage/");
            if (path.length === 2) {
                result = path[1];
            }
            else {
                console.error("Invalid URL format");
                continue;
            }
            const storageResponse = yield supabase.storage
                .from("user-storage")
                .remove(result);
            if (storageResponse.error) {
                console.error("Error deleting old room image:", storageResponse.error);
            }
            else {
                console.log("Old room image deleted successfully.");
            }
        }
        catch (error) {
            console.error("Error deleting old room image:", error.message);
        }
    }
});
export { deleteImage };
