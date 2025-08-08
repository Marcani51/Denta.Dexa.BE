import { Response, Request, NextFunction } from "express";

import { getPagination } from "../../utilities/query";
import * as userFunction from "../../models/user/user.model";
import { errorHandling } from "../../utilities/commonfunction";

export const httpAddNewUser=async(req:Request, res:Response)=>{
  try{
    const user = req.body
    await userFunction.saveUser(user)
    return res.status(200).json(user)
  }
  catch(err){
    errorHandling(err,req,res)
  }
}

export const httpGetAllUser=async(req:Request, res:Response)=>{
  try{
    const {skip, limit}= getPagination(req.query)
    if(req.query.param !=undefined){
      // belum diterapkan fitur search dengan param
    }
    else{
      const user = await userFunction.getAllUser(skip, limit)
      return res.status(200).json(user)
    }
  }
  catch(err){
    errorHandling(err,req,res)
  }
}

export const httpUpdateUser=async(req:Request, res:Response)=>{
  try{
    const user = req.body
    const userId=req.params.id
    if(!userId){
      return res.status(400).json({
        error:"ID must be included"
      })
    }

    const isExist= await userFunction.dataUserExist(userId)
    if(!isExist) return res.status(404).json({message:"User not found"})

    const updateData:any={
      ...user,
      updateDate: new Date()
    }

    if(req.body.details){
      updateData.detail={
        update:{
          ...user.detail,
          updateDate:new Date()
        }
      }
    }

    const update= await userFunction.updateUser(updateData,userId)
    return res.status(200).json(update)

  }
  catch(err){
    errorHandling(err,req,res)
  }
}