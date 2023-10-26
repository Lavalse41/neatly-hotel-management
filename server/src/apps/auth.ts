import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../utils/db.ts";
import { supabaseUpload } from "../utils/upload.ts";
import multer from "multer";
import crypto from "crypto";

const authRouter = Router();

const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar" }]);

const validateRegistrationData = (req, res, next) => {
  const {
    fullName,
    password,
    email,
    birth_day,
    country,
    idNumber,
    card_owner,
  } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      error: "Password is too short. It must be at least 6 characters long.",
    });
  }

  if (!country) {
    return res.status(400).json({
      error: "Please select your country.",
    });
  }

  const names = fullName.trim().split(" ");
  if (
    names.length !== 2 ||
    !/^[a-zA-Z]*$/.test(names[0]) ||
    !/^[a-zA-Z]*$/.test(names[1])
  ) {
    return res.status(400).json({
      error:
        "Invalid full name. It should include both the first name and last name without numbers.",
    });
  }

  const cardNames = card_owner.trim().split(" ");
  if (
    cardNames.length !== 2 ||
    !/^[a-zA-Z]*$/.test(cardNames[0]) ||
    !/^[a-zA-Z]*$/.test(cardNames[1])
  ) {
    return res.status(400).json({
      error:
        "Invalid card name. It should include both the first name and last name without numbers.",
    });
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const birthDate = new Date(birth_day);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (age < 18) {
    return res
      .status(400)
      .json({ error: "You must be at least 18 years old to register." });
  }

  if (!/^\d{13}$/.test(idNumber)) {
    return res.status(400).json({
      error: "Invalid ID number. It should contain exactly 13 numbers.",
    });
  }
  next();
};

authRouter.post(
  "/register",
  avatarUpload,
  validateRegistrationData,
  async (req, res) => {
    let avatarUrl = null;

    // @ts-ignore
    if (req.files && req.files.avatar) {
      //@ts-ignore
      avatarUrl = await supabaseUpload(req.files);
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert(
        [
          {
            username: req.body.username,
            password: req.body.password,
            fullName: req.body.fullName,
            email: req.body.email,
            birthDate: req.body.birth_day,
            country: req.body.country,
            idNumber: req.body.idNumber,
            profile_image: avatarUrl,
            role: "user",
          },
        ],
        { defaultToNull: false }
      );

    //get ID
    let { data: users, error } = await supabase
      .from("users")
      .select("id")
      .eq("username", req.body.username);

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user_id = users[0].id;
    console.log(user_id);
    if (userError) {
      return res.status(500).json({
        message: "Error creating user",
        error: userError,
      });
    }

    // credit card

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

    const generatedCvc = encryptCVC(req.body.cvc, encryptKey);

    const { data: data, error: dataError } = await supabase
      .from("credit_card")
      .insert([
        {
          expire_date: req.body.expireDate,
          cvc: generatedCvc,
          user_id: user_id,
          card_owner: req.body.card_owner,
          card_number: req.body.card_number,
        },
      ]);
    if (dataError) {
      return res.status(500).json({
        message: "Error creating credit card",
        error: dataError,
      });
    }
    let { data: creditCard, error: errorCreditCard } = await supabase
      .from("credit_card")
      .select("credit_card_id")
      .eq("user_id", user_id);
    const card_id = creditCard[0].credit_card_id;

    if (errorCreditCard) {
      return res.status(500).json({
        message: "Error creating user",
        error: errorCreditCard,
      });
    }

    const { data: updateCard, error: updateCardError } = await supabase
      .from("users")
      .update({ credit_card_id: card_id })
      .eq("id", user_id);

    return res.json({
      message: "User has been created successfully",
    });
  }
);

authRouter.post("/login", async (req, res) => {
  const loginIdentifier = req.body.loginIdentifier;
  const password = req.body.password;

  const isEmail = /\S+@\S+\.\S+/.test(loginIdentifier);

  let user;

  if (isEmail) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", loginIdentifier)
      .single();

    user = data;
  } else {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", loginIdentifier)
      .single();

    user = data;
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Password not valid",
    });
  }

  const token = jwt.sign(
    { email: user.email, user_id: user.id },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: "900000",
    }
  );

  const userData = user;

  return res.status(200).json({
    message: "Login successful",
    token,
    userData,
  });
});
export default authRouter;
