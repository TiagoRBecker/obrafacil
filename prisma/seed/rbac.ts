import 'dotenv/config';

import { hash } from 'bcrypt';
import { prisma } from './prisma';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';



type Permission = { name: string };

export const   createRbac= async () =>{
  const resources = [
    'account',
    'customer',
    'order',
    'team',
    'settings',
  ];

  const actions = ['create', 'read', 'update', 'delete'];

  // 🔥 criar permissions
  const permissions:Permission[] = [];

  for (const resource of resources) {
    for (const action of actions) {
      permissions.push({
        name: `${resource}:${action}`,
      });
    }
  }

  await prisma.permission.createMany({
    data: permissions,
    skipDuplicates: true,
  });

  // 🔥 criar roles
  const admin = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const user = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  // 🔥 pegar todas permissions
  const allPermissions = await prisma.permission.findMany();

  // 🔥 vincular ADMIN → tudo
  await prisma.rolePermission.createMany({
    data: allPermissions.map((p) => ({
      roleId: admin.id,
      permissionId: p.id,
    })),
    skipDuplicates: true,
  });

  // 🔥 USER limitado
  const basicPermissions = allPermissions.filter((p) =>
    ['order:read', 'customer:read'].includes(p.name),
  );

  await prisma.rolePermission.createMany({
    data: basicPermissions.map((p) => ({
      roleId: user.id,
      permissionId: p.id,
    })),
    skipDuplicates: true,
  });

  // 🔥 Criar admin master se não existir
  const existingAdmin = await prisma.account.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    const adminPasswordHash = await hash(ADMIN_PASSWORD, 10);

    await prisma.account.create({
      data: {
        name: 'Admin Master',
        email: ADMIN_EMAIL,
        password: adminPasswordHash,
        roleId: admin.id,
      },
    });

    console.log(`✅ Admin master criado: ${ADMIN_EMAIL}`);
  } else {
    console.log(`ℹ️ Admin master já existe: ${ADMIN_EMAIL}`);
  }
}


