import { NextFunction, Request, Response } from "express";
import TempUser from "@models/TempUser";
import { UserModel } from "@models/UserModel";

export default async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query;
    const user = await TempUser.findOne({ userId: userId }).lean();
    if (!user)
      throw new Error(
        "<h1 style='color:red;text-align:center'>Invalid user</h1><p style='text-align:center'>Please try to sign up again.</p>"
      );
    const newUser = new UserModel({ ...user });
    await newUser.save();
    await TempUser.deleteOne({ userId: userId });

    req.body.queryResult = {
      msg: "<h1 style='color:green;text-align:center'>Successfully verified email</h1><p style='text-align:center'>You can now close this window.</p>",
      code: 200,
    };
  } catch (err) {
    req.body.queryResult = { msg: (err as Error).message, code: 401 };
  } finally {
    next();
  }
}
