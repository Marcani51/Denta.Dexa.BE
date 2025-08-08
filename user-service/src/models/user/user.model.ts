import { PrismaClient } from "../../../../generated/prisma";
const prisma= new PrismaClient()

//#region
export const saveUser=async(body)=>{
    await prisma.user.create({
    data: {
    username: body.username,
    password: body.password,
    email: body.email,
    createdDate: new Date(body.createdDate),
    updateDate: new Date(body.updateDate),
    createdBy: body.createdBy,
    updateBy: body.updateBy,
    isActive: body.isActive,
    detail: {
      create: {
        name: body.detail.name,
        phone: body.detail.phone,
        gender: body.detail.gender,
        address: body.detail.address,
        position: body.detail.position,
        createdDate: new Date(body.detail.createdDate),
        updateDate: new Date(body.detail.updateDate),
        createdBy: body.detail.createdBy,
        updateBy: body.detail.updateBy
      }
    }
  }
    })
}

export const updateUser=async(dataUser, userid)=>{
  const { detail, ...userData } = dataUser;

  const updateUserDB = await prisma.user.update({
    where: { id: userid },
    data: {
      ...userData,
      detail: detail
        ? {
            update: {
              ...detail
            }
          }
        : undefined
    },
    include: { detail: true }
  });

  return updateUserDB;
}
//#endregion

export const getAllUser=async(skip, limit)=>{
    return prisma.user.findMany({
        skip:skip,
        take:limit,
        orderBy:{
            createdDate:'desc'
        }
    })
}

export const dataUserExist=async(userId)=>{
  const exist= await prisma.user.findUnique({
    where:{id:userId},
    include:{detail:true}
  })

  return exist
}
