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
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";
import fs from "fs/promises";
const supabaseUpload = (files) => __awaiter(void 0, void 0, void 0, function* () {
    let fileUrls = "";
    for (let file of files.avatar) {
        try {
            const fileData = yield fs.readFile(file.path, "base64");
            const { data, error } = yield supabase.storage
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
            yield fs.unlink(file.path);
            fileUrls = fileUrl.data.publicUrl;
        }
        catch (error) {
            console.error("Error processing file:", error);
        }
    }
    return fileUrls;
});
export { supabaseUpload };
