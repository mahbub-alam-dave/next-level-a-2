import { NextFunction, Request, Response } from "express"

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader =req.headers.authorization;
        const token = authHeader?.split(" ")[1]

        console.log(authHeader, token)
    }
}