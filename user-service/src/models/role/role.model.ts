import { PrismaClient } from "../../../../generated/prisma";
const prisma = new PrismaClient();

export const saveRole = async (body) => {
  if (!body.access) throw new Error("Access object is required");
  await prisma.role.create({
    data: {
      roleName: body.roleName,
      isActive: body.isActive,
      createdDate: new Date(),
      updateDate: new Date(),
      createdBy: body.createdBy,
      updateBy: body.updateBy,
      access: {
        create: {
          view: Boolean(body.access.view),
          edit: Boolean(body.access.edit),
          absent: Boolean(body.access.absent),
        },
      },
    },
  });
};

export const getAllRole = async (skip, limit) => {
  return prisma.role.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdDate: "desc",
    },
    include:{access:true}
  });
};

export const getRoleById = async (roleid) => {
  return prisma.role.findUnique({
    where: { id: roleid },
    include: { access: true },
  });
};

export const updateRole = async (dataRole, roleId) => {
  const { access, ...roleData } = dataRole;

  const updateRoleDB = await prisma.role.update({
    where: { id: roleId },
    data: {
      ...roleData,
      updateDate: new Date(),
      access: access
        ? {
            upsert: {
              update: {
                view: access.view,
                edit: access.edit,
                absent: access.absent,
              },
              create: {
                view: access.view,
                edit: access.edit,
                absent: access.absent,
              },
            },
          }
        : undefined,
    },
    include: { access: true },
  });

  return updateRoleDB;
};