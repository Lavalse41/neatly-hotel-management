import express, { Express, Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { roomRouter } from "./apps/roomRouter";
import { profileRouter } from "./apps/ProfileRouter";
import { paymentMethodRouter } from "./apps/paymentMethodRouter";
import authRouter from "./apps/auth";
import { validUser } from "./apps/validUser";
import { payment } from "./apps/payment";
import { bookingRouter } from "./apps/bookingRouter";
import { roomAvaliable } from "./apps/roomAvaliable";

const app: Express = express();
const port = 4000;

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

app.listen(port, () => {
  console.log(`server is running port ${port}`);
});

app.get("/dist", (req: Request, res: Response) => {
  res.send("server is running on dist");
});
