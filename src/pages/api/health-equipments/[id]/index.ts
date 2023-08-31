import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { healthEquipmentValidationSchema } from 'validationSchema/health-equipments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.health_equipment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getHealthEquipmentById();
    case 'PUT':
      return updateHealthEquipmentById();
    case 'DELETE':
      return deleteHealthEquipmentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHealthEquipmentById() {
    const data = await prisma.health_equipment.findFirst(convertQueryToPrismaUtil(req.query, 'health_equipment'));
    return res.status(200).json(data);
  }

  async function updateHealthEquipmentById() {
    await healthEquipmentValidationSchema.validate(req.body);
    const data = await prisma.health_equipment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteHealthEquipmentById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.health_equipment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
