import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models/UserModel";
import { logger } from "../logger.js";
import FriendRequestModel from "@models/FriendRequestModel";

export default async function getPeopleList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, userId } = req.query;
    const regex = new RegExp(`^${name}`);
    const allPeople = await UserModel.find({
      $and: [{ username: { $regex: regex } }, { userId: { $ne: userId } }],
    })
      .lean()
      .select("username userId profilePic");

    let peopleList = await Promise.all(
      allPeople.map(async (person) => {
        const friendRequest = await FriendRequestModel.findOne({
          $or: [
            { from: userId, to: person.userId },
            { from: person.userId, to: userId },
          ],
        })
          .lean()
          .select("status");
        if (friendRequest != null) return { ...person, ...friendRequest };
        else {
          return { ...person, status: "declined" };
        }
      })
    );

    req.body.queryResult = {
      status: "success",
      peopleList: peopleList.filter((person) => person.status !== "accepted"),
      code: 200,
    };
  } catch (err) {
    req.body.queryResult = {
      status: "error",
      message: (err as Error).message,
      code: 500,
    };
    logger.error(
      `Error at getPeopleList middleware: ${(err as Error).message}`
    );
  } finally {
    next();
  }
}
