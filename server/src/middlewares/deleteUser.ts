import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models/UserModel";

class DeleteUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.body;
    const result = await UserModel.deleteOne({ userId: userId });
    if (result.deletedCount === 0) throw new DeleteUserError("User not found");
    req.body.queryResult = {
      status: "success",
      code: 200,
      msg: "User deleted successfully",
    };
  } catch (err) {
    if (err instanceof DeleteUserError)
      req.body.queryResult = { status: "error", code: 400, msg: err.message };
    else
      req.body.queryResult = {
        status: "error",
        code: 500,
        msg: "Internal Server Error",
      };
  } finally {
    next();
  }
}
