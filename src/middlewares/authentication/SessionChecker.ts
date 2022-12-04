import {NextFunction, Request, Response} from 'express';


class SessionChecker{
    DefaultSessionChecker(req: Request, res: Response, next: NextFunction){
        if(req.session.user && (new Date()) < req.session.cookie.expires)
        next();
    else
        return res.status(401).json({error:"Não autenticado"});
    }
}
const sessionChecker = new SessionChecker()
export default sessionChecker;