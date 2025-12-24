import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export interface UserPayload extends JwtPayload {
    id: string; 
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

const auth = (role: "admin" | "customer") => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader =req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required.' });
        }

        const token = authHeader?.split(" ")[1]

        try {    
            const decoded = jwt.verify(token as string, config.jwtSecret as string) as UserPayload;
            (req as any).user = decoded;
        if(role === decoded.role) {
          next()
        } else {
            return res.status(403).json({ message: 'Forbidden: Insufficient role permissions.' });
        }
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        
    }
}

export default auth;