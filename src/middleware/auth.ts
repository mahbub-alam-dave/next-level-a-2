import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import config from "../config/config";
import { UserPayload } from "./roleAuth";

const auth = (role?: "admin" | "customer") => { 
    return (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required.' });
        }

        const token = authHeader?.split(" ")[1]

        try { 
            const decoded = jwt.verify(token as string, config.jwtSecret as string) as UserPayload;
            
            (req as any).user = decoded; 

            next(); 
            
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    }
}

export default auth;