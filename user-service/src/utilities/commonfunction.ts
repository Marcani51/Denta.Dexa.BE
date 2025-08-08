export function errorHandling(er,req,res){
    return res.status(400).json({
        message:er,
        code:400,
        status:"FAILED"
    })
}

export const func=(func:any)=>{
    return(req:any, res:any, next:any)=>{
        func(req,res,next).catch(next)
    }
}

export class ExpressError extends Error{
    statusCode: any;
    constructor(message:any, statusCode:any){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}