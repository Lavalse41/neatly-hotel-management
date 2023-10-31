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
export const validUser = Router();
validUser.get("/username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    let { data: users, error } = yield supabase
        .from("users")
        .select("*")
        .eq("username", username);
    console.log(username);
    console.log(users);
    return res.json({
        data: users,
    });
}));
validUser.get("/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    let { data: users, error } = yield supabase
        .from("users")
        .select("*")
        .eq("email", email);
    console.log(email);
    console.log(users);
    return res.json({
        data: users,
    });
}));
validUser.get("/idNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idNumber } = req.query;
    let { data: users, error } = yield supabase
        .from("users")
        .select("*")
        .eq("idNumber", idNumber);
    console.log(idNumber);
    console.log(users);
    return res.json({
        data: users,
    });
}));
validUser.get("/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userid;
    let { data: userData, error } = yield supabase
        .from("users")
        .select("*")
        .eq("id", id);
    return res.json({
        data: userData,
    });
}));
