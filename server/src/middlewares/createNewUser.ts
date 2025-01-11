import { UserModel } from "@models/UserModel";
import { logger } from "../logger.js";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import TempUser from "@models/TempUser";
import { sendEmail } from "@middlewares/sendMail";

export default async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const upRegex = /[A-Z]+/;
    const specialRegex = /\W/;

    if (
      username.length < 4 ||
      !emailPattern.test(email) ||
      password.length < 8 ||
      !upRegex.test(password) ||
      !specialRegex.test(password)
    ) {
      throw new InvalidInputError();
    }

    if (await isUserAlreadyExist(username, email)) throw new UserExistError();

    let userPassword = jwt.sign(password, process.env.PRIVATE_KEY as string);
    let userId = jwt.sign(
      { username: username, password: userPassword },
      process.env.PRIVATE_KEY as string
    );
    let user = new TempUser({
      userId: userId,
      username: username,
      email: email,
      password: userPassword,
    });
    await user.save();
    logger.info(`User created with userId: ${userId}`);
    const verificationMsg = `<div><h1>Verify your email</h1><p>Thank you for registering with us. Please verify your email by clicking on the link below:</p><a href='${process.env.HOST}/verify-email?userId=${userId}'>Verify Email</a><p>This link will expire in 24 hours.</p></div>`;
    await sendEmail(email, "Verify your email", verificationMsg);
    req.body.queryResult = {
      status: "success",
      msg: "Verification email sent!",
      userId: userId,
      code: 201,
    };
  } catch (error) {
    logger.error(`Error occurred: ${(error as Error).message}`);
    if (error instanceof UserExistError) {
      req.body.queryResult = { status: "error", msg: error.message, code: 400 };
    } else if (error instanceof InvalidInputError) {
      req.body.queryResult = { status: "error", msg: error.message, code: 400 };
    } else {
      req.body.queryResult = { status: "error", msg: "error", code: 400 };
    }
  } finally {
    next();
  }
}

class UserExistError extends Error {
  constructor() {
    super("User already exist");
  }
}

class InvalidInputError extends Error {
  constructor() {
    super("Invalid input");
  }
}

async function isUserAlreadyExist(
  username: string,
  email: string
): Promise<boolean> {
  let user =
    (await UserModel.findOne({ username: username })) ||
    (await UserModel.findOne({ email: email }));
  return user != null;
}
