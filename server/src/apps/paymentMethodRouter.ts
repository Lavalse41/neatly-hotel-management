import { supabase } from "../utils/db.ts";
import { Router, Request, Response } from "express";
export const paymentMethodRouter = Router();
import crypto from "crypto";

const encryptKey = Buffer.from(
  "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
  "hex"
);

function encryptCVC(cvc, encryptKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptKey, iv);
  let encryptedCVC = cipher.update(cvc, "utf8", "hex");
  encryptedCVC += cipher.final("hex");
  return iv.toString("hex") + encryptedCVC;
}

function decryptCVC(encryptedCVC, encryptKey) {
  const iv = Buffer.from(encryptedCVC.slice(0, 32), "hex");
  const encryptedData = encryptedCVC.slice(32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptKey, iv);
  let cvc = decipher.update(encryptedData, "hex", "utf8");
  cvc += decipher.final("utf8");
  return cvc;
}

paymentMethodRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const { data: payment, error } = await supabase
      .from("credit_card")
      .select("*")
      .eq("credit_card_id", paymentId)
      .single();

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    if (error) {
      console.error("Error fetching payment:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching payment." });
    }

    const decryptedPayment = {
      ...payment,
      cvc: decryptCVC(payment.cvc, encryptKey),
    };

    res.status(200).json({
      message: `Complete fetching payment Id: ${paymentId}`,
      data: decryptedPayment,
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

paymentMethodRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const { card_number, card_owner, expire_date, cvc } = req.body;

    const encryptNewCVC = encryptCVC(cvc, encryptKey);

    const updatedPayment = {
      card_number,
      card_owner,
      expire_date,
      cvc: encryptNewCVC,
      updated_at: new Date(),
    };

    const { data, error } = await supabase
      .from("credit_card")
      .update(updatedPayment)
      .eq("credit_card_id", paymentId)
      .select();

    if (error) {
      console.error("Error updating payment:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating payment." });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res
      .status(200)
      .json({ message: "Payment Method has been updated successfully", data });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});
