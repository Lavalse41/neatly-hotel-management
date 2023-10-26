import { Router, Request, Response } from "express";

export const payment = Router();

const stripe = require("stripe")(process.env.SCCCCBB_ABFEK);

payment.post("/", async (req, res) => {
  const token = "tok_visa";
  const totalPrice = req.body.total;
  console.log(totalPrice);
  try {
    const session = await stripe.charges.create({
      amount: Number(totalPrice + "00"),
      currency: "thb",
      source: token,
      description: "Hotel payment",
    });
    return res.status(200).json({
      data: session,
    });
  } catch (error) {
    console.log(error);
  }
});

export default payment;
