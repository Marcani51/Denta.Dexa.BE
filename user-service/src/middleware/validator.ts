
import { Response, Request, NextFunction } from "express";

import * as modelData from '../models'
import { ExpressError } from "../utilities/commonfunction";

//#region user validation
export const validateUser=(req:Request, res:Response, next:NextFunction)=>{
    const {error}=modelData.userValidationSchema.validate(req.body)

    if(error){
         const msg=error.details.map((er)=>er.message).join(",")
        return next(new ExpressError(msg,400))
    }
    else{
        next()
    }
}
//#endregion