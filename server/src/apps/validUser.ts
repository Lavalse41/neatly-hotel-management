import { supabase } from "../utils/db.ts";
import { Router } from "express";

export const validUser = Router();

validUser.get("/username", async (req, res) => {
  const { username } = req.query;

  // Use the username to query the database
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  console.log(username);
  console.log(users);

  return res.json({
    data: users,
  });
});

validUser.get("/email", async (req, res) => {
  const { email } = req.query;

  // Use the username to query the database
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  console.log(email);
  console.log(users);

  return res.json({
    data: users,
  });
});

validUser.get("/idNumber", async (req, res) => {
  const { idNumber } = req.query;

  // Use the username to query the database
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("idNumber", idNumber);

  console.log(idNumber);
  console.log(users);

  return res.json({
    data: users,
  });
});

validUser.get("/:userid", async (req, res) => {
  const id = req.params.userid;

  // Use the username to query the database
  let { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  return res.json({
    data: userData,
  });
});
