
import e, { Router, Request, Response, NextFunction } from "express";
import createNewUser from "../middlewares/createNewUser";
import authenticateUser from "../middlewares/authenticateUser";
import getUserDetails from "../middlewares/getUserDetails";
import updateUser from "../middlewares/updateUser";
import multer from "multer";
import path from "path";
import { unlinkSync, existsSync } from "fs";




export const userRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/profilePics"))
    },
    filename: (req, file, cb) => {
        if(req.body.profileType === "url")
            return
        const fileName = req.body.username + path.extname(file.originalname)
        if(existsSync(fileName))
            unlinkSync(fileName)
        req.body.profilePic = `http://localhost:8080/public/profilePics/${fileName}`
        cb(null, fileName)
    }
})
const upload = multer({storage: storage})


userRouter.post("/create-user", createNewUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})

userRouter.post("/auth-user", authenticateUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})

userRouter.post("/get-user", getUserDetails, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})

userRouter.post("/update-user", upload.single("profilePic"), updateUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})