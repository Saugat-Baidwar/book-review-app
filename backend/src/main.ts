import express, { Request, Response, NextFunction } from "express";
import { env } from "./utils/config";

const app = express();
const Port = 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "welcome to book review app",
    data: null,
    isSucess: true,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: "internal server error",
    data: null,
    isSucess: false,
  });
});

app.listen(env.PORT, () => {
  console.log(`app is listining on port , ${env.PORT}`);
});
