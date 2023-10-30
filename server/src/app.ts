import express, { Express, Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { roomRouter } from "./apps/roomRouter.ts";
import { profileRouter } from "./apps/ProfileRouter.ts";
import { paymentMethodRouter } from "./apps/paymentMethodRouter.ts";
import authRouter from "./apps/auth.ts";
import { validUser } from "./apps/validUser.ts";
import { payment } from "./apps/payment.ts";
import { bookingRouter } from "./apps/bookingRouter.ts";
import { roomAvaliable } from "./apps/roomAvaliable.ts";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/room", roomRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/paymentMethod", paymentMethodRouter);
app.use("/validUser", validUser);
app.use("/booking", bookingRouter);
app.use("/avaliable", roomAvaliable);
app.use("/checkout", payment);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
