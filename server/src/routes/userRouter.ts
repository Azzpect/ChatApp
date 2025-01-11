import { Router, Request, Response } from "express";
import createNewUser from "@middlewares/createNewUser";
import authenticateUser from "@middlewares/authenticateUser";
import getUserDetails from "@middlewares/getUserDetails";
import updateUser from "@middlewares/updateUser";
import multer from "multer";
import path from "path";
import { unlinkSync, existsSync } from "fs";
import verifyEmail from "@middlewares/verifyEmail";
import deleteUser from "@middlewares/deleteUser";

export const userRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/"));
  },
  filename: (req, file, cb) => {
    if (req.body.profileType === "url") return;
    const fileName = req.body.username + path.extname(file.originalname);
    if (existsSync(fileName)) unlinkSync(fileName);
    req.body.profilePic = `${process.env.HOST}/public/${fileName}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

userRouter.post(
  "/create-user",
  createNewUser,
  (req: Request, res: Response) => {
    const { queryResult } = req.body;
    res.status(queryResult.code);
    delete queryResult.code;
    res.json({ ...queryResult });
  }
);

userRouter.get("/verify-email", verifyEmail, (req: Request, res: Response) => {
  const { queryResult } = req.body;
  res.status(queryResult.code);
  delete queryResult.code;
  res.send(`<div>${queryResult.msg}</div>`);
});

userRouter.post(
  "/auth-user",
  authenticateUser,
  (req: Request, res: Response) => {
    const { queryResult } = req.body;
    res.status(queryResult.code);
    delete queryResult.code;
    res.json({ ...queryResult });
  }
);

userRouter.get("/get-user", getUserDetails, (req: Request, res: Response) => {
  const { queryResult } = req.body;
  res.status(queryResult.code);
  delete queryResult.code;
  res.json({ ...queryResult });
});

userRouter.post(
  "/update-user",
  upload.single("profilePic"),
  updateUser,
  (req: Request, res: Response) => {
    const { queryResult } = req.body;
    res.status(queryResult.code);
    delete queryResult.code;
    res.json({ ...queryResult });
  }
);

userRouter.post("/delete-user", deleteUser, (req: Request, res: Response) => {
  const { queryResult } = req.body;
  res.status(queryResult.code);
  delete queryResult.code;
  res.json({ ...queryResult });
});
