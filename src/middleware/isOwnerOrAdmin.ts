import { Request, Response, NextFunction } from "express";
import { UserPayload } from "./roleAuth";
const isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as UserPayload;
    const targetUserId = req.params.id; 
    console.log(user)

    if (user?.role === 'admin') {
        return next(); 
    }


    if (user?.id == targetUserId) {
        return next(); 
    }

    return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: You can only update your own profile.' 
    });
};

export default isOwnerOrAdmin;