var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
export const payment = Router();
const stripe = require("stripe")(process.env.SCCCCBB_ABFEK);
payment.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "tok_visa";
    const totalPrice = req.body.total;
    console.log(totalPrice);
    try {
        const session = yield stripe.charges.create({
            amount: Number(totalPrice + "00"),
            currency: "thb",
            source: token,
            description: "Hotel payment",
        });
        return res.status(200).json({
            data: session,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
export default payment;
